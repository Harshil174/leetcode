import React, { useState } from "react";

import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";
import parserHTML from "prettier/parser-html";
import parserCSS from "prettier/parser-postcss";
import parserMarkdown from "prettier/parser-markdown";
import parserGraphQL from "prettier/parser-graphql";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface LanguageConfig {
  language: string;
  parser: string;
  parsers: any[];
}

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  javascript: {
    language: "javascript",
    parser: "babel",
    parsers: [() => parserBabel],
  },
  typescript: {
    language: "typescript",
    parser: "typescript",
    parsers: [() => parserTypescript],
  },
};

type SelectLanguageProps = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const SelectLanguage = ({ language, setLanguage }: SelectLanguageProps) => {
  const [open, setOpen] = useState(false);

  const handleOnSelect = (selectedLanguage: keyof typeof LANGUAGE_CONFIGS) => {
    setLanguage(selectedLanguage);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[170px] justify-between border-primary/40"
        >
          <div className="w-full text-ellipsis overflow-hidden text-start">
            {language.charAt(0).toUpperCase() + language.slice(1) ||
              "Select framework..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-primary/50 shadow-2xl">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {Object.keys(LANGUAGE_CONFIGS).map((lang) => (
                <CommandItem key={lang} value={lang} onSelect={handleOnSelect}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      language === lang ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectLanguage;
