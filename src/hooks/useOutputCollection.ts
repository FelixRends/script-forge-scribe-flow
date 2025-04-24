
import { useState } from "react";
import { Chapter, Section } from "@/types/bookTypes";

interface OutputMeta {
  chapterId: number;
  prompt: string;
}

export const useOutputCollection = (onUpdateChapter: (index: number, chapter: Chapter) => void, chapters: Chapter[]) => {
  const [currentOutput, setCurrentOutput] = useState("");
  const [currentSummary, setCurrentSummary] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const [outputMeta, setOutputMeta] = useState<OutputMeta>({ chapterId: 0, prompt: "" });

  const handleGeneratedOutput = (text: string, chapterId: number, prompt: string) => {
    setCurrentOutput(text);
    setCurrentSummary("");
    setCurrentComment("");
    setOutputMeta({ chapterId, prompt });
  };

  const handleSaveToChapter = () => {
    if (outputMeta.chapterId && currentOutput) {
      const chapterIndex = chapters.findIndex(c => c.id === outputMeta.chapterId);
      if (chapterIndex !== -1) {
        // Erstelle neuen Abschnitt
        const newSection: Section = {
          id: chapters[chapterIndex].sections?.length 
            ? Math.max(...chapters[chapterIndex].sections.map(s => s.id)) + 1 
            : 1,
          content: currentOutput,
          summary: currentSummary,
          comment: currentComment,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const updatedChapter = {
          ...chapters[chapterIndex],
          sections: [...(chapters[chapterIndex].sections || []), newSection],
          status: "in-arbeit" as const
        };
        
        onUpdateChapter(chapterIndex, updatedChapter);
        setCurrentOutput("");
        setCurrentSummary("");
        setCurrentComment("");
        setOutputMeta({ chapterId: 0, prompt: "" });
      }
    }
  };

  const handleDiscardOutput = () => {
    setCurrentOutput("");
    setCurrentSummary("");
    setCurrentComment("");
    setOutputMeta({ chapterId: 0, prompt: "" });
  };

  return {
    currentOutput,
    setCurrentOutput,
    currentSummary,
    setCurrentSummary,
    currentComment,
    setCurrentComment,
    outputMeta,
    handleGeneratedOutput,
    handleSaveToChapter,
    handleDiscardOutput
  };
};
