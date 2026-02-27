import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b">
      <h1 className="text-xl font-bold">CodeOjas</h1>

      <div className="flex gap-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/features" className="hover:underline">
          Features
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </div>
    </nav>
  );
}