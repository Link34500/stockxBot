export function Section({ children }: React.ComponentProps<"section">) {
  return <section className="p-4 flex flex-col">{children}</section>;
}

export function SectionTitle({ children }: React.ComponentProps<"h1">) {
  return <h1 className="text-3xl">{children}</h1>;
}
