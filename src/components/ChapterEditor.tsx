
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

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
  chapters, 
  onUpdateChapter, 
  onAddChapter, 
  onGeneratedOutput,
  genre
}: ChapterEditorProps) {
  const [isGenerating, setIsGenerating] = useState<number | null>(null);
  const [activeRole, setActiveRole] = useState<string>("wissenschaftlich");

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

  const styleOptions = {
    roman: ["beschreibend", "dialogreich", "atmosphärisch", "bildhaft", "emotional"],
    sachbuch: ["wissenschaftlich", "analytisch", "sachlich", "informativ", "präzise"],
    drehbuch: ["szenisch", "dialogorientiert", "visuell", "actionreich", "charakterbasiert"],
    lyrik: ["metaphorisch", "rhythmisch", "verdichtet", "assoziativ", "bildreich"]
  };

  const getRoleName = (genreType: string, style: string): string => {
    const roleMap: Record<string, Record<string, string>> = {
      roman: {
        beschreibend: "Erzähler mit Fokus auf Beschreibungen",
        dialogreich: "Dialogorientierter Erzähler",
        atmosphärisch: "Atmosphärischer Stilist",
        bildhaft: "Bildhafter Erzähler",
        emotional: "Emotional fokussierter Autor"
      },
      sachbuch: {
        wissenschaftlich: "Wissenschaftlicher Autor",
        analytisch: "Analytischer Experte",
        sachlich: "Sachlicher Informationsvermittler",
        informativ: "Didaktischer Erklärer",
        präzise: "Präzisionsorientierter Fachautor" 
      },
      drehbuch: {
        szenisch: "Filmischer Szenengestalter",
        dialogorientiert: "Dialogspezialist",
        visuell: "Visueller Szenenentwerfer",
        actionreich: "Action-Sequenz-Autor",
        charakterbasiert: "Charakterentwickler"
      },
      lyrik: {
        metaphorisch: "Metaphorischer Poet",
        rhythmisch: "Rhythmischer Wortkünstler",
        verdichtet: "Autor verdichteter Sprache",
        assoziativ: "Assoziativer Sprachspieler",
        bildreich: "Bildhafter Lyriker"
      }
    };
    
    return roleMap[genreType]?.[style] || "Autor";
  };

  const handleGenerateText = async (index: number) => {
    setIsGenerating(index);
    
    try {
      // For this implementation, we'll simulate AI text generation
      const chapter = chapters[index];
      
      if (!chapter.context) {
        alert("Bitte geben Sie einen Kontext für das Kapitel ein.");
        setIsGenerating(null);
        return;
      }
      
      // Build structured prompt based on the form inputs
      const role = getRoleName(genre, activeRole);
      const structuredPrompt = `
Rolle: Du bist ein ${role}.
Kontext: ${chapter.context}
Position im Buch: Kapitel ${index + 1}${chapter.title ? `: ${chapter.title}` : ''}
Stil und Sprache: ${activeRole}, präzise, stringent
Absatzstruktur: Klare Absätze mit 4-6 Zeilen, logisch gegliedert
Länge: Maximal ${chapter.depthOfField} Zeichen
Aufgabe: Schreibe einen Text gemäß den obigen Vorgaben.
`;
      
      // Simulate delay for API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate simulated text
      let generatedText = "";
      
      if (chapter.context) {
        generatedText = `Dies ist ein vom KI-System generierter Text basierend auf dem Prompt:\n\n`;
        generatedText += `"${chapter.context.substring(0, 50)}${chapter.context.length > 50 ? '...' : ''}"\n\n`;
        generatedText += `Als ${role} verfasse ich einen Text mit ${chapter.depthOfField} Zeichen zum angegebenen Thema:\n\n`;
        
        // Add some content based on genre
        if (genre === "roman") {
          generatedText += `Die Dunkelheit legte sich wie ein Schleier über die Stadt, während Maria durch die leeren Straßen lief. Ihre Schritte hallten von den Häuserwänden wider, ein einsamer Rhythmus in der Stille der Nacht. Sie hatte nicht vorgehabt, so spät noch unterwegs zu sein, aber die Nachricht auf ihrem Telefon ließ ihr keine Wahl.\n\n`;
          generatedText += `"Komm sofort. Es ist wichtig." Mehr stand nicht da, aber sie wusste, von wem die Nachricht kam. Thomas würde sie nicht grundlos zu sich rufen, besonders nicht um diese Uhrzeit.\n\n`;
          generatedText += `Die kalte Luft brannte in ihren Lungen, erinnerte sie daran, dass sie eigentlich zu Hause sein sollte, eingewickelt in ihre warme Decke mit einem Buch in der Hand. Stattdessen waren ihre Finger taub vor Kälte, während sie den Kragen ihres Mantels enger zog.\n\n`;
        } else if (genre === "sachbuch") {
          generatedText += `Die Quantenphysik stellt unser intuitives Verständnis der Realität fundamental in Frage. Anders als in der klassischen Physik, wo Objekte definierte Positionen und Eigenschaften besitzen, existieren Quantenobjekte in einem Zustand der Superposition – sie befinden sich gleichzeitig an mehreren Orten oder in mehreren Zuständen, bis eine Messung stattfindet.\n\n`;
          generatedText += `Dieses Phänomen wurde erstmals in den frühen 1900er Jahren entdeckt und hat seitdem unser wissenschaftliches Weltbild revolutioniert. Der berühmte Doppelspaltversuch demonstriert diese seltsame Eigenschaft: Einzelne Teilchen, durch zwei Spalten geschickt, erzeugen ein Interferenzmuster, als würden sie sich wie Wellen verhalten und durch beide Spalten gleichzeitig gehen.\n\n`;
          generatedText += `Die Konsequenzen dieser Entdeckung reichen weit über das Labor hinaus. Sie haben Auswirkungen auf unser Verständnis von Determinismus, Kausalität und sogar der Natur der Realität selbst. Die Quantenverschränkung, bei der Teilchen über beliebige Entfernungen hinweg miteinander verbunden bleiben, stellt unsere Vorstellung von Lokalität in Frage.\n\n`;
        } else if (genre === "drehbuch") {
          generatedText += `INT. BÜRO - NACHT\n\n`;
          generatedText += `Das Licht der Schreibtischlampe wirft lange Schatten an die Wand. MICHAEL (45), übernächtigt, Anzug zerknittert, starrt auf seinen Computerbildschirm. Auf dem Tisch: ein halbleeres Whiskeyglas, Akten, Fotos von Tatorten.\n\n`;
          generatedText += `SARAH (38) betritt den Raum, bleibt in der Tür stehen. Sie trägt einen Trenchcoat, ihre Haare sind vom Regen nass.\n\n`;
          generatedText += `SARAH\nDu solltest nach Hause gehen, Mike.\n\n`;
          generatedText += `MICHAEL\n(ohne aufzublicken)\nNoch nicht. Er ist irgendwo hier drin.\nIch kann es spüren.\n\n`;
          generatedText += `Sarah seufzt, geht zum Schreibtisch, dreht den Bildschirm zu sich.\n\n`;
        } else if (genre === "lyrik") {
          generatedText += `ZEITENWENDE\n\n`;
          generatedText += `Zwischen den Sekunden\nwohnt eine Ewigkeit,\ndie niemand sieht.\n\n`;
          generatedText += `Gedanken fallen\nwie Herbstblätter\nin das Becken der Zeit.\n\n`;
          generatedText += `Ich sammle sie auf,\nlege sie zwischen die Seiten\neines ungeschriebenen Buches.\n\n`;
          generatedText += `Was bleibt,\nwenn die Uhren schmelzen\nund der Horizont sich faltet?\n\n`;
          generatedText += `Nur der Augenblick,\ndieser zerbrechliche Kristall\nin meiner Hand.\n\n`;
        }
        
        // Add some random lorem ipsum to match the requested depth
        while (generatedText.length < chapter.depthOfField * 0.8) {
          generatedText += "\nDieser Text wird je nach gewünschter Tiefenschärfe angepasst. In einem vollständig implementierten System würde hier ein KI-generierter Text erscheinen, der genau auf Ihre Anforderungen zugeschnitten ist. Die Generierung würde den angegebenen Kontext, das Genre, den gewählten Stil und die gewünschte Länge berücksichtigen.";
        }
      }
      
      // Send generated text to parent component
      onGeneratedOutput(generatedText, chapter.id, structuredPrompt);
      
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="space-y-6">
      {chapters.map((chapter, index) => (
        <Card key={chapter.id} className="fade-in">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-full max-w-[70%]">
                <span className="text-lg font-semibold whitespace-nowrap">Kapitel {index + 1}:</span>
                <Input
                  placeholder="Kapiteltitel"
                  value={chapter.title}
                  onChange={(e) =>
                    onUpdateChapter(index, { ...chapter, title: e.target.value })
                  }
                  className="text-lg font-semibold"
                />
              </div>
              <Badge className={getStatusColor(chapter.status)}>{chapter.status}</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Structured Prompt Panel (Left/Top) */}
              <div className="space-y-4 border p-4 rounded-md">
                <div className="flex items-center text-sm font-medium mb-2">
                  <span className="mr-2">📝 Prompt-Generator</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`context-${chapter.id}`} className="font-medium">
                      📚 Kontext / Kurzfassung (erforderlich)
                    </Label>
                    <Textarea
                      id={`context-${chapter.id}`}
                      placeholder="Beschreiben Sie den Kontext und Inhalt des Kapitels..."
                      value={chapter.context}
                      onChange={(e) =>
                        onUpdateChapter(index, { ...chapter, context: e.target.value })
                      }
                      className="min-h-[100px] mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Dieser Text bildet die inhaltliche Grundlage für die KI-Generierung.
                    </p>
                  </div>
                  
                  <div>
                    <Label className="font-medium">🧠 Rolle / Stilrichtung</Label>
                    <div className="mt-1">
                      <Tabs 
                        value={activeRole} 
                        onValueChange={setActiveRole}
                        className="w-full"
                      >
                        <TabsList className="grid grid-cols-3 mb-2 w-full">
                          {styleOptions[genre as keyof typeof styleOptions]?.slice(0, 3).map(style => (
                            <TabsTrigger key={style} value={style}>
                              {style}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        <TabsList className="grid grid-cols-2 w-full">
                          {styleOptions[genre as keyof typeof styleOptions]?.slice(3, 5).map(style => (
                            <TabsTrigger key={style} value={style}>
                              {style}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getRoleName(genre, activeRole)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="font-medium">
                      ✏️ Tiefenschärfe: {chapter.depthOfField} Zeichen
                    </Label>
                    <Slider
                      min={3000}
                      max={5000}
                      step={500}
                      value={[chapter.depthOfField]}
                      onValueChange={([value]) =>
                        onUpdateChapter(index, { ...chapter, depthOfField: value })
                      }
                    />
                    <div className="text-xs text-muted-foreground">
                      {chapter.depthOfField === 3000 && "Kompakt, präzise, schneller Überblick"}
                      {chapter.depthOfField === 3500 && "Knapp strukturiert mit Kernpunkten"}
                      {chapter.depthOfField === 4000 && "Ausgewogen mit Tiefgang"}
                      {chapter.depthOfField === 4500 && "Detaillierte Ausarbeitung"}
                      {chapter.depthOfField === 5000 && "Maximaler Kontext, rhetorisch ausgearbeitet"}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleGenerateText(index)}
                    disabled={isGenerating === index || !chapter.context}
                    className="w-full mt-4"
                  >
                    {isGenerating === index ? "Generiere Text..." : "Text generieren"}
                  </Button>
                </div>
              </div>
              
              {/* Output Preview Panel (Right/Bottom) */}
              <div className="space-y-2 border p-4 rounded-md">
                <div className="flex items-center text-sm font-medium mb-2">
                  <span className="mr-2">📄 Kapitelinhalt</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <Textarea
                  placeholder="Hier erscheint der gespeicherte Kapiteltext..."
                  value={chapter.content}
                  onChange={(e) =>
                    onUpdateChapter(index, { ...chapter, content: e.target.value })
                  }
                  className="min-h-[250px] bg-background"
                  readOnly={chapter.status === "fertig"}
                />
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>{chapter.content.length} von {chapter.depthOfField} Zeichen</span>
                  {chapter.content && (
                    <span>Zuletzt aktualisiert: {new Date().toLocaleDateString()}</span>
                  )}
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
                  size="sm"
                  onClick={() =>
                    onUpdateChapter(index, { ...chapter, status: "fertig" as const })
                  }
                >
                  Als "Fertig" markieren
                </Button>
              </div>
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
