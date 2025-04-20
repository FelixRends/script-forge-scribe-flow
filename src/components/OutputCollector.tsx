
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface OutputCollectorProps {
  output: string;
  setOutput: (output: string) => void;
  onSave: () => void;
  onDiscard: () => void;
  chapterId: number;
}

export function OutputCollector({ 
  output, 
  setOutput, 
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
        <Textarea 
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          className="min-h-[300px] font-serif text-base"
        />
        
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
              📝 In Kapitel übernehmen
            </Button>
            <Button 
              variant="outline" 
              onClick={onDiscard}
            >
              ♻️ Verwerfen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
