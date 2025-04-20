
import { useState } from "react";
import { Chapter } from "@/components/ChapterEditor";

interface OutputMeta {
  chapterId: number;
  prompt: string;
}

export const useOutputCollection = (onUpdateChapter: (index: number, chapter: Chapter) => void, chapters: Chapter[]) => {
  const [currentOutput, setCurrentOutput] = useState("");
  const [outputMeta, setOutputMeta] = useState<OutputMeta>({ chapterId: 0, prompt: "" });

  const handleGeneratedOutput = (text: string, chapterId: number, prompt: string) => {
    setCurrentOutput(text);
    setOutputMeta({ chapterId, prompt });
  };

  const handleSaveToChapter = () => {
    if (outputMeta.chapterId && currentOutput) {
      const chapterIndex = chapters.findIndex(c => c.id === outputMeta.chapterId);
      if (chapterIndex !== -1) {
        const updatedChapter = {
          ...chapters[chapterIndex],
          content: currentOutput,
          status: "in-arbeit" as const
        };
        onUpdateChapter(chapterIndex, updatedChapter);
        setCurrentOutput("");
        setOutputMeta({ chapterId: 0, prompt: "" });
      }
    }
  };

  const handleDiscardOutput = () => {
    setCurrentOutput("");
    setOutputMeta({ chapterId: 0, prompt: "" });
  };

  return {
    currentOutput,
    setCurrentOutput,
    outputMeta,
    handleGeneratedOutput,
    handleSaveToChapter,
    handleDiscardOutput
  };
};
