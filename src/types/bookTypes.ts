
export interface Section {
  id: number;
  content: string;
  summary: string;
  comment?: string; // Für semantische Brücken
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: number;
  title: string;
  context: string;
  status: "offen" | "in-arbeit" | "fertig";
  depthOfField: number;
  sections: Section[];
  summary: string; // Kapitelzusammenfassung
}
