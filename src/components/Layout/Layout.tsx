export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="pt-14">
        {children}
      </div>
  );
}
