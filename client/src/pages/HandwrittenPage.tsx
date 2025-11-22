import { useState } from "react";
import { HandwrittenCanvas } from "@/components/HandwrittenCanvas";
import { HandwrittenNotesList } from "@/components/HandwrittenNotesList";

export default function HandwrittenPage() {
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
    return <HandwrittenCanvas noteId={selectedNoteId || undefined} onBack={handleBack} />;
  }

  return <HandwrittenNotesList onSelectNote={handleSelectNote} onCreateNote={handleCreateNote} />;
}
