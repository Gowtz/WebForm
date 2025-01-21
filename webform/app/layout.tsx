import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import  SessionProvider  from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "WebForm ",
  description: "Simplifying forms",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <SessionProvider session={session}>

          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
