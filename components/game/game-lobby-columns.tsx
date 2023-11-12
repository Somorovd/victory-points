import { Button } from "@/components/ui/button";
import { LobbyWithHost } from "@/types";
import { ColumnDef, Column } from "@tanstack/react-table";
import { Lock, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps {
  column: Column<LobbyWithHost>;
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

export const columns: ColumnDef<LobbyWithHost>[] = [
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
    accessorKey: "password",
    header: "Private",
    cell: ({ row }) => {
      const hasPassword = !!row.getValue("password");
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
