
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chapter, Section } from "@/types/bookTypes";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SectionsListProps {
  chapter: Chapter;
  chapterIndex: number;
  onUpdateChapter: (chapter: Chapter) => void;
}

export function SectionsList({ chapter, chapterIndex, onUpdateChapter }: SectionsListProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSectionExpansion = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const addNewSection = () => {
    const newSection: Section = {
      id: chapter.sections.length ? Math.max(...chapter.sections.map(s => s.id)) + 1 : 1,
      content: "",
      summary: "",
      comment: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    onUpdateChapter({
      ...chapter,
      sections: [...chapter.sections, newSection]
    });
  };

  const updateSection = (index: number, updatedSection: Section) => {
    const updatedSections = [...chapter.sections];
    updatedSections[index] = { 
      ...updatedSections[index], 
      ...updatedSection, 
      updatedAt: new Date() 
    };
    
    onUpdateChapter({
      ...chapter,
      sections: updatedSections
    });
  };

  const deleteSection = (sectionId: number) => {
    if (confirm("Soll dieser Abschnitt wirklich gelöscht werden?")) {
      onUpdateChapter({
        ...chapter,
        sections: chapter.sections.filter(s => s.id !== sectionId)
      });
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === chapter.sections.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedSections = [...chapter.sections];
    
    [updatedSections[index], updatedSections[newIndex]] = 
    [updatedSections[newIndex], updatedSections[index]];
    
    onUpdateChapter({
      ...chapter,
      sections: updatedSections
    });
  };

  return (
    <div className="space-y-4">
      {chapter.sections.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          Keine Abschnitte vorhanden. Füge deinen ersten Abschnitt hinzu.
        </div>
      ) : (
        chapter.sections.map((section, index) => (
          <Card key={section.id} className="border border-muted overflow-hidden">
            <div 
              onClick={() => toggleSectionExpansion(section.id)}
              className="cursor-pointer bg-muted/50 p-2 flex justify-between items-center"
            >
              <div className="font-medium">▼ Abschnitt {index + 1}</div>
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(index, 'up');
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    moveSection(index, 'down');
                  }}
                  disabled={index === chapter.sections.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSection(section.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            
            {expandedSection === section.id && (
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`section-content-${section.id}`}>Haupttext</Label>
                  <Textarea
                    id={`section-content-${section.id}`}
                    placeholder="Text des Abschnitts..."
                    value={section.content}
                    onChange={(e) => updateSection(index, { ...section, content: e.target.value })}
                    className="min-h-[200px]"
                  />
                  <div className="text-xs text-muted-foreground">
                    {section.content.length} Zeichen
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`section-summary-${section.id}`} className="flex items-center">
                    <span className="mr-2">📋</span>Kurzzusammenfassung
                  </Label>
                  <Textarea
                    id={`section-summary-${section.id}`}
                    placeholder="Zusammenfassung für den nächsten Abschnitt..."
                    value={section.summary}
                    onChange={(e) => updateSection(index, { ...section, summary: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`section-comment-${section.id}`} className="flex items-center">
                    <span className="mr-2">🔄</span>Semantische Brücke / Kommentar
                  </Label>
                  <Textarea
                    id={`section-comment-${section.id}`}
                    placeholder="z.B. 'bereitet Kapitel 3 vor', 'Verbindung zu Abschnitt 4'..."
                    value={section.comment || ""}
                    onChange={(e) => updateSection(index, { ...section, comment: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="text-xs text-muted-foreground mt-2">
                  Erstellt: {section.createdAt.toLocaleDateString()} | 
                  Aktualisiert: {section.updatedAt.toLocaleDateString()}
                </div>
              </CardContent>
            )}
          </Card>
        ))
      )}
      
      <Button onClick={addNewSection} className="w-full flex items-center justify-center gap-2">
        <Plus className="h-4 w-4" /> Abschnitt hinzufügen
      </Button>
    </div>
  );
}
