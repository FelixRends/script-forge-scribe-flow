
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Chapter } from "@/types/bookTypes";
import { Eye } from "lucide-react";

interface ChapterPreviewProps {
  chapter: Chapter;
  format?: {
    name: string;
    dimensions: string;
    charactersPerPage: string;
  };
}

export function ChapterPreview({ chapter, format }: ChapterPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasContent = chapter.sections.length > 0 && chapter.sections.some(s => s.content);
  
  // Calculate estimated pages based on format
  const totalCharacters = chapter.sections.reduce((sum, section) => sum + section.content.length, 0);
  const charactersPerPage = format ? parseInt(format.charactersPerPage) : 2000;
  const estimatedPages = Math.ceil(totalCharacters / charactersPerPage);
  
  // Set preview dimensions based on format
  const [width, height] = format ? format.dimensions.split('x').map(d => parseFloat(d)) : [13.5, 21];
  const aspectRatio = width / height;
  
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
      
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Kapitel {chapter.id}: {chapter.title || "Unbenannt"}</span>
            {format && (
              <span className="text-sm text-muted-foreground">
                Format: {format.name} ({format.dimensions} cm)
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div 
          className="relative border rounded-md bg-background p-8 mx-auto"
          style={{
            width: '100%',
            maxWidth: '600px',
            aspectRatio: aspectRatio,
            fontFamily: 'serif'
          }}
        >
          <div className="max-h-full overflow-y-auto">
            {chapter.sections.length > 0 ? (
              chapter.sections.map((section, index) => (
                <div key={section.id} className="mb-6">
                  <div className="whitespace-pre-wrap text-base leading-relaxed">
                    {section.content}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Keine Abschnitte vorhanden. Füge zuerst Abschnitte zu diesem Kapitel hinzu.
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            ~{estimatedPages} {estimatedPages === 1 ? 'Seite' : 'Seiten'} 
            ({totalCharacters} Zeichen von {chapter.depthOfField})
          </div>
          <Button onClick={() => setIsOpen(false)}>Schließen</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
