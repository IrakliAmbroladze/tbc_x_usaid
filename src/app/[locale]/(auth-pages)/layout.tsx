export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full gap-20 flex flex-1 flex-col justify-center items-center">
      <div className="max-w-7xl flex flex-col gap-12 items-start">
        {children}
      </div>
    </div>
  );
}
