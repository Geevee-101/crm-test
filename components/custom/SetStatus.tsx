"use client";

import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateClientStatus } from "@/actions";
import { ClientStatus } from "@/app/generated/prisma";

export default function SetStatus({ id, currentStatus }: { id: number, currentStatus: string }) {
  const [status, setStatus] = React.useState(currentStatus);

  function statusChange(value: string) {
    setStatus(value);
    updateClientStatus(id, value as ClientStatus);
  }

  return (
    <>
      <p>{status}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="cursor-pointer h-auto">
            <Pencil />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Set Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={status} onValueChange={statusChange}>
            <DropdownMenuRadioItem value="Active">Active</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Inactive">Inactive</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}