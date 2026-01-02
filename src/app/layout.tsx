import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quinton Peters",
  description: "Personal Web Portfolio",
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="rounded-xl px-3 py-2 text-sm hover:bg-muted">
      {children}
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Top nav */}
        <header className="sticky top-0 z-50 border-b border-app bg-app-glass backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
            <Link href="/" className="rounded-xl px-3 py-2 hover:bg-muted">
              <span className="text-sm font-semibold">Quinton Peters</span>
              <span className="ml-2 text-xs text-muted-foreground">
                Machine Learning and Data Engineer
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/resume">Resume</NavLink>
              <NavLink href="/about">About</NavLink>

              <a
                className="rounded-xl px-3 py-2 text-sm hover:bg-muted"
                href="https://github.com/PetersQuinn"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="rounded-xl px-3 py-2 text-sm hover:bg-muted"
                href="https://www.linkedin.com/in/quintonpeters/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              {/* Remove border circle from Contact */}
              <a
                className="rounded-xl px-3 py-2 text-sm hover:bg-muted"
                href="mailto:quinton.peters@duke.edu"
              >
                Contact
              </a>

              {/* Move theme toggle to far right, keep its circle styling */}
              <ThemeToggle />
            </div>
          </nav>
        </header>

        {/* Page content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-app">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Quinton Peters</span>
            <span>Built with Next.js</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
