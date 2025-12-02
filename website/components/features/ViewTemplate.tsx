"use client";
import { CardContent, CardFooter } from "../ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { html_beautify } from "js-beautify";
import type { SetStateAction } from "react";

interface ViewTemplateProps {
  fileContent: string;
  setFileContent: (value: SetStateAction<string>) => void;
}

export default function ViewTemplate({
  fileContent,
  setFileContent,
}: ViewTemplateProps) {
  return (
    <>
      <CardContent className="flex-1 flex overflow-hidden">
        <Textarea
          id="template"
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
          className="resize-none field-sizing-content"
        />
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={() => {
            setFileContent(html_beautify(fileContent, { indent_size: 2 }));
          }}
        >
          Formatter le html
        </Button>
      </CardFooter>
    </>
  );
}
