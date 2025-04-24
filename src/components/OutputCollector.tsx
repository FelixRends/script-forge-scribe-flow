
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface OutputCollectorProps {
  output: string;
  setOutput: (output: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  onSave: () => void;
  onDiscard: () => void;
  chapterId: number;
}

export function OutputCollector({ 
  output, 
  setOutput,
  summary,
  setSummary,
  onSave, 
  onDiscard,
  chapterId
}: OutputCollectorProps) {
  const [charCount, setCharCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);

  useEffect(() => {
    // Count characters
    setCharCount(output.length);
    
    // Count paragraphs
    const paragraphs = output.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    setParagraphCount(paragraphs.length);
  }, [output]);

  return (
    <Card className="bg-card border-blue-200 shadow-md">
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center">
            <span className="mr-2">🧠</span>
            GPT-Output (nicht gespeichert)
          </h3>
          <div className="text-sm text-muted-foreground">
            Für Kapitel {chapterId}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="output-text" className="font-medium">
              Haupttext (3000-5000 Zeichen)
            </Label>
            <Textarea 
              id="output-text"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[300px] font-serif text-base"
              placeholder="Hier erscheint der generierte Text. Du kannst ihn vor dem Speichern bearbeiten."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="output-summary" className="font-medium flex items-center">
              <span className="mr-2">📋</span>
              Kurzzusammenfassung für den nächsten Abschnitt
            </Label>
            <Textarea
              id="output-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-[300px]"
              placeholder="Erstelle hier eine Kurzzusammenfassung dieses Abschnitts, die als Kontext für den nächsten Prompt dienen wird."
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm border-t pt-3">
          <span>
            {charCount} Zeichen | {paragraphCount} Absätze
          </span>
          <div className="space-x-3">
            <Button 
              onClick={onSave} 
              className="bg-green-600 hover:bg-green-700"
              disabled={!output}
            >
              <Save className="mr-2 h-4 w-4" /> In Kapitel übernehmen
            </Button>
            <Button 
              variant="outline" 
              onClick={onDiscard}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Verwerfen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
