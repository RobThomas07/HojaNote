import { useState } from "react";
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
} from "lucide-react";

export function NotesEditor() {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Biology"]);

  const availableTags = [
    "Biology",
    "Mathematics",
    "History",
    "Chemistry",
    "English",
    "Physics",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 bg-background border-b-2 px-4 py-3">
          <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 px-0"
              placeholder="Note title..."
              data-testid="input-note-title"
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" data-testid="button-discard" className="active-elevate-2">
                Discard
              </Button>
              <Button size="sm" data-testid="button-save-note" className="active-elevate-2">
                <Save className="h-4 w-4 mr-2" />
                Save
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
                  <span>Nov 11, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modified</span>
                  <span>2 hours ago</span>
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
