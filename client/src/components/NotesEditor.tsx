import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { notesService, type Note } from "@/services/notesService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Heading2,
  Save,
  X,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface NotesEditorProps {
  noteId?: string;
  onBack?: () => void;
}

export function NotesEditor({ noteId, onBack }: NotesEditorProps) {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());
  const [saving, setSaving] = useState(false);
  const [isNewNote, setIsNewNote] = useState(!noteId);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const availableTags = [
    "Biology",
    "Mathematics",
    "History",
    "Chemistry",
    "English",
    "Physics",
    "Computer Science",
    "Art",
    "Music",
    "General",
  ];

  useEffect(() => {
    if (noteId && currentUser) {
      const unsubscribe = notesService.subscribeToUserNotes(currentUser.uid, (notes) => {
        const note = notes.find(n => n.id === noteId);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
          setSelectedTags(note.tags);
          setCreatedAt(note.createdAt);
          setUpdatedAt(note.updatedAt);
          setIsNewNote(false);
        }
      });

      return () => unsubscribe();
    }
  }, [noteId, currentUser]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    try {
      setSaving(true);
      
      if (isNewNote) {
        const newNoteId = await notesService.createNote(
          currentUser.uid,
          title,
          content,
          selectedTags
        );
        setIsNewNote(false);
        toast({
          title: "Note created",
          description: "Your note has been saved successfully.",
        });
        if (onBack) {
          onBack();
        }
      } else if (noteId) {
        await notesService.updateNote(noteId, {
          title,
          content,
          tags: selectedTags,
        });
        toast({
          title: "Note updated",
          description: "Your changes have been saved.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save note. Please try again.",
      });
      console.error("Error saving note:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!noteId || isNewNote) return;
    
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await notesService.deleteNote(noteId);
        toast({
          title: "Note deleted",
          description: "The note has been removed.",
        });
        if (onBack) {
          onBack();
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete note. Please try again.",
        });
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleDiscard = () => {
    if (isNewNote || confirm("Discard unsaved changes?")) {
      if (onBack) {
        onBack();
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 bg-background border-b-2 px-4 py-3">
          <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 flex-1">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDiscard}
                  className="active-elevate-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 px-0"
                placeholder="Note title..."
                data-testid="input-note-title"
              />
            </div>
            <div className="flex items-center gap-2">
              {!isNewNote && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="active-elevate-2"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscard}
                data-testid="button-discard"
                className="active-elevate-2"
              >
                Discard
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                data-testid="button-save-note"
                className="active-elevate-2"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        <div className="sticky top-[57px] z-10 bg-background border-b-2 px-4 py-2">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-bold"
              onClick={() => console.log("Bold clicked")}
              className="active-elevate-2"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-italic"
              onClick={() => console.log("Italic clicked")}
              className="active-elevate-2"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-heading"
              onClick={() => console.log("Heading clicked")}
              className="active-elevate-2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-bullet-list"
              onClick={() => console.log("Bullet list clicked")}
              className="active-elevate-2"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-numbered-list"
              onClick={() => console.log("Numbered list clicked")}
              className="active-elevate-2"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-code-block"
              onClick={() => console.log("Code block clicked")}
              className="active-elevate-2"
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your notes..."
              className="w-full min-h-[500px] resize-none border-none focus:outline-none bg-transparent text-base"
              data-testid="textarea-note-content"
            />
          </div>
        </div>
      </div>

      <div className="w-80 border-l-2 p-4 overflow-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer active-elevate-2 transition-all"
                  onClick={() => toggleTag(tag)}
                  data-testid={`badge-tag-${tag.toLowerCase()}`}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Note Info</h3>
            <Card className="p-3 border-2">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modified</span>
                  <span>{formatDistanceToNow(updatedAt, { addSuffix: true })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Words</span>
                  <span>{content.split(/\s+/).filter(Boolean).length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
