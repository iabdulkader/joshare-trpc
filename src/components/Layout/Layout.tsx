export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="pt-14 w-full flex justify-center mb-24 mt-6">
        {children}
      </div>
  );
}
