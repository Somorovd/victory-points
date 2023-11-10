import { Button } from "@/components/ui/button";
import { ColumnDef, Column } from "@tanstack/react-table";
import { Lock, ArrowUpDown } from "lucide-react";

export type LobbyRow = {
  hostName: string;
  name: string;
  hasPassword: boolean;
  capacity: number;
};

interface SortableHeaderProps {
  column: Column<LobbyRow>;
  header: string;
}

const SortableHeader = ({ column, header }: SortableHeaderProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {header}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<LobbyRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        header={"Lobby"}
      />
    ),
  },
  {
    accessorKey: "hostName",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        header={"Host"}
      />
    ),
  },
  {
    accessorKey: "hasPassword",
    header: "Private",
    cell: ({ row }) => {
      const hasPassword = row.getValue("hasPassword");
      return (
        <div className="">{hasPassword ? <Lock className="h-4" /> : ""}</div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
];
