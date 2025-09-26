"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ClientListing = {
  id: number
  name: string
  status: "Active" | "Inactive"
  createdAt: Date
}

export const columns: ColumnDef<ClientListing>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      // If no filter value, show all rows
      if (!value) return true;
      // Exact match for status filtering
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    }
  },
]