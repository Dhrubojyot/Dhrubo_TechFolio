"use client";

import { Logo } from "@/components/ui/logo";
import { Github, Instagram, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";

// Custom SVG component for the WhatsApp brand logo
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: siteConfig.github,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: siteConfig.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: siteConfig.instagram,
      label: "Instagram",
    },
    {
      icon: WhatsAppIcon,
      href: siteConfig.whatsapp,
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="border-t px-4 py-3.5 md:px-8">
      <div className="text-foreground/70 grid grid-cols-1 items-center gap-3 text-sm md:grid-cols-3">
        {/* Left: Logo */}
        <div className="flex justify-center md:justify-start">
          <Logo className="w-10" />
        </div>

        {/* Center: Copyright Text */}
        <div className="text-center font-normal">
          © 2026 Dhrubojyoti. All rights reserved.
        </div>

        {/* Right: Socials & Back to top */}
        <div className="flex items-center justify-center gap-4 md:justify-end">
          {/* Social Links */}
          <div className="inline-flex overflow-hidden rounded-md border *:size-8 *:border-r last:*:border-r-0">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-foreground/60 hover:bg-muted/30 hover:text-foreground inline-flex items-center justify-center transition-colors"
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-foreground/5 rounded-md border px-2 py-1 transition-all"
          >
            Back to top
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
