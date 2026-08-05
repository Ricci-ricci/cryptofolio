export default function SectionContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 w-full min-w-0">
      <h2 className="text-xl font-semibold capitalize">{title}</h2>

      <div className="p-2 w-full">
        {children}
      </div>
    </section>
  );
}
