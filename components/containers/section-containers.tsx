export default function SectionContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="rounded-xl border p-6">
        {children}
      </div>
    </section>
  );
}
