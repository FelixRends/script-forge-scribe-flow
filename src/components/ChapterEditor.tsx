
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export interface Chapter {
  id: number;
  title: string;
  context: string;
  status: "offen" | "in-arbeit" | "fertig";
  depthOfField: number;
  content: string;
}

interface ChapterEditorProps {
  chapters: Chapter[];
  onUpdateChapter: (index: number, chapter: Chapter) => void;
  onAddChapter: () => void;
}

export function ChapterEditor({ chapters, onUpdateChapter, onAddChapter }: ChapterEditorProps) {
  const [isGenerating, setIsGenerating] = useState<number | null>(null);

  const getStatusColor = (status: Chapter["status"]) => {
    switch (status) {
      case "offen":
        return "bg-muted text-muted-foreground";
      case "in-arbeit":
        return "bg-blue-500 text-white";
      case "fertig":
        return "bg-green-500 text-white";
    }
  };

  const handleGenerateText = async (index: number) => {
    setIsGenerating(index);
    
    try {
      // For this implementation, we'll simulate AI text generation
      // In a real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const chapter = chapters[index];
      let generatedText = "";
      
      // Generate simulated text based on the chapter context and depth of field
      if (chapter.context) {
        generatedText = `Generierter Text basierend auf Ihrem Prompt: "${chapter.context.substring(0, 30)}..."\n\n`;
        generatedText += `Dies ist ein automatisch generierter Text mit etwa ${chapter.depthOfField} Zeichen Länge. `;
        generatedText += `In einer vollständigen Implementation würde dieser Text von einer KI wie GPT erzeugt werden, `;
        generatedText += `basierend auf dem im Prompt-Feld eingegebenen Kontext. `;
        generatedText += `\n\nDer Text würde dem angegebenen Stil folgen und die gewünschte Tiefenschärfe (${chapter.depthOfField} Zeichen) berücksichtigen. `;
        generatedText += `Der generierte Inhalt würde auf Ihren Vorgaben basieren und könnte nach der Generierung weiter von Ihnen bearbeitet werden.`;
        
        // Add some random lorem ipsum to match the requested depth
        while (generatedText.length < chapter.depthOfField * 0.8) {
          generatedText += "\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
        }
      } else {
        generatedText = "Bitte geben Sie einen Kontext oder Prompt ein, um Text generieren zu können.";
      }
      
      onUpdateChapter(index, { 
        ...chapter, 
        content: generatedText,
        status: "in-arbeit"
      });
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="space-y-6">
      {chapters.map((chapter, index) => (
        <Card key={chapter.id} className="fade-in">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <Input
                placeholder={`Kapitel ${index + 1} Titel`}
                value={chapter.title}
                onChange={(e) =>
                  onUpdateChapter(index, { ...chapter, title: e.target.value })
                }
                className="text-lg font-semibold max-w-[70%]"
              />
              <Badge className={getStatusColor(chapter.status)}>{chapter.status}</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Prompt Panel (Left/Top) */}
              <div className="space-y-2">
                <div className="flex items-center text-sm font-medium text-muted-foreground mb-2">
                  <span className="mr-2">📝 Prompt / Kontext</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <Textarea
                  placeholder="Geben Sie hier Ihren Prompt ein... (z.B. Stil, Inhalt, Zielgruppe, Handlungsvorgaben)"
                  value={chapter.context}
                  onChange={(e) =>
                    onUpdateChapter(index, { ...chapter, context: e.target.value })
                  }
                  className="min-h-[200px] bg-muted/20"
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tiefenschärfe: {chapter.depthOfField} Zeichen
                  </label>
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
                  onClick={() => handleGenerateText(index)}
                  disabled={isGenerating === index || !chapter.context}
                  className="w-full mt-2"
                >
                  {isGenerating === index ? "Generiere Text..." : "Text generieren"}
                </Button>
              </div>
              
              {/* Output Panel (Right/Bottom) */}
              <div className="space-y-2">
                <div className="flex items-center text-sm font-medium text-muted-foreground mb-2">
                  <span className="mr-2">📄 Generierter Text</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <Textarea
                  placeholder="Hier erscheint der generierte Text..."
                  value={chapter.content}
                  onChange={(e) =>
                    onUpdateChapter(index, { ...chapter, content: e.target.value })
                  }
                  className="min-h-[200px] bg-background"
                />
              </div>
            </div>
            
            <div className="flex justify-between space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGenerateText(index)}
                disabled={isGenerating === index || !chapter.context}
              >
                Neu generieren
              </Button>
              
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdateChapter(index, {
                      ...chapter,
                      status: "in-arbeit" as const,
                    })
                  }
                >
                  Als "In Arbeit" markieren
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() =>
                    onUpdateChapter(index, { ...chapter, status: "fertig" as const })
                  }
                >
                  Als "Fertig" markieren
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={onAddChapter} className="w-full">
        + Neues Kapitel
      </Button>
    </div>
  );
}
