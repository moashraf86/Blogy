/* eslint-disable react/prop-types */
"use client";

import * as React from "react";
import { RiCheckLine, RiHashtag } from "@remixicon/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxDemo({ tags, onSelect, selectedValue, error }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedValue || "Select Tag");

  /**
   * Handle Value Selection
   */
  const handleSelect = (value) => {
    setValue(value);
    setOpen(false);
    onSelect({ target: { name: "tag", value } });
  };

  /**
   * useEffect to update value when selectedValue prop changes
   */
  React.useEffect(() => {
    setValue(selectedValue || "Select Tag");
    console.log(error);
  }, [selectedValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={`text-sm justify-start ${
            error
              ? "border-danger text-danger hover:text-danger hover:bg-danger/10"
              : ""
          }`}
        >
          <RiHashtag size={16} className="mr-2 shrink-0 opacity-70" />
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tag..." className="h-9" />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  onSelect={handleSelect}
                >
                  {tag.label}
                  <RiCheckLine
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === tag.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
