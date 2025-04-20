
import { useState } from "react";
import { Chapter } from "@/components/ChapterEditor";

export const useTextGeneration = (onGeneratedOutput: (text: string, chapterId: number, prompt: string) => void) => {
  const [isGenerating, setIsGenerating] = useState<number | null>(null);

  const generateText = async (chapter: Chapter, index: number, genre: string, activeRole: string) => {
    setIsGenerating(index);
    try {
      if (!chapter.context) {
        alert("Bitte geben Sie einen Kontext für das Kapitel ein.");
        return;
      }

      const role = getRoleName(genre, activeRole);
      const structuredPrompt = buildPrompt(chapter, index, role);
      
      // Simulate delay for API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedText = generateSimulatedText(chapter, genre, role);
      onGeneratedOutput(generatedText, chapter.id, structuredPrompt);
      
    } catch (error) {
      console.error("Error generating text:", error);
    } finally {
      setIsGenerating(null);
    }
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

  const buildPrompt = (chapter: Chapter, index: number, role: string): string => {
    return `
Rolle: Du bist ein ${role}.
Kontext: ${chapter.context}
Position im Buch: Kapitel ${index + 1}${chapter.title ? `: ${chapter.title}` : ''}
Stil und Sprache: präzise, stringent
Absatzstruktur: Klare Absätze mit 4-6 Zeilen, logisch gegliedert
Länge: Maximal ${chapter.depthOfField} Zeichen
Aufgabe: Schreibe einen Text gemäß den obigen Vorgaben.
`;
  };

  const generateSimulatedText = (chapter: Chapter, genre: string, role: string): string => {
    let text = `Dies ist ein vom KI-System generierter Text basierend auf dem Prompt:\n\n`;
    text += `"${chapter.context.substring(0, 50)}${chapter.context.length > 50 ? '...' : ''}"\n\n`;
    text += `Als ${role} verfasse ich einen Text mit ${chapter.depthOfField} Zeichen zum angegebenen Thema:\n\n`;
    
    if (genre === "roman") {
      text += `Die Dunkelheit legte sich wie ein Schleier über die Stadt, während Maria durch die leeren Straßen lief. Ihre Schritte hallten von den Häuserwänden wider, ein einsamer Rhythmus in der Stille der Nacht. Sie hatte nicht vorgehabt, so spät noch unterwegs zu sein, aber die Nachricht auf ihrem Telefon ließ ihr keine Wahl.\n\n`;
    } else if (genre === "sachbuch") {
      text += `Die Quantenphysik stellt unser intuitives Verständnis der Realität fundamental in Frage. Anders als in der klassischen Physik, wo Objekte definierte Positionen und Eigenschaften besitzen, existieren Quantenobjekte in einem Zustand der Superposition.\n\n`;
    } else if (genre === "drehbuch") {
      text += `INT. BÜRO - NACHT\n\nDas Licht der Schreibtischlampe wirft lange Schatten an die Wand. MICHAEL (45), übernächtigt, Anzug zerknittert, starrt auf seinen Computerbildschirm.\n\n`;
    } else if (genre === "lyrik") {
      text += `ZEITENWENDE\n\nZwischen den Sekunden\nwohnt eine Ewigkeit,\ndie niemand sieht.\n\n`;
    }
    
    // Add some random text to match the requested depth
    while (text.length < chapter.depthOfField * 0.8) {
      text += "\nDieser Text wird je nach gewünschter Tiefenschärfe angepasst. In einem vollständig implementierten System würde hier ein KI-generierter Text erscheinen.";
    }
    
    return text;
  };

  return {
    isGenerating,
    generateText
  };
};
