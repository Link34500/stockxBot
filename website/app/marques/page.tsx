import FormTemplate from "@/components/features/FormTemplate";
import { Section, SectionTitle } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@stockxbot/common/prisma/client";

export default async function Marques() {
  const marques = await prisma.marque.findMany({ take: 10 });

  return (
    <main>
      <Section>
        <SectionTitle>Ajouter une marque</SectionTitle>
        <FormTemplate />
      </Section>
      <Section>
        <SectionTitle>Modifier une marque</SectionTitle>
        <div className="flex flex-row flex-wrap gap-8">
          {marques.map((marque, idx) => (
            <Card key={idx} className="max-w-lg w-10/12">
              <CardHeader>
                <CardTitle>{marque.name}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <CardAction className="flex flex-col gap-3 w-full">
                  <Button>Modifier le template</Button>
                  <Button variant={"destructive"}>
                    Supprimmer le Template
                  </Button>
                </CardAction>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
