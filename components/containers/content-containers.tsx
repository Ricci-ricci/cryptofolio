export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full gap-4 ">
      {children}
    </div>
  );
}
