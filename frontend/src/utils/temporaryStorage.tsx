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

const getImage = async (key: string): Promise<File | string | undefined> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("images", "readonly");
        const store = tx.objectStore("images");
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
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

// 🧠 Manage replacement or deletion of images in IndexedDB
const manageImageReplacement = async (
    oldKey: string | undefined,
    newFile?: File | string,
    newKeyPrefix?: string
): Promise<string | undefined> => {
    // 🗑️ Delete old image if exists
    if (oldKey && typeof oldKey === "string") {
        await deleteImage(oldKey);
    }

    // 🚫 User deleted the image manually
    if (!newFile) return undefined;

    // 💾 Save new file
    if (newFile instanceof File) {
        const newKey = `${newKeyPrefix}-${Date.now()}`;
        await saveImage(newKey, newFile);
        return newKey;
    }

    // 🧠 Already a string (Base64 or URL)
    return newFile;
};

// 💾 Save post + legs
export const saveToLocalStorage = async (newPost: AddPost_Type, legs: IndividualLeg_type[]) => {
    const postCopy = { ...newPost };
    const legsCopy = legs.map((l) => ({
        ...l,
        legData: { ...l.legData },
        legPreview: { ...l.legPreview },
    }));

    // 🖼️ Main post images
    postCopy.postData.thumbnail = await manageImageReplacement(
        typeof postCopy.postData.thumbnail === "string" ? postCopy.postData.thumbnail : undefined,
        postCopy.postData.thumbnail instanceof File ? postCopy.postData.thumbnail : undefined,
        "post-thumbnail"
    );

    postCopy.postPreview.thumbnail = await manageImageReplacement(
        typeof postCopy.postPreview.thumbnail === "string" ? postCopy.postPreview.thumbnail : undefined,
        postCopy.postPreview.thumbnail, // Already string in your case
        "preview-thumbnail"
    );

    // 🦵 Handle legs
    for (const leg of legsCopy) {
        const { id, legData, legPreview } = leg;

        legData.startPhoto = await manageImageReplacement(
            typeof legData.startPhoto === "string" ? legData.startPhoto : undefined,
            legData.startPhoto instanceof File ? legData.startPhoto : undefined,
            `${id}-startPhoto`
        );

        legData.endPhoto = await manageImageReplacement(
            typeof legData.endPhoto === "string" ? legData.endPhoto : undefined,
            legData.endPhoto instanceof File ? legData.endPhoto : undefined,
            `${id}-endPhoto`
        );

        if (Array.isArray(legData.photoDump)) {
            const newDump: string[] = [];
            for (let i = 0; i < legData.photoDump.length; i++) {
                const item = legData.photoDump[i];
                if (!item) continue;
                const newKey = await manageImageReplacement(
                    typeof item === "string" ? item : undefined,
                    item instanceof File ? item : undefined,
                    `${id}-photoDump-${i}`
                );
                if (newKey) newDump.push(newKey);
            }
            legData.photoDump = newDump;
        }

        legPreview.startPhoto = await manageImageReplacement(
            typeof legPreview.startPhoto === "string" ? legPreview.startPhoto : undefined,
            legPreview.startPhoto,
            `${id}-preview-startPhoto`
        );

        legPreview.endPhoto = await manageImageReplacement(
            typeof legPreview.endPhoto === "string" ? legPreview.endPhoto : undefined,
            legPreview.endPhoto,
            `${id}-preview-endPhoto`
        );

        if (Array.isArray(legPreview.photoDump)) {
            const newPreviewDump: string[] = [];
            for (let i = 0; i < legPreview.photoDump.length; i++) {
                const item = legPreview.photoDump[i];
                if (!item) continue;
                const newKey = await manageImageReplacement(
                    typeof item === "string" ? item : undefined,
                    item,
                    `${id}-preview-photoDump-${i}`
                );
                if (newKey) newPreviewDump.push(newKey);
            }
            legPreview.photoDump = newPreviewDump;
        }
    }

    // 🧱 Save to localStorage
    try {
        localStorage.setItem("postData", JSON.stringify(postCopy));
        localStorage.setItem("legData", JSON.stringify(legsCopy));
    } catch (e) {
        console.warn(
            "LocalStorage quota exceeded, consider storing large images in IndexedDB only."
        );
    }
};

// 📦 Load post + legs from storage
export const loadFromLocalStorage = async (): Promise<{ post: AddPost_Type; legs: IndividualLeg_type[] }> => {
    const savedPost = localStorage.getItem("postData");
    const savedLegs = localStorage.getItem("legData");

    const post: AddPost_Type = savedPost ? JSON.parse(savedPost) : { postData: {}, postPreview: {} };
    const legs: IndividualLeg_type[] = savedLegs ? JSON.parse(savedLegs) : [];

    // Helper to fetch image and convert File to Base64 if needed
    const loadImage = async (key?: string): Promise<string | undefined> => {
        if (!key) return undefined;
        const img = await getImage(key);
        if (img instanceof File) {
            return await fileToBase64(img);
        } 
        if (typeof img === 'string') {
            return img;
        }
        // fallback: return key itself if nothing is in IndexedDB
        return key;
    };

    // Post thumbnails
    post.postData.thumbnail = await loadImage(post.postData.thumbnail as string);
    post.postPreview.thumbnail = await loadImage(post.postPreview.thumbnail as string);

    // Legs
    for (const leg of legs) {
        const { legData, legPreview } = leg;

        legData.startPhoto = await loadImage(legData.startPhoto as string);
        legData.endPhoto = await loadImage(legData.endPhoto as string);

        if (Array.isArray(legData.photoDump)) {
            const loaded = await Promise.all(
                legData.photoDump.map(async (item) => {
                    if (typeof item === "string") {
                        return await loadImage(item);
                    }
                    return undefined;
                })
            );
            legData.photoDump = loaded.filter((img): img is string => !!img);
        }

        legPreview.startPhoto = await loadImage(legPreview.startPhoto as string);
        legPreview.endPhoto = await loadImage(legPreview.endPhoto as string);

        if (Array.isArray(legPreview.photoDump)) {
            const loaded = await Promise.all(legPreview.photoDump.map(loadImage));
            legPreview.photoDump = loaded.filter((img): img is string => !!img);
        }
    }

    return { post, legs };
};

// 🧹 Delete entire IndexedDB (for full reset)
export const deleteDatabase = async (dbName = "TravellerDB") => {
    return new Promise<void>((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
        request.onblocked = () => console.warn(`Delete blocked for database ${dbName}`);
    });
};
