import { useState } from "react";
import { NotesEditor } from "@/components/NotesEditor";
import { NotesList } from "@/components/NotesList";

export default function NotesPage() {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setIsCreating(false);
  };

  const handleCreateNote = () => {
    setSelectedNoteId(null);
    setIsCreating(true);
  };

  const handleBack = () => {
    setSelectedNoteId(null);
    setIsCreating(false);
  };

  if (selectedNoteId || isCreating) {
    return <NotesEditor noteId={selectedNoteId || undefined} onBack={handleBack} />;
  }

  return <NotesList onSelectNote={handleSelectNote} onCreateNote={handleCreateNote} />;
}
