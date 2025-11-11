import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pen, Eraser, Undo, Redo, Trash2, Download } from "lucide-react";

type DrawingTool = "pen" | "eraser";

export function HandwrittenCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<DrawingTool>("pen");
  const [penSize, setPenSize] = useState(2);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
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
  }, []);

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
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared");
  };

  return (
    <div className="flex flex-col h-screen bg-muted/30">
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <h2 className="text-lg font-semibold" data-testid="text-canvas-title">
          Handwritten Note
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-save-canvas">
            <Download className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full rounded-md shadow-sm cursor-crosshair"
          data-testid="canvas-drawing"
        />
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
        <Card className="p-2 flex items-center gap-2 shadow-lg">
          <Button
            variant={tool === "pen" ? "default" : "ghost"}
            size="icon"
            onClick={() => setTool("pen")}
            data-testid="button-pen-tool"
          >
            <Pen className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "ghost"}
            size="icon"
            onClick={() => setTool("eraser")}
            data-testid="button-eraser-tool"
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
              className="w-8 h-8 rounded cursor-pointer"
              data-testid="input-pen-color"
            />
          </div>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Undo")}
            data-testid="button-undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Redo")}
            data-testid="button-redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearCanvas}
            data-testid="button-clear-canvas"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
