import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Format {
  name: string;
  dimensions: string;
  charactersPerPage: string;
  suitableFor: string;
}

interface BookFormatsProps {
  genre: string;
  onFormatSelect?: (format: Format) => void;
}

export function BookFormats({ genre, onFormatSelect }: BookFormatsProps) {
  const formats: Record<string, Format[]> = {
    roman: [
      { name: "Taschenbuch", dimensions: "12,5 x 19", charactersPerPage: "1.800", suitableFor: "Belletristik" },
      { name: "Trade Paperback", dimensions: "13,5 x 21", charactersPerPage: "2.200", suitableFor: "Hardcover Roman" },
      { name: "Premium", dimensions: "15,5 x 23", charactersPerPage: "2.600", suitableFor: "Geschenkausgabe" },
      { name: "Kindle Format", dimensions: "13,3 x 20", charactersPerPage: "2.000", suitableFor: "E-Book" },
      { name: "Pocket Guide", dimensions: "10,5 x 17,5", charactersPerPage: "1.400", suitableFor: "Kurzroman" },
    ],
    sachbuch: [
      { name: "DIN A5", dimensions: "14,8 x 21", charactersPerPage: "2.000", suitableFor: "Ratgeber, kompakt" },
      { name: "Standard", dimensions: "15 x 22", charactersPerPage: "2.400", suitableFor: "Wissenschaftlich" },
      { name: "Großformat", dimensions: "17 x 24", charactersPerPage: "2.800", suitableFor: "Bildlastige Bücher" },
      { name: "Trade Paperback", dimensions: "13,5 x 21", charactersPerPage: "2.200", suitableFor: "Fachbuch" },
      { name: "DIN A4", dimensions: "21 x 29,7", charactersPerPage: "3.000", suitableFor: "Technische Manuals" },
    ],
    drehbuch: [
      { name: "US Script", dimensions: "21,6 x 28", charactersPerPage: "1.300", suitableFor: "Hollywood Standard" },
      { name: "EU Format", dimensions: "21 x 29,7", charactersPerPage: "1.400", suitableFor: "Europäischer Standard" },
      { name: "Mini Script", dimensions: "17 x 24", charactersPerPage: "1.200", suitableFor: "Kurzfilm" },
      { name: "TV Format", dimensions: "21 x 29,7", charactersPerPage: "1.500", suitableFor: "Serie, Sitcom" },
    ],
    lyrik: [
      { name: "Poesie-Format", dimensions: "11 x 17", charactersPerPage: "1.000", suitableFor: "Gedichtband" },
      { name: "Quadrat", dimensions: "21 x 21", charactersPerPage: "1.800", suitableFor: "Moderne Lyrik" },
      { name: "Slim", dimensions: "12 x 19", charactersPerPage: "1.200", suitableFor: "Chapbook" },
      { name: "Hochformat", dimensions: "13 x 22", charactersPerPage: "1.400", suitableFor: "Visuelle Poesie" },
    ],
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
            <TableRow 
              key={format.name}
              onClick={() => onFormatSelect?.(format)}
              className={cn(
                "cursor-pointer hover:bg-muted/50 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              )}
            >
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
