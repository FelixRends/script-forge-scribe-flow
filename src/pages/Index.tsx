import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookFormats } from "@/components/BookFormats";
import { ChapterEditor, type Chapter } from "@/components/ChapterEditor";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OutputCollector } from "@/components/OutputCollector";
import { useOutputCollection } from "@/hooks/useOutputCollection";

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
  const [projectTitle, setProjectTitle] = useState("Mein Buchprojekt");

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

  const {
    currentOutput,
    setCurrentOutput,
    outputMeta,
    handleGeneratedOutput,
    handleSaveToChapter,
    handleDiscardOutput
  } = useOutputCollection(handleUpdateChapter, chapters);

  const handleExport = (includePrompts: boolean = false) => {
    try {
      // Format the chapters into a text string
      let exportContent = `# ${projectTitle}\n\n`;
      
      chapters.forEach((chapter, index) => {
        if (chapter.title || chapter.content) {
          exportContent += `## Kapitel ${index + 1}: ${chapter.title || `Unbenannt`}\n\n`;
          
          if (includePrompts && chapter.context) {
            exportContent += `### Prompt:\n${chapter.context}\n\n`;
          }
          
          if (chapter.content) {
            exportContent += `${chapter.content}\n\n`;
          } else {
            exportContent += `[Kein Inhalt generiert]\n\n`;
          }
        }
      });
      
      // Create file and download
      const blob = new Blob([exportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectTitle.replace(/\s+/g, '-').toLowerCase()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Fehler beim Exportieren:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center">Buchgenerator</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleExport(true)}
            className="flex items-center gap-2"
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Export mit Prompts</span>
          </Button>
          <Button 
            onClick={() => handleExport(false)}
            className="flex items-center gap-2"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Nur Text exportieren</span>
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <Label htmlFor="project-title">Buchtitel</Label>
              <Input 
                id="project-title"
                value={projectTitle} 
                onChange={(e) => setProjectTitle(e.target.value)}
                className="text-lg font-semibold"
                placeholder="Titel des Buchprojektes"
              />
            </div>
            
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

        {currentOutput && (
          <OutputCollector 
            output={currentOutput}
            setOutput={setCurrentOutput}
            onSave={handleSaveToChapter}
            onDiscard={handleDiscardOutput}
            chapterId={outputMeta.chapterId}
          />
        )}

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">3. Kapitel verwalten</h2>
            <ChapterEditor
              chapters={chapters}
              onUpdateChapter={handleUpdateChapter}
              onAddChapter={handleAddChapter}
              onGeneratedOutput={handleGeneratedOutput}
              genre={genre}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
