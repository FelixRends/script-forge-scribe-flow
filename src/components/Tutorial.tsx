import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

export function Tutorial() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Willkommen zum LMM Buchgenerator",
      description: "Mit dieser App kannst du mithilfe von Large Multimodal Models (LMM) Bücher erstellen. Lass uns eine kurze Tour durch die wichtigsten Funktionen machen.",
    },
    {
      title: "1. Wähle ein Genre",
      description: "Im ersten Schritt wählst du ein Genre für dein Buch aus. Dies hilft dem KI-Modell, passende Inhalte und Stile zu generieren.",
    },
    {
      title: "2. Wähle ein Format",
      description: "Bestimme das Format deines Buches. Dies wirkt sich auf die Präsentation und den Umfang deines Projekts aus.",
    },
    {
      title: "3. Erstelle Kapitel",
      description: "Füge Kapitel hinzu und bearbeite sie. Du kannst Zusammenfassungen schreiben und KI-generierte Inhalte für jedes Kapitel erstellen.",
    },
    {
      title: "4. Generiere Inhalte mit LMM",
      description: "Nutze die LMM-Integration, um basierend auf deinen Anweisungen automatisch Inhalte zu generieren. Wähle zwischen verschiedenen LLM-Anbietern.",
    },
    {
      title: "5. Speichern und Laden",
      description: "Du kannst dein Projekt jederzeit speichern und später wieder laden, um deine Arbeit fortzusetzen.",
    },
    {
      title: "6. Supabase-Integration",
      description: "Um Ihre Daten sicher zu speichern, müssen Sie die Supabase-Integration über Lovable aktivieren:",
      steps: [
        "Klicken Sie auf den grünen Supabase-Button in der rechten oberen Ecke der Lovable-Plattform",
        "Wählen Sie 'Projekt verbinden' oder 'Neues Projekt erstellen'",
        "Folgen Sie den Anweisungen zur Authentifizierung und Projektkonfiguration",
        "Nach der Verbindung können Sie Ihre Buchprojekte sicher in der Cloud speichern"
      ]
    },
    {
      title: "7. Exportieren",
      description: "Wenn du fertig bist, exportiere dein Buch in verschiedenen Formaten, um es zu teilen oder zu veröffentlichen.",
    },
  ];

  const handleNextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      setCurrentStep(0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        Tutorial starten
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{tutorialSteps[currentStep].title}</DialogTitle>
            <DialogDescription>
              {tutorialSteps[currentStep].description}
            </DialogDescription>
          </DialogHeader>
          
          {tutorialSteps[currentStep].steps && (
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {tutorialSteps[currentStep].steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          )}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Zurück
            </Button>
            
            <div className="flex gap-1">
              {tutorialSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNextStep}
              className="flex items-center gap-2"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  Fertig
                  <Check size={16} />
                </>
              ) : (
                <>
                  Weiter
                  <ChevronRight size={16} />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
