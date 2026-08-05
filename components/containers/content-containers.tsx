export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" w-full gap-2 ">
      {children}
    </div>
  );
}
