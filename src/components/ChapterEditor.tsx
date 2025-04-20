
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChapterStatusBadge } from "./chapters/ChapterStatusBadge";
import { PromptGenerator } from "./chapters/PromptGenerator";
import { ChapterContent } from "./chapters/ChapterContent";
import { useTextGeneration } from "@/hooks/useTextGeneration";
import { useChapterManagement } from "@/hooks/useChapterManagement";

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
  onGeneratedOutput: (text: string, chapterId: number, prompt: string) => void;
  genre: string;
}

export function ChapterEditor({ 
  chapters: initialChapters, 
  onUpdateChapter: parentUpdateChapter, 
  onAddChapter: parentAddChapter, 
  onGeneratedOutput,
  genre
}: ChapterEditorProps) {
  const [activeRole, setActiveRole] = useState<string>("wissenschaftlich");
  const { isGenerating, generateText } = useTextGeneration(onGeneratedOutput);
  const { chapters, updateChapter, updateChapterStatus } = useChapterManagement(initialChapters);

  const handleGenerateText = async (index: number) => {
    const chapter = chapters[index];
    await generateText(chapter, index, genre, activeRole);
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
              
              <ChapterContent
                chapter={chapter}
                index={index}
                onUpdateChapter={(index, updatedChapter) => {
                  updateChapter(index, updatedChapter);
                  parentUpdateChapter(index, updatedChapter);
                }}
              />
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
