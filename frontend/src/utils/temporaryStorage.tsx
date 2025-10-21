import type { AddPost_Type, IndividualLeg_type } from "../configs/types_and_interfaces";

// Convert File to Base64 if needed
export const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

// IndexedDB helpers
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

// Save post and legs to localStorage and IndexedDB
export const saveToLocalStorage = async (newPost: AddPost_Type, legs: IndividualLeg_type[]) => {
    const postCopy = { ...newPost };
    const legsCopy = legs.map(l => ({ ...l, legData: { ...l.legData }, legPreview: { ...l.legPreview } }));

    // Save main post images
    if (postCopy.postData.thumbnail instanceof File) {
        await saveImage("post-thumbnail", postCopy.postData.thumbnail);
        postCopy.postData.thumbnail = "post-thumbnail";
    }
    if (postCopy.postPreview.thumbnail) {
        await saveImage("preview-thumbnail", postCopy.postPreview.thumbnail);
        postCopy.postPreview.thumbnail = "preview-thumbnail";
    }

    // Save legs images
    for (const leg of legsCopy) {
        const { id, legData, legPreview } = leg;

        if (legData.startPhoto instanceof File) {
            await saveImage(`${id}-startPhoto`, legData.startPhoto);
            legData.startPhoto = `${id}-startPhoto`;
        }
        if (legData.endPhoto instanceof File) {
            await saveImage(`${id}-endPhoto`, legData.endPhoto);
            legData.endPhoto = `${id}-endPhoto`;
        }

        if (Array.isArray(legData.photoDump)) {
            legData.photoDump = await Promise.all(legData.photoDump.map(async (item, i) => {
                if (item instanceof File) {
                    const key = `${id}-photoDump-${i}`;
                    await saveImage(key, item);
                    return key;
                }
                return item;
            }));
        }

        if (legPreview.startPhoto ) {
            await saveImage(`${id}-preview-startPhoto`, legPreview.startPhoto);
            legPreview.startPhoto = `${id}-preview-startPhoto`;
        }
        if (legPreview.endPhoto) {
            await saveImage(`${id}-preview-endPhoto`, legPreview.endPhoto);
            legPreview.endPhoto = `${id}-preview-endPhoto`;
        }

        if (Array.isArray(legPreview.photoDump)) {
            legPreview.photoDump = legPreview.photoDump.map((item, i) => {
                if (item ) return `${id}-preview-photoDump-${i}`;
                return item;
            });
        }
    }

    // Save to localStorage
    try {

        const postToStore = {
            ...postCopy,
            postData: {
                ...postCopy.postData,
                thumbnail: postCopy.postData.thumbnail ? "post-thumbnail" : undefined
            },
            postPreview: {
                ...postCopy.postPreview,
                thumbnail: postCopy.postPreview.thumbnail ? "preview-thumbnail" : undefined
            }
        };

        localStorage.setItem("postData", JSON.stringify(postToStore));


        const legsToStore = legsCopy.map(leg => ({
            ...leg,
            legData: {
                ...leg.legData,
                startPhoto: leg.legData.startPhoto ? `${leg.id}-startPhoto` : undefined,
                endPhoto: leg.legData.endPhoto ? `${leg.id}-endPhoto` : undefined,
                photoDump: leg.legData.photoDump?.map((_, i) => `${leg.id}-photoDump-${i}`)
            },
            legPreview: {
                ...leg.legPreview,
                startPhoto: leg.legPreview.startPhoto ? `${leg.id}-preview-startPhoto` : undefined,
                endPhoto: leg.legPreview.endPhoto ? `${leg.id}-preview-endPhoto` : undefined,
                photoDump: leg.legPreview.photoDump?.map((_, i) => `${leg.id}-preview-photoDump-${i}`)
            }
        }));
        localStorage.setItem("legData", JSON.stringify(legsToStore));
    } catch (e) {
        console.warn("LocalStorage quota exceeded, consider storing large images in IndexedDB only.");
    }
};

// Load post and legs from localStorage + IndexedDB
export const loadFromLocalStorage = async (): Promise<{ post: AddPost_Type; legs: IndividualLeg_type[] }> => {
    const savedPost = localStorage.getItem("postData");
    const savedLegs = localStorage.getItem("legData");

    const post: AddPost_Type = savedPost ? JSON.parse(savedPost) : { postData: {}, postPreview: {} };
    const legs: IndividualLeg_type[] = savedLegs ? JSON.parse(savedLegs) : [];

    // Helper to fetch image and convert File to Base64 if needed
    const loadImage = async (key?: string): Promise<string | undefined> => {
        if (!key) return undefined;
        const img = await getImage(key);
        return img instanceof File ? await fileToBase64(img) : (img as string | undefined);
    };

    // Load main post images
    post.postData.thumbnail = await loadImage(post.postData.thumbnail as string);
    post.postPreview.thumbnail = await loadImage(post.postPreview.thumbnail as string);

    // Load legs images
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
                    return undefined; // ignore Files
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

// Delete database
export const deleteDatabase = async (dbName = "TravellerDB") => {
    return new Promise<void>((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
        request.onblocked = () => console.warn(`Delete blocked for database ${dbName}`);
    });
};
