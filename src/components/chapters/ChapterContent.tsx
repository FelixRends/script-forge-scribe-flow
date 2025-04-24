
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Chapter } from "@/types/bookTypes";

interface ChapterContentProps {
  chapter: Chapter;
  index: number;
  onUpdateChapter: (index: number, chapter: Chapter) => void;
}

export function ChapterContent({ chapter, index, onUpdateChapter }: ChapterContentProps) {
  // Combine content from all sections if exists
  const combinedContent = chapter.sections.map(section => section.content).join('\n\n');

  return (
    <div className="space-y-2 border p-4 rounded-md">
      <div className="flex items-center text-sm font-medium mb-2">
        <span className="mr-2">📄 Kapitelinhalt</span>
        <div className="flex-1 h-px bg-border"></div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor={`chapter-content-${chapter.id}`} className="text-sm font-medium">Haupttext</Label>
          <Textarea
            id={`chapter-content-${chapter.id}`}
            placeholder="Hier erscheint der gespeicherte Kapiteltext..."
            value={combinedContent}
            onChange={(e) =>
              onUpdateChapter(index, { 
                ...chapter, 
                sections: chapter.sections.map((section, idx) => ({
                  ...section,
                  content: e.target.value.split('\n\n')[idx] || ''
                }))
              })
            }
            className="min-h-[200px] bg-background"
            readOnly={chapter.status === "fertig"}
          />
          <div className="text-xs text-muted-foreground flex justify-between mt-1">
            <span>{combinedContent.length} von {chapter.depthOfField} Zeichen</span>
            {combinedContent && (
              <span>Zuletzt aktualisiert: {new Date().toLocaleDateString()}</span>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor={`chapter-summary-${chapter.id}`} className="text-sm font-medium flex items-center">
            <span className="mr-2">📋</span>Zusammenfassung für nächsten Abschnitt
          </Label>
          <Textarea
            id={`chapter-summary-${chapter.id}`}
            placeholder="Zusammenfassung für den nächsten Abschnitt als Kontext..."
            value={chapter.summary || ""}
            onChange={(e) =>
              onUpdateChapter(index, { ...chapter, summary: e.target.value })
            }
            className="min-h-[100px] bg-background"
            readOnly={chapter.status === "fertig"}
          />
        </div>
      </div>
    </div>
  );
}
