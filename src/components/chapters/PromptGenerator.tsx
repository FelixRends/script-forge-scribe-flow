
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Chapter } from "../ChapterEditor";

interface PromptGeneratorProps {
  chapter: Chapter;
  index: number;
  genre: string;
  activeRole: string;
  setActiveRole: (role: string) => void;
  onUpdateChapter: (index: number, chapter: Chapter) => void;
  onGenerateText: (index: number) => void;
  isGenerating: boolean;
}

export function PromptGenerator({ 
  chapter, 
  index, 
  genre, 
  activeRole, 
  setActiveRole,
  onUpdateChapter,
  onGenerateText,
  isGenerating
}: PromptGeneratorProps) {
  const styleOptions: Record<string, string[]> = {
    roman: ["beschreibend", "dialogreich", "atmosphärisch", "bildhaft", "emotional"],
    sachbuch: ["wissenschaftlich", "analytisch", "sachlich", "informativ", "präzise"],
    drehbuch: ["szenisch", "dialogorientiert", "visuell", "actionreich", "charakterbasiert"],
    lyrik: ["metaphorisch", "rhythmisch", "verdichtet", "assoziativ", "bildreich"]
  };

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <div className="flex items-center text-sm font-medium mb-2">
        <span className="mr-2">📝 Prompt-Generator</span>
        <div className="flex-1 h-px bg-border"></div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor={`context-${chapter.id}`} className="font-medium">
            📚 Kontext / Kurzfassung (erforderlich)
          </Label>
          <Textarea
            id={`context-${chapter.id}`}
            placeholder="Beschreiben Sie den Kontext und Inhalt des Kapitels..."
            value={chapter.context}
            onChange={(e) =>
              onUpdateChapter(index, { ...chapter, context: e.target.value })
            }
            className="min-h-[100px] mt-1"
          />
        </div>

        <div>
          <Label className="font-medium">🧠 Rolle / Stilrichtung</Label>
          <div className="mt-1">
            <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
              <TabsList className="grid grid-cols-3 mb-2 w-full">
                {styleOptions[genre]?.slice(0, 3).map(style => (
                  <TabsTrigger key={style} value={style}>
                    {style}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid grid-cols-2 w-full">
                {styleOptions[genre]?.slice(3, 5).map(style => (
                  <TabsTrigger key={style} value={style}>
                    {style}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">
            ✏️ Tiefenschärfe: {chapter.depthOfField} Zeichen
          </Label>
          <Slider
            min={3000}
            max={5000}
            step={500}
            value={[chapter.depthOfField]}
            onValueChange={([value]) =>
              onUpdateChapter(index, { ...chapter, depthOfField: value })
            }
          />
          <div className="text-xs text-muted-foreground">
            {chapter.depthOfField === 3000 && "Kompakt, präzise, schneller Überblick"}
            {chapter.depthOfField === 3500 && "Knapp strukturiert mit Kernpunkten"}
            {chapter.depthOfField === 4000 && "Ausgewogen mit Tiefgang"}
            {chapter.depthOfField === 4500 && "Detaillierte Ausarbeitung"}
            {chapter.depthOfField === 5000 && "Maximaler Kontext, rhetorisch ausgearbeitet"}
          </div>
        </div>

        <Button 
          onClick={() => onGenerateText(index)}
          disabled={isGenerating || !chapter.context}
          className="w-full mt-4"
        >
          {isGenerating ? "Generiere Text..." : "Text generieren"}
        </Button>
      </div>
    </div>
  );
}
