import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export interface HandwrittenNote {
  id: string;
  userId: string;
  title: string;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const HANDWRITTEN_NOTES_COLLECTION = "handwrittenNotes";

async function dataURLtoBlob(dataURL: string): Promise<Blob> {
  try {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  } catch (error) {
    console.error('Error converting data URL to blob:', error);
    throw new Error('Failed to process canvas image');
  }
}

async function uploadCanvasImage(userId: string, noteId: string, imageData: string): Promise<string> {
  try {
    console.log("Starting image upload...", { userId, noteId, dataLength: imageData.length });
    const blob = await dataURLtoBlob(imageData);
    console.log("Blob created successfully", { blobSize: blob.size });
    
    const storageRef = ref(storage, `handwrittenNotes/${userId}/${noteId}.png`);
    console.log("Uploading blob to Firebase Storage...");
    
    await uploadBytes(storageRef, blob);
    console.log("Upload complete, getting download URL...");
    
    const url = await getDownloadURL(storageRef);
    console.log("Download URL retrieved", { url });
    return url;
  } catch (error) {
    console.error("Error uploading canvas image:", error);
    throw error;
  }
}

async function deleteCanvasImage(userId: string, noteId: string): Promise<void> {
  try {
    const storageRef = ref(storage, `handwrittenNotes/${userId}/${noteId}.png`);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image from storage:", error);
  }
}

export const handwrittenNotesService = {
  subscribeToUserNotes(userId: string, callback: (notes: HandwrittenNote[]) => void) {
    const q = query(
      collection(db, HANDWRITTEN_NOTES_COLLECTION),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const notes: HandwrittenNote[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          title: data.title,
          imageUrl: data.imageUrl,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
      callback(notes);
    });
  },

  async createNote(userId: string, title: string, imageData: string, tags: string[]) {
    try {
      console.log("Creating handwritten note in Firestore...", { userId, title, tags });
      const now = Timestamp.now();
      
      const docRef = await addDoc(collection(db, HANDWRITTEN_NOTES_COLLECTION), {
        userId,
        title,
        imageUrl: "",
        tags,
        createdAt: now,
        updatedAt: now,
      });
      console.log("Firestore document created", { noteId: docRef.id });

      console.log("Uploading canvas image to Firebase Storage...");
      const imageUrl = await uploadCanvasImage(userId, docRef.id, imageData);
      console.log("Image uploaded, updating Firestore with image URL...");

      await updateDoc(doc(db, HANDWRITTEN_NOTES_COLLECTION, docRef.id), {
        imageUrl,
      });
      console.log("Note creation complete");

      return docRef.id;
    } catch (error) {
      console.error("Error creating handwritten note:", error);
      throw error;
    }
  },

  async updateNote(
    userId: string,
    noteId: string,
    updates: Partial<Pick<HandwrittenNote, "title" | "tags">> & { imageData?: string }
  ) {
    const updateData: any = {
      ...updates,
      updatedAt: Timestamp.now(),
    };

    if (updates.imageData) {
      const imageUrl = await uploadCanvasImage(userId, noteId, updates.imageData);
      updateData.imageUrl = imageUrl;
      delete updateData.imageData;
    }

    const noteRef = doc(db, HANDWRITTEN_NOTES_COLLECTION, noteId);
    await updateDoc(noteRef, updateData);
  },

  async deleteNote(userId: string, noteId: string) {
    await deleteCanvasImage(userId, noteId);
    
    const noteRef = doc(db, HANDWRITTEN_NOTES_COLLECTION, noteId);
    await deleteDoc(noteRef);
  },
};
