import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CodeOjas",
  description: "AI-powered DSA practice platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Navbar must NOT block clicks */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Page content ABOVE everything */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
