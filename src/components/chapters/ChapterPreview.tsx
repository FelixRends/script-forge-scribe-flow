
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/bookTypes";
import { Eye } from "lucide-react";

interface ChapterPreviewProps {
  chapter: Chapter;
}

export function ChapterPreview({ chapter }: ChapterPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasContent = chapter.sections.length > 0 && chapter.sections.some(s => s.content);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          disabled={!hasContent}
        >
          <Eye className="h-4 w-4" /> Kapitelvorschau
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Kapitel {chapter.id}: {chapter.title || "Unbenannt"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[70vh] overflow-y-auto p-4 border rounded-md bg-background font-serif text-base space-y-4">
          {chapter.sections.length > 0 ? (
            chapter.sections.map((section, index) => (
              <div key={section.id} className="mb-6">
                <h3 className="font-medium text-muted-foreground mb-2">Abschnitt {index + 1}</h3>
                <div className="whitespace-pre-wrap">{section.content}</div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Keine Abschnitte vorhanden. Füge zuerst Abschnitte zu diesem Kapitel hinzu.
            </p>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>Schließen</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
