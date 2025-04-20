
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookFormats } from "@/components/BookFormats";
import { ChapterEditor, type Chapter } from "@/components/ChapterEditor";

const INITIAL_CHAPTER: Chapter = {
  id: 1,
  title: "",
  context: "",
  status: "offen",
  depthOfField: 4000,
  content: "",
};

export default function Index() {
  const [genre, setGenre] = useState("roman");
  const [chapters, setChapters] = useState<Chapter[]>([INITIAL_CHAPTER]);

  const handleUpdateChapter = (index: number, updatedChapter: Chapter) => {
    const newChapters = [...chapters];
    newChapters[index] = updatedChapter;
    setChapters(newChapters);
  };

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      { ...INITIAL_CHAPTER, id: chapters.length + 1 },
    ]);
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Buchgenerator</h1>

      <div className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">1. Genre wählen</h2>
            <Tabs value={genre} onValueChange={setGenre}>
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <TabsTrigger value="roman">Roman</TabsTrigger>
                <TabsTrigger value="sachbuch">Sachbuch</TabsTrigger>
                <TabsTrigger value="drehbuch">Drehbuch</TabsTrigger>
                <TabsTrigger value="lyrik">Lyrik</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">2. Format wählen</h2>
            <BookFormats genre={genre} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">3. Kapitel verwalten</h2>
            <ChapterEditor
              chapters={chapters}
              onUpdateChapter={handleUpdateChapter}
              onAddChapter={handleAddChapter}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
