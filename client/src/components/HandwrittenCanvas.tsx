import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { handwrittenNotesService } from "@/services/handwrittenNotesService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pen,
  Eraser,
  Undo,
  Redo,
  Trash2,
  Save,
  ArrowLeft,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DrawingTool = "pen" | "eraser";

interface HandwrittenCanvasProps {
  noteId?: string;
  onBack?: () => void;
}

export function HandwrittenCanvas({ noteId, onBack }: HandwrittenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<DrawingTool>("pen");
  const [penSize, setPenSize] = useState(2);
  const [color, setColor] = useState("#000000");
  const [title, setTitle] = useState("Untitled Handwritten Note");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [isNewNote, setIsNewNote] = useState(!noteId);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const availableTags = [
    "Biology",
    "Mathematics",
    "History",
    "Chemistry",
    "English",
    "Physics",
    "Art",
    "Sketch",
    "Diagram",
    "General",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawGrid = () => {
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      const gridSize = 20;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    drawGrid();
    saveToHistory();
  };

  useEffect(() => {
    initializeCanvas();
  }, []);

  useEffect(() => {
    if (noteId && currentUser) {
      const unsubscribe = handwrittenNotesService.subscribeToUserNotes(
        currentUser.uid,
        (notes) => {
          const note = notes.find((n) => n.id === noteId);
          if (note) {
            setTitle(note.title);
            setSelectedTags(note.tags);
            setIsNewNote(false);
            
            const canvas = canvasRef.current;
            if (canvas && note.imageUrl) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                  ctx.drawImage(img, 0, 0);
                  saveToHistory();
                };
                img.src = note.imageUrl;
              }
            }
          }
        }
      );

      return () => unsubscribe();
    }
  }, [noteId, currentUser]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL();
    setHistoryStack((prev) => {
      const newStack = prev.slice(0, historyIndex + 1);
      newStack.push(imageData);
      return newStack.slice(-20);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 19));
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      loadFromHistory(historyStack[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < historyStack.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      loadFromHistory(historyStack[newIndex]);
    }
  };

  const loadFromHistory = (imageData: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageData;
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === "pen" ? color : "#ffffff";
    ctx.lineWidth = tool === "pen" ? penSize : penSize * 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const handleSave = async () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Not authenticated. Please log in.",
      });
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Canvas not found.",
      });
      return;
    }

    try {
      setSaving(true);
      console.log("Starting save...", { isNewNote, noteId, title });
      const imageData = canvas.toDataURL("image/png");
      console.log("Canvas data URL created", { dataLength: imageData.length });
      
      if (isNewNote) {
        console.log("Creating new note...");
        await handwrittenNotesService.createNote(
          currentUser.uid,
          title,
          imageData,
          selectedTags
        );
        console.log("Note created successfully");
        setIsNewNote(false);
        toast({
          title: "Note created",
          description: "Your handwritten note has been saved successfully.",
        });
        if (onBack) {
          onBack();
        }
      } else if (noteId) {
        console.log("Updating existing note...", { noteId });
        await handwrittenNotesService.updateNote(currentUser.uid, noteId, {
          title,
          imageData,
          tags: selectedTags,
        });
        console.log("Note updated successfully");
        toast({
          title: "Note updated",
          description: "Your changes have been saved.",
        });
      }
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save note. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!noteId || isNewNote || !currentUser) return;
    
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await handwrittenNotesService.deleteNote(currentUser.uid, noteId);
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
    <div className="flex flex-col h-screen bg-muted/30">
      <div className="flex items-center justify-between p-4 border-b-2 bg-background">
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
            className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 px-0 max-w-md"
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
            data-testid="button-save-canvas"
            className="active-elevate-2"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-b bg-background overflow-x-auto">
        <span className="text-sm font-medium">Tags:</span>
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer active-elevate-2 transition-all"
            onClick={() => toggleTag(tag)}
            data-testid={`badge-tag-${tag.toLowerCase()}`}
          >
            {tag}
            {selectedTags.includes(tag) && <X className="h-3 w-3 ml-1" />}
          </Badge>
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full rounded-md shadow-sm cursor-crosshair bg-white"
          data-testid="canvas-drawing"
        />
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
        <Card className="p-2 flex items-center gap-2 shadow-lg border-2">
          <Button
            variant={tool === "pen" ? "default" : "ghost"}
            size="icon"
            onClick={() => setTool("pen")}
            data-testid="button-pen-tool"
            className="active-elevate-2"
          >
            <Pen className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "ghost"}
            size="icon"
            onClick={() => setTool("eraser")}
            data-testid="button-eraser-tool"
            className="active-elevate-2"
          >
            <Eraser className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <div className="flex items-center gap-2 px-2">
            <label className="text-sm text-muted-foreground">Size:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={penSize}
              onChange={(e) => setPenSize(Number(e.target.value))}
              className="w-20"
              data-testid="input-pen-size"
            />
            <span className="text-sm w-6">{penSize}</span>
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          <div className="flex items-center gap-2 px-2">
            <label className="text-sm text-muted-foreground">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-2"
              data-testid="input-pen-color"
            />
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={historyIndex <= 0}
            data-testid="button-undo"
            className="active-elevate-2"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={historyIndex >= historyStack.length - 1}
            data-testid="button-redo"
            className="active-elevate-2"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearCanvas}
            data-testid="button-clear-canvas"
            className="active-elevate-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
