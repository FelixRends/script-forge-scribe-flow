
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download, FileUp, Save } from "lucide-react";
import { Chapter } from "@/types/bookTypes";

interface ProjectData {
  projectTitle: string;
  genre: string;
  chapters: Chapter[];
  selectedFormat?: {
    name: string;
    dimensions: string;
    charactersPerPage: string;
  } | null;
  lastSaved: string;
}

interface ProjectManagerProps {
  projectTitle: string;
  genre: string;
  chapters: Chapter[];
  selectedFormat: {
    name: string;
    dimensions: string;
    charactersPerPage: string;
  } | null;
  onProjectLoad: (data: ProjectData) => void;
}

export function ProjectManager({ 
  projectTitle, 
  genre, 
  chapters, 
  selectedFormat, 
  onProjectLoad 
}: ProjectManagerProps) {
  const { toast } = useToast();
  const [savedProjects, setSavedProjects] = useState<ProjectData[]>([]);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState(projectTitle);

  // Load saved projects from localStorage
  const loadSavedProjectsList = () => {
    try {
      const projectsJson = localStorage.getItem('lmm-saved-projects');
      if (projectsJson) {
        const projects = JSON.parse(projectsJson) as ProjectData[];
        setSavedProjects(projects);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Projektliste:", error);
      toast({
        title: "Fehler",
        description: "Die Projektliste konnte nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  const handleSaveProject = () => {
    try {
      // Create project data
      const projectData: ProjectData = {
        projectTitle: projectTitle,
        genre,
        chapters,
        selectedFormat,
        lastSaved: new Date().toISOString(),
      };

      // Get existing projects
      const projectsJson = localStorage.getItem('lmm-saved-projects');
      let projects: ProjectData[] = projectsJson ? JSON.parse(projectsJson) : [];

      // Check if project with same name exists
      const existingIndex = projects.findIndex(p => p.projectTitle === projectTitle);
      if (existingIndex >= 0) {
        // Update existing project
        projects[existingIndex] = projectData;
      } else {
        // Add new project
        projects.push(projectData);
      }

      // Save back to localStorage
      localStorage.setItem('lmm-saved-projects', JSON.stringify(projects));

      toast({
        title: "Projekt gespeichert",
        description: `"${projectTitle}" wurde erfolgreich gespeichert.`,
      });
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      toast({
        title: "Fehler beim Speichern",
        description: "Das Projekt konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  const handleLoadProject = (project: ProjectData) => {
    try {
      onProjectLoad(project);
      setIsLoadDialogOpen(false);
      toast({
        title: "Projekt geladen",
        description: `"${project.projectTitle}" wurde erfolgreich geladen.`,
      });
    } catch (error) {
      console.error("Fehler beim Laden:", error);
      toast({
        title: "Fehler beim Laden",
        description: "Das Projekt konnte nicht geladen werden.",
        variant: "destructive",
      });
    }
  };

  const handleExportProject = () => {
    try {
      const projectData: ProjectData = {
        projectTitle,
        genre,
        chapters,
        selectedFormat,
        lastSaved: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${projectTitle.replace(/\s+/g, "-").toLowerCase()}.lmm.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Projekt exportiert",
        description: `"${projectTitle}" wurde als Datei exportiert.`,
      });
    } catch (error) {
      console.error("Fehler beim Exportieren:", error);
      toast({
        title: "Fehler beim Exportieren",
        description: "Das Projekt konnte nicht exportiert werden.",
        variant: "destructive", 
      });
    }
  };

  const handleImportProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const projectData = JSON.parse(content) as ProjectData;
          
          onProjectLoad(projectData);
          toast({
            title: "Projekt importiert",
            description: `"${projectData.projectTitle}" wurde erfolgreich importiert.`,
          });
        } catch (error) {
          console.error("Fehler beim Parsen der Datei:", error);
          toast({
            title: "Fehler beim Importieren",
            description: "Die Datei konnte nicht gelesen werden.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Fehler beim Datei-Import:", error);
      toast({
        title: "Fehler beim Importieren",
        description: "Die Datei konnte nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      // Reset the input so the same file can be selected again
      event.target.value = "";
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Save size={16} />
            <span>Projekt</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSaveProject} className="flex items-center gap-2">
            <Save size={16} />
            <span>Speichern</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => {
              loadSavedProjectsList();
              setIsLoadDialogOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            <span>Laden</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportProject} className="flex items-center gap-2">
            <Download size={16} />
            <span>Als Datei exportieren</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <label className="flex items-center gap-2 cursor-pointer">
              <FileUp size={16} />
              <span>Aus Datei importieren</span>
              <Input 
                type="file" 
                accept=".json,.lmm.json" 
                onChange={handleImportProject}
                className="hidden" 
              />
            </label>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Projekt laden</DialogTitle>
            <DialogDescription>
              Wähle ein gespeichertes Projekt aus der Liste.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-80 overflow-auto py-4">
            {savedProjects.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Keine gespeicherten Projekte gefunden.
              </p>
            ) : (
              <div className="space-y-2">
                {savedProjects.map((project, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="w-full justify-between flex items-center"
                    onClick={() => handleLoadProject(project)}
                  >
                    <span className="font-medium">{project.projectTitle}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(project.lastSaved).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.chapters.length} Kapitel
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
