
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChapterStatusBadge } from "./chapters/ChapterStatusBadge";
import { PromptGenerator } from "./chapters/PromptGenerator";
import { SectionsList } from "./chapters/SectionsList";
import { useChapterManagement } from "@/hooks/useChapterManagement";
import { useTextGeneration } from "@/hooks/useTextGeneration";
import { Chapter } from "@/types/bookTypes";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";

interface ChapterEditorProps {
  chapters: Chapter[];
  onUpdateChapter: (index: number, chapter: Chapter) => void;
  onAddChapter: () => void;
  onGeneratedOutput: (text: string, chapterId: number, prompt: string) => void;
  genre: string;
  selectedFormat?: {
    name: string;
    dimensions: string;
    charactersPerPage: string;
  };
}

export function ChapterEditor({ 
  chapters: initialChapters, 
  onUpdateChapter: parentUpdateChapter, 
  onAddChapter: parentAddChapter, 
  onGeneratedOutput,
  genre,
  selectedFormat
}: ChapterEditorProps) {
  const [activeRole, setActiveRole] = useState<string>("wissenschaftlich");
  const { isGenerating, generateText } = useTextGeneration(onGeneratedOutput);
  const { chapters, updateChapter, updateChapterStatus } = useChapterManagement(initialChapters);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const handleGenerateText = async (index: number) => {
    const chapter = chapters[index];
    await generateText(chapter, index, genre, activeRole);
  };

  const toggleChapterExpansion = (chapterId: number) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="space-y-6">
      {chapters.map((chapter, index) => (
        <Card key={chapter.id} className="fade-in">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-full max-w-[70%]">
                <span className="text-lg font-semibold whitespace-nowrap">
                  Kapitel {index + 1}:
                </span>
                <Input
                  placeholder="Kapiteltitel"
                  value={chapter.title}
                  onChange={(e) => {
                    updateChapter(index, { ...chapter, title: e.target.value });
                    parentUpdateChapter(index, { ...chapter, title: e.target.value });
                  }}
                  className="text-lg font-semibold"
                />
              </div>
              <ChapterStatusBadge status={chapter.status} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`chapter-summary-${chapter.id}`}>Kapitelzusammenfassung</Label>
              <Textarea
                id={`chapter-summary-${chapter.id}`}
                placeholder="Zusammenfassung des gesamten Kapitels..."
                value={chapter.summary || ""}
                onChange={(e) => {
                  updateChapter(index, { ...chapter, summary: e.target.value });
                  parentUpdateChapter(index, { ...chapter, summary: e.target.value });
                }}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PromptGenerator
                chapter={chapter}
                index={index}
                genre={genre}
                activeRole={activeRole}
                setActiveRole={setActiveRole}
                onUpdateChapter={(index, updatedChapter) => {
                  updateChapter(index, updatedChapter);
                  parentUpdateChapter(index, updatedChapter);
                }}
                onGenerateText={handleGenerateText}
                isGenerating={isGenerating === index}
              />
              
              <div className="space-y-4 border p-4 rounded-md">
                <div className="flex items-center text-sm font-medium mb-2">
                  <span className="mr-2">📄 Abschnitte</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                
                <Button
                  onClick={() => toggleChapterExpansion(chapter.id)}
                  variant="outline"
                  className="w-full text-left justify-start"
                >
                  {chapter.sections.length === 0 
                    ? "Keine Abschnitte vorhanden" 
                    : `${chapter.sections.length} Abschnitte`}
                  {expandedChapter === chapter.id ? " (einklappen)" : " (ausklappen)"}
                </Button>
                
                {expandedChapter === chapter.id && (
                  <SectionsList 
                    chapter={chapter}
                    chapterIndex={index}
                    onUpdateChapter={(updatedChapter) => {
                      updateChapter(index, updatedChapter);
                      parentUpdateChapter(index, updatedChapter);
                    }}
                  />
                )}
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => toggleChapterExpansion(chapter.id)}
                    className="text-sm"
                  >
                    {expandedChapter === chapter.id ? "Abschnitte einklappen" : "Abschnitte anzeigen"}
                  </Button>
                  
                  <ChapterPreview chapter={chapter} format={selectedFormat} />
                </div>
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
                  onClick={() => {
                    updateChapterStatus(index, "in-arbeit");
                    parentUpdateChapter(index, { ...chapter, status: "in-arbeit" });
                  }}
                >
                  Als "In Arbeit" markieren
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    updateChapterStatus(index, "fertig");
                    parentUpdateChapter(index, { ...chapter, status: "fertig" });
                  }}
                >
                  Als "Fertig" markieren
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={parentAddChapter} className="w-full">
        + Neues Kapitel
      </Button>
    </div>
  );
}
