import { SessionProvider } from "next-auth/react";
function RootLayout({ children }) {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}

export default RootLayout;
