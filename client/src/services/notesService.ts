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
import { db } from "@/lib/firebase";

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NOTES_COLLECTION = "notes";

export const notesService = {
  subscribeToUserNotes(userId: string, callback: (notes: Note[]) => void) {
    const q = query(
      collection(db, NOTES_COLLECTION),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const notes: Note[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          title: data.title,
          content: data.content,
          tags: data.tags || [],
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
      callback(notes);
    });
  },

  async createNote(userId: string, title: string, content: string, tags: string[]) {
    try {
      console.log("Creating typed note in Firestore...", { userId, title, contentLength: content.length, tags });
      const now = Timestamp.now();
      const noteData = {
        userId,
        title,
        content,
        tags,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, NOTES_COLLECTION), noteData);
      console.log("Typed note created successfully", { noteId: docRef.id });
      return docRef.id;
    } catch (error) {
      console.error("Error creating typed note:", error);
      throw error;
    }
  },

  async updateNote(noteId: string, updates: Partial<Pick<Note, "title" | "content" | "tags">>) {
    try {
      console.log("Updating typed note...", { noteId });
      const noteRef = doc(db, NOTES_COLLECTION, noteId);
      await updateDoc(noteRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
      console.log("Typed note updated successfully", { noteId });
    } catch (error) {
      console.error("Error updating typed note:", error);
      throw error;
    }
  },

  async deleteNote(noteId: string) {
    const noteRef = doc(db, NOTES_COLLECTION, noteId);
    await deleteDoc(noteRef);
  },
};
