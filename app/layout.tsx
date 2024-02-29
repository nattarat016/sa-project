import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Nav from "@/components/Nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ระบบบันทึกกิจกรรมจิตอาสา",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="aqua" lang="en" className={GeistSans.className}>
      <main className="min-h-screen min-w-full flex flex-col items-center">
        <Nav />
        {children}
      </main>
    </html>
  );
}
