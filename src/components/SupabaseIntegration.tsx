
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Database, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function SupabaseIntegration() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnectClick = () => {
    toast({
      title: "Supabase-Integration aktivieren",
      description: "Klicken Sie auf den grünen Supabase-Button in der rechten oberen Ecke der Lovable-Plattform, um die Integration zu verbinden.",
      action: (
        <ToastAction 
          altText="Zur Dokumentation" 
          onClick={() => window.open("https://docs.lovable.dev/integrations/supabase", "_blank")}
        >
          Dokumentation
        </ToastAction>
      ),
      duration: 7000,
    });
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Database size={16} />
            <span>Supabase</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supabase-Integration</DialogTitle>
            <DialogDescription>
              Verbinden Sie Ihr Buchprojekt mit Supabase, um Ihre Daten sicher zu speichern.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4 text-sm">
            <h3 className="font-semibold">So aktivieren Sie die Integration:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Öffnen Sie die Lovable-Plattform</li>
              <li>Suchen Sie den grünen Supabase-Button in der rechten oberen Ecke</li>
              <li>Klicken Sie auf "Projekt verbinden" oder "Neues Projekt erstellen"</li>
              <li>Folgen Sie den Anweisungen zur Authentifizierung</li>
            </ol>
            
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
              <p className="flex items-center gap-2">
                <ExternalLink size={16} className="text-yellow-600" />
                <span className="text-yellow-800">
                  Die Integration erfolgt direkt über die Lovable-Plattform, nicht in dieser Anwendung.
                </span>
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              onClick={handleConnectClick}
              variant="secondary"
              className="w-full"
            >
              Integrationsanleitung anzeigen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
