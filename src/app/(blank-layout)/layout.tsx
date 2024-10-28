export default function BlankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="blank-layout h-full w-full">{children}</main>;
}
