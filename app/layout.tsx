import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Nav from "@/app/components/Nav";
import { getUser } from "./actions";

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
  const user = getUser()
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
          <main className="min-h-screen min-w-full flex flex-col items-center">
          <Nav userName ={user}/>
          {children}
        </main>
      </body>
    </html>
  );
}
