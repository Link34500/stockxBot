import { prisma } from "@stockxbot/common/prisma/client";
import { notFound } from "next/navigation";

type MarqueProps = {
  params: Promise<{
    marqueId: string;
  }>;
};

export default async function Marque({ params }: MarqueProps) {
  const { marqueId } = await params;
  const marque = await prisma.marque.findUnique({
    where: { id: Number(marqueId) },
  });
  if (!marque) notFound();
  return <></>;
}
