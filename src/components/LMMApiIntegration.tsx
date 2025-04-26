
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LMMProvider = {
  id: string;
  name: string;
  apiUrlField: string;
  apiKeyField: string;
  apiUrlDefault?: string;
};

export function LMMApiIntegration() {
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState<string>("openai");
  const [apiConfig, setApiConfig] = useState<Record<string, Record<string, string>>>({
    openai: { apiKey: "", apiUrl: "https://api.openai.com/v1" },
    anthropic: { apiKey: "", apiUrl: "https://api.anthropic.com" },
    mistral: { apiKey: "", apiUrl: "https://api.mistral.ai/v1" },
    local: { apiKey: "", apiUrl: "http://localhost:1234/v1" },
  });

  const providers: LMMProvider[] = [
    { id: "openai", name: "OpenAI", apiKeyField: "API-Schlüssel", apiUrlField: "API-URL", apiUrlDefault: "https://api.openai.com/v1" },
    { id: "anthropic", name: "Anthropic", apiKeyField: "API-Schlüssel", apiUrlField: "API-URL", apiUrlDefault: "https://api.anthropic.com" },
    { id: "mistral", name: "Mistral AI", apiKeyField: "API-Schlüssel", apiUrlField: "API-URL", apiUrlDefault: "https://api.mistral.ai/v1" },
    { id: "local", name: "Lokales Modell", apiKeyField: "Passwort (optional)", apiUrlField: "Server-URL", apiUrlDefault: "http://localhost:1234/v1" },
  ];

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
  };

  const handleApiConfigChange = (field: string, value: string) => {
    setApiConfig({
      ...apiConfig,
      [selectedProvider]: {
        ...apiConfig[selectedProvider],
        [field]: value
      }
    });
  };

  const handleSaveConfig = () => {
    // In production, we'd store this securely
    localStorage.setItem("lmm-api-config", JSON.stringify(apiConfig));
    toast({
      title: "API-Konfiguration gespeichert",
      description: `${providers.find(p => p.id === selectedProvider)?.name} wurde erfolgreich konfiguriert.`
    });
  };

  const currentProvider = providers.find(p => p.id === selectedProvider) || providers[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings size={16} />
          <span>LMM-API konfigurieren</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>LMM-API Einstellungen</DialogTitle>
          <DialogDescription>
            Konfiguriere die API-Verbindungen zu verschiedenen LMM-Anbietern für die Textgenerierung.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>LMM-Anbieter auswählen</Label>
            <Select 
              value={selectedProvider} 
              onValueChange={handleProviderChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wähle einen LMM-Anbieter" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">{currentProvider.apiKeyField}</Label>
            <Input 
              id="apiKey" 
              type="password"
              value={apiConfig[selectedProvider]?.apiKey || ""} 
              onChange={(e) => handleApiConfigChange("apiKey", e.target.value)}
              placeholder={`${currentProvider.name} ${currentProvider.apiKeyField} eingeben`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiUrl">{currentProvider.apiUrlField}</Label>
            <Input 
              id="apiUrl" 
              value={apiConfig[selectedProvider]?.apiUrl || currentProvider.apiUrlDefault || ""} 
              onChange={(e) => handleApiConfigChange("apiUrl", e.target.value)}
              placeholder="API-URL eingeben"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSaveConfig}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
