"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { navLinks, profile, socialLinks } from "@/data/profile";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#05070f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl text-white">{profile.monogram}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
            {profile.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            Navigate
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            Connect
          </p>
          <ul className="mt-4 space-y-3">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.icon === "email" ? undefined : "_blank"}
                  rel={
                    link.icon === "email" ? undefined : "noopener noreferrer"
                  }
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
                >
                  {link.icon === "email" ? <Mail className="h-4 w-4" /> : null}
                  {link.icon === "github" ? (
                    <GitHubIcon className="h-4 w-4" />
                  ) : null}
                  {link.icon === "linkedin" ? (
                    <LinkedInIcon className="h-4 w-4" />
                  ) : null}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40 sm:px-6">
        © {year ?? ""} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
