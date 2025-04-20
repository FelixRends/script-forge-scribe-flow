
import { Textarea } from "@/components/ui/textarea";
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
      <Textarea
        placeholder="Hier erscheint der gespeicherte Kapiteltext..."
        value={chapter.content}
        onChange={(e) =>
          onUpdateChapter(index, { ...chapter, content: e.target.value })
        }
        className="min-h-[250px] bg-background"
        readOnly={chapter.status === "fertig"}
      />
      <div className="text-xs text-muted-foreground flex justify-between">
        <span>{chapter.content.length} von {chapter.depthOfField} Zeichen</span>
        {chapter.content && (
          <span>Zuletzt aktualisiert: {new Date().toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}
