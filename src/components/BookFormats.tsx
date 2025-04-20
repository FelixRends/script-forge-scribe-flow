
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Format {
  name: string;
  dimensions: string;
  charactersPerPage: string;
  suitableFor: string;
}

interface BookFormatsProps {
  genre: string;
}

export function BookFormats({ genre }: BookFormatsProps) {
  const formats: Record<string, Format[]> = {
    roman: [
      { name: "Taschenbuch", dimensions: "12,5 x 19", charactersPerPage: "1.800", suitableFor: "Belletristik" },
      { name: "Trade Paperback", dimensions: "13,5 x 21", charactersPerPage: "2.200", suitableFor: "Hardcover Roman" },
      { name: "Premium", dimensions: "15,5 x 23", charactersPerPage: "2.600", suitableFor: "Geschenkausgabe" },
    ],
    sachbuch: [
      { name: "DIN A5", dimensions: "14,8 x 21", charactersPerPage: "2.000", suitableFor: "Ratgeber, kompakt" },
      { name: "Standard", dimensions: "15 x 22", charactersPerPage: "2.400", suitableFor: "Wissenschaftlich" },
      { name: "Großformat", dimensions: "17 x 24", charactersPerPage: "2.800", suitableFor: "Bildlastige Bücher" },
    ],
    // Add more formats for other genres as needed
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Format</TableHead>
            <TableHead>Maße (cm)</TableHead>
            <TableHead>Zeichen/Seite</TableHead>
            <TableHead>Geeignet für</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(formats[genre] || []).map((format) => (
            <TableRow key={format.name}>
              <TableCell className="font-medium">{format.name}</TableCell>
              <TableCell>{format.dimensions}</TableCell>
              <TableCell>{format.charactersPerPage}</TableCell>
              <TableCell>{format.suitableFor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
