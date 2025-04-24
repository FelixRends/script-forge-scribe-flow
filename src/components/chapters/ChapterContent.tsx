
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Chapter } from "../ChapterEditor";

interface ChapterContentProps {
  chapter: Chapter;
  index: number;
  onUpdateChapter: (index: number, chapter: Chapter) => void;
}

export function ChapterContent({ chapter, index, onUpdateChapter }: ChapterContentProps) {
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
            value={chapter.content}
            onChange={(e) =>
              onUpdateChapter(index, { ...chapter, content: e.target.value })
            }
            className="min-h-[200px] bg-background"
            readOnly={chapter.status === "fertig"}
          />
          <div className="text-xs text-muted-foreground flex justify-between mt-1">
            <span>{chapter.content.length} von {chapter.depthOfField} Zeichen</span>
            {chapter.content && (
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
