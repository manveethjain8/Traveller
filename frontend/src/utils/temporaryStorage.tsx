import type { AddPost_Type, IndividualLeg_type } from "../configs/types_and_interfaces";

// 🧩 Convert File to Base64 if needed
export const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

// 🗄️ IndexedDB helpers
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("TravellerDB", 1);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains("images")) {
                db.createObjectStore("images");
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const saveImage = async (key: string, file: File | string) => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction("images", "readwrite");
        const store = tx.objectStore("images");
        store.put(file, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
};

const getImage = async (key: string): Promise<File | undefined> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("images", "readonly");
        const store = tx.objectStore("images");
        const request = store.get(key);
        request.onsuccess = () => {
            // Note: IndexedDB stores Files as Blobs, so we reconstruct the File
            const blob = request.result;
            if (!blob) return resolve(undefined);
            resolve(new File([blob], key, { type: blob.type || "image/jpeg" }));
        };
        request.onerror = () => reject(request.error);
    });
};

const deleteImage = async (key: string): Promise<void> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("images", "readwrite");
        const store = tx.objectStore("images");
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

// 🧠 Manage replacement or deletion of images in IndexedDB (key only)
const manageImageReplacement = async (
    oldKey: string | undefined,
    newFile?: File | string,
    newKeyPrefix?: string
): Promise<string | undefined> => {
    if (oldKey && typeof oldKey === "string") {
        await deleteImage(oldKey);
    }

    if (!newFile) return undefined;

    if (newFile instanceof File) {
        const newKey = `${newKeyPrefix}-${Date.now()}`;
        await saveImage(newKey, newFile);
        return newKey;
    }

    // If newFile is already a string, assume it's a key and just return it
    return newFile;
};

// 💾 Save post + legs
export const saveToLocalStorage = async (newPost: AddPost_Type, legs: IndividualLeg_type[]) => {
    // Create copies to avoid mutating the original state objects
    const postCopy = { 
        ...newPost, 
        postData: { ...newPost.postData },
        postPreview: { ...newPost.postPreview }
    };
    const legsCopy = legs.map((l) => ({
        ...l,
        legData: { ...l.legData },
        legPreview: { ...l.legPreview },
    }));

    // -------------------
    // Post main image
    // -------------------
    // If it's a File, it's new/updated. Save to IDB and store the *key*.
    if (postCopy.postData.thumbnail instanceof File) {
        // We pass undefined for oldKey because this is a simple save, not a replacement
        const newKey = await manageImageReplacement(undefined, postCopy.postData.thumbnail, "post-thumbnail");
        postCopy.postData.thumbnail = newKey; // <-- THE FIX
    }
    // If it's a string, it's already a key. Do nothing.

    // -------------------
    // Legs
    // -------------------
    for (const leg of legsCopy) {
        const { id, legData } = leg;

        // startPhoto
        if (legData.startPhoto instanceof File) {
            legData.startPhoto = await manageImageReplacement(undefined, legData.startPhoto, `${id}-startPhoto`); // <-- THE FIX
        }

        // endPhoto
        if (legData.endPhoto instanceof File) {
            legData.endPhoto = await manageImageReplacement(undefined, legData.endPhoto, `${id}-endPhoto`); // <-- THE FIX
        }

        // photoDump
        if (Array.isArray(legData.photoDump)) {
            const newKeyDump: (string | undefined)[] = [];
            for (let i = 0; i < legData.photoDump.length; i++) {
                const item = legData.photoDump[i];
                if (item instanceof File) {
                    // It's a new file, save it and store the key
                    const newKey = await manageImageReplacement(undefined, item, `${id}-photoDump-${i}`);
                    newKeyDump.push(newKey);
                } else if (typeof item === "string") {
                    // It's already a key, just keep it
                    newKeyDump.push(item);
                }
            }
            // Replace the array of [File, string, File] with an array of [string, string, string]
            legData.photoDump = newKeyDump.filter((f): f is string => !!f); // <-- THE FIX
        }

        // Previews remain strings (Blob URLs) and will be saved as such.
        // They will be undefined on load and need to be regenerated.
    }

    // Save structure in localStorage (images are now string keys)
    try {
        localStorage.setItem("postData", JSON.stringify(postCopy));
        localStorage.setItem("legData", JSON.stringify(legsCopy));
    } catch (e) {
        console.warn("LocalStorage quota exceeded, consider storing large images in IndexedDB only.", e);
    }
};

// 📦 Load post + legs from storage
export const loadFromLocalStorage = async (
    isRefreshed: boolean
): Promise<{ post: AddPost_Type; legs: IndividualLeg_type[] }> => {
    const savedPost = localStorage.getItem("postData");
    const savedLegs = localStorage.getItem("legData");

    const post: AddPost_Type = savedPost ? JSON.parse(savedPost) : { postData: {}, postPreview: {} };
    const legs: IndividualLeg_type[] = savedLegs ? JSON.parse(savedLegs) : [];

    // If not a refresh, we're just loading the in-memory state, which might
    // still have File objects. Return as-is.
    if (!isRefreshed) return { post, legs };

    // If it is a refresh, all image properties will be string keys
    // and we need to load them from IndexedDB.

    const loadImageAsFile = async (key?: string): Promise<File | undefined> => {
        if (!key) return undefined;
        return await getImage(key);
    };

    // Convert main post image
    if (typeof post.postData.thumbnail === "string") {
        const file = await loadImageAsFile(post.postData.thumbnail);
        if (file) post.postData.thumbnail = file;
    }

    // Convert leg images
    for (const leg of legs) {
        const { legData } = leg;

        if (typeof legData.startPhoto === "string") {
            const file = await loadImageAsFile(legData.startPhoto);
            if (file) legData.startPhoto = file;
        }

        if (typeof legData.endPhoto === "string") {
            const file = await loadImageAsFile(legData.endPhoto);
            if (file) legData.endPhoto = file;
        }

        if (Array.isArray(legData.photoDump)) {
            const loaded = await Promise.all(
                legData.photoDump.map((item) =>
                    // Item should always be a string key here, but we check just in case
                    typeof item === "string" ? loadImageAsFile(item) : Promise.resolve(item)
                )
            );
            legData.photoDump = loaded.filter((f): f is File => !!f);
        }
    }

    return { post, legs };
};

// 🧹 Delete entire IndexedDB
export const deleteDatabase = async (dbName = "TravellerDB") => {
    return new Promise<void>((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
        request.onblocked = () => console.warn(`Delete blocked for database ${dbName}`);
    });
};