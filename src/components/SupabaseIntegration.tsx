
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
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SupabaseIntegration() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnectClick = () => {
    // An dieser Stelle würde normalerweise die Integration mit Supabase aktiviert werden
    // Da dies eine native Integration von Lovable ist, informieren wir den Benutzer
    // über den korrekten Weg zur Aktivierung
    toast({
      title: "Supabase-Integration",
      description: "Bitte klicken Sie auf den grünen Supabase-Button in der oberen rechten Ecke, um die Integration zu aktivieren.",
      duration: 5000,
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
              Verbinden Sie Ihr Buchprojekt mit einer Supabase-Datenbank, um Ihre Daten sicher zu speichern und zusätzliche Funktionen freizuschalten.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="text-sm">
              <p className="mb-2">Mit Supabase erhalten Sie:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sichere Cloud-Speicherung für Ihre Buchprojekte</li>
                <li>Benutzerauthentifizierung</li>
                <li>Automatische Backups</li>
                <li>Zugriff auf Ihre Projekte von verschiedenen Geräten</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              onClick={handleConnectClick}
              className="w-full"
            >
              Mit Supabase verbinden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
