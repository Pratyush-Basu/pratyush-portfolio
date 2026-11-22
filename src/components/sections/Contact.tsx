"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile, socialLinks } from "@/data/profile";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-0 -z-[1] bg-[#05070f]/35" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Intelligent."
          description="Open to conversations about AI/ML roles, collaborations and intelligent product engineering."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealGroup stagger={0.1} className="space-y-4">
            {socialLinks.map((link) => (
              <RevealItem key={link.href}>
                <SpotlightCard
                  as="a"
                  href={link.href}
                  target={link.icon === "email" ? undefined : "_blank"}
                  rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/35 hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-violet-300 transition duration-300 group-hover:scale-110">
                    {link.icon === "email" ? <Mail className="h-4 w-4" /> : null}
                    {link.icon === "github" ? (
                      <GitHubIcon className="h-4 w-4" />
                    ) : null}
                    {link.icon === "linkedin" ? (
                      <LinkedInIcon className="h-4 w-4" />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    {link.label}:{" "}
                    {link.icon === "email" ? profile.email : link.href.replace(/^https?:\/\//, "")}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </SpotlightCard>
              </RevealItem>
            ))}

            <RevealItem>
              <Button
                href={profile.resumePath}
                variant="secondary"
                className="group hover:-translate-y-0.5"
                download
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download Resume
              </Button>
            </RevealItem>
          </RevealGroup>

          <Reveal x={32} y={0}>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition duration-300 focus-within:border-violet-400/30 focus-within:shadow-[0_0_50px_-20px_rgba(139,92,246,0.6)]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/80">
                Name
                <input
                  name="name"
                  required
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none transition duration-200 focus:border-violet-400/60 focus:bg-black/30 focus:ring-2 focus:ring-violet-400/20"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/80">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none transition duration-200 focus:border-violet-400/60 focus:bg-black/30 focus:ring-2 focus:ring-violet-400/20"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm text-white/80">
              Subject
              <input
                name="subject"
                required
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none transition duration-200 focus:border-violet-400/60 focus:bg-black/30 focus:ring-2 focus:ring-violet-400/20"
              />
            </label>
            <label className="mt-4 grid gap-2 text-sm text-white/80">
              Message
              <textarea
                name="message"
                rows={5}
                required
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none transition duration-200 focus:border-violet-400/60 focus:bg-black/30 focus:ring-2 focus:ring-violet-400/20"
              />
            </label>
            <div className="mt-5">
              <Button type="submit">Send Message</Button>
            </div>
            {status === "sent" ? (
              <p className="mt-3 text-sm text-white/55" role="status">
                Message captured locally. Wire this form to your backend or email
                service when ready.
              </p>
            ) : null}
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
