
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function FilterTableStatus({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const handleValueChange = (selectedValue: string) => {
    // If "All" is selected, clear the filter by passing undefined/empty string
    if (selectedValue === "All") {
      onValueChange("");
    } else {
      onValueChange(selectedValue);
    }
  };

  // Display current filter value or "All" if no filter is applied
  const displayValue = value || "All";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Status: {displayValue}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={displayValue} onValueChange={handleValueChange}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Active">Active</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Inactive">Inactive</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}