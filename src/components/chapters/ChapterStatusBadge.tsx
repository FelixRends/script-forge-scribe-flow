
import { Badge } from "@/components/ui/badge";

type ChapterStatus = "offen" | "in-arbeit" | "fertig";

interface ChapterStatusBadgeProps {
  status: ChapterStatus;
}

export function ChapterStatusBadge({ status }: ChapterStatusBadgeProps) {
  const getStatusColor = (status: ChapterStatus) => {
    switch (status) {
      case "offen":
        return "bg-muted text-muted-foreground";
      case "in-arbeit":
        return "bg-blue-500 text-white";
      case "fertig":
        return "bg-green-500 text-white";
    }
  };

  return <Badge className={getStatusColor(status)}>{status}</Badge>;
}
