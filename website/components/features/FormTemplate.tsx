"use client";

import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTemplate } from "@/hooks/useTemplate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewTemplate from "./ViewTemplate";
import EditorTempate from "./EditorTempate";
import { Button } from "../ui/button";

interface TabElement {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export default function FormTemplate() {
  const { fileContent, setFileContent, handleFileChange } = useTemplate();
  const tabsElements: TabElement[] = [
    {
      value: "apercu",
      label: "Aperçu",
      content: (
        <EditorTempate
          fileContent={fileContent}
          setFileContent={setFileContent}
        />
      ),
    },
    {
      value: "html",
      label: "Source HTML",
      content: (
        <ViewTemplate
          fileContent={fileContent}
          setFileContent={setFileContent}
        />
      ),
    },
  ];
  return (
    <form className="flex-col gap-3 items-center justify-center">
      <div className="flex justify-center gap-10">
        <div>
          <Field>
            <Label htmlFor="name">Nom de la marque</Label>
            <Input name="name" />
            <Input type="file" accept="text/html" onChange={handleFileChange} />
          </Field>
        </div>
        <Tabs defaultValue="apercu">
          <TabsList>
            {tabsElements.map((tabElement) => (
              <TabsTrigger key={tabElement.value} value={tabElement.value}>
                {tabElement.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabsElements.map((tabElement) => (
            <TabsContent key={tabElement.value} value={tabElement.value}>
              <Card className="w-2xl h-100 flex flex-col">
                {tabElement.content}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Button>Ajouter la marque</Button>
    </form>
  );
}
