
import { useState } from "react";
import { Chapter } from "@/components/ChapterEditor";

export const useChapterManagement = (initialChapters: Chapter[]) => {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);

  const updateChapter = (index: number, updatedChapter: Chapter) => {
    const newChapters = [...chapters];
    newChapters[index] = updatedChapter;
    setChapters(newChapters);
  };

  const addChapter = (initialChapter: Chapter) => {
    setChapters([...chapters, { 
      ...initialChapter, 
      id: chapters.length + 1,
      summary: initialChapter.summary || "" 
    }]);
  };

  const updateChapterStatus = (index: number, status: Chapter["status"]) => {
    const newChapters = [...chapters];
    newChapters[index] = { ...newChapters[index], status };
    setChapters(newChapters);
  };

  return {
    chapters,
    updateChapter,
    addChapter,
    updateChapterStatus
  };
};
