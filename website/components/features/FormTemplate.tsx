"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { html_beautify } from "js-beautify";
export default function FormTemplate() {
  const [_, setFile] = useState<null | File>(null);
  const [fileContent, setFileContent] = useState("");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      setFileContent(await selectedFile.text());
    }
  };
  return (
    <form className="flex justify-center">
      <div>
        <Field>
          <Label htmlFor="name">Nom de la marque</Label>
          <Input name="name" />
          <Input type="file" accept="text/html" onChange={handleFileChange} />
        </Field>
      </div>

      <div>
        <h1 className="text-2xl">Visualisation Template</h1>
        <Card className="w-2xl h-100 flex flex-col">
          <CardContent className="flex-1 flex overflow-hidden">
            <Textarea
              id="template"
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="resize-none"
            />
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              onClick={(e) => {
                setFileContent(html_beautify(fileContent, { indent_size: 2 }));
              }}
            >
              Formatter le html
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
