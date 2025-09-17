import { ProtectedLayout } from "./admin/_components/ProtectedLayout";


export default function Layout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <ProtectedLayout>{children}</ProtectedLayout>
  );
}
