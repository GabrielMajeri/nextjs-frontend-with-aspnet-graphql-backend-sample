"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Users, ListChecks, Home } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/books", label: "Books", icon: BookOpen },
  { href: "/authors", label: "Authors", icon: Users },
  { href: "/reading-lists", label: "Reading Lists", icon: ListChecks },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Book<span className="text-primary">Vault</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
