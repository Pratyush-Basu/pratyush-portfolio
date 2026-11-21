"use client";

import { FormEvent, useState } from "react";
import { Mail, Download } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile, socialLinks } from "@/data/profile";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const ref = useGsapReveal<HTMLElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <section id="contact" ref={ref} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Intelligent."
          description="Open to conversations about AI/ML roles, collaborations and intelligent product engineering."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.icon === "email" ? undefined : "_blank"}
                rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75 transition hover:border-violet-400/35 hover:text-white"
              >
                {link.icon === "email" ? <Mail className="h-4 w-4" /> : null}
                {link.icon === "github" ? (
                  <GitHubIcon className="h-4 w-4" />
                ) : null}
                {link.icon === "linkedin" ? (
                  <LinkedInIcon className="h-4 w-4" />
                ) : null}
                <span>
                  {link.label}:{" "}
                  {link.icon === "email" ? profile.email : link.href.replace(/^https?:\/\//, "")}
                </span>
              </a>
            ))}

            <Button href={profile.resumePath} variant="secondary" download>
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/80">
                Name
                <input
                  name="name"
                  required
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none focus:border-violet-400/50"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/80">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none focus:border-violet-400/50"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm text-white/80">
              Subject
              <input
                name="subject"
                required
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none focus:border-violet-400/50"
              />
            </label>
            <label className="mt-4 grid gap-2 text-sm text-white/80">
              Message
              <textarea
                name="message"
                rows={5}
                required
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 outline-none focus:border-violet-400/50"
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
        </div>
      </div>
    </section>
  );
}
