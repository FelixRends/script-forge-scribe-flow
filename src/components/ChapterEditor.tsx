
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

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
}

export function ChapterEditor({ chapters, onUpdateChapter, onAddChapter }: ChapterEditorProps) {
  const getStatusColor = (status: Chapter["status"]) => {
    switch (status) {
      case "offen":
        return "bg-muted text-muted-foreground";
      case "in-arbeit":
        return "bg-blue-500 text-white";
      case "fertig":
        return "bg-green-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {chapters.map((chapter, index) => (
        <Card key={chapter.id} className="fade-in">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <Input
                placeholder={`Kapitel ${index + 1} Titel`}
                value={chapter.title}
                onChange={(e) =>
                  onUpdateChapter(index, { ...chapter, title: e.target.value })
                }
                className="text-lg font-semibold max-w-[70%]"
              />
              <Badge className={getStatusColor(chapter.status)}>{chapter.status}</Badge>
            </div>
            
            <Textarea
              placeholder="Kontext und Ziel des Kapitels..."
              value={chapter.context}
              onChange={(e) =>
                onUpdateChapter(index, { ...chapter, context: e.target.value })
              }
              className="min-h-[100px]"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tiefenschärfe: {chapter.depthOfField} Zeichen
              </label>
              <Slider
                min={3000}
                max={5000}
                step={500}
                value={[chapter.depthOfField]}
                onValueChange={([value]) =>
                  onUpdateChapter(index, { ...chapter, depthOfField: value })
                }
                className="my-4"
              />
            </div>
            
            <Textarea
              placeholder="Hier erscheint der generierte Text..."
              value={chapter.content}
              onChange={(e) =>
                onUpdateChapter(index, { ...chapter, content: e.target.value })
              }
              className="min-h-[200px]"
            />
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() =>
                  onUpdateChapter(index, {
                    ...chapter,
                    status: "in-arbeit" as const,
                  })
                }
              >
                Als "In Arbeit" markieren
              </Button>
              <Button
                variant="default"
                onClick={() =>
                  onUpdateChapter(index, { ...chapter, status: "fertig" as const })
                }
              >
                Als "Fertig" markieren
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={onAddChapter} className="w-full">
        + Neues Kapitel
      </Button>
    </div>
  );
}
