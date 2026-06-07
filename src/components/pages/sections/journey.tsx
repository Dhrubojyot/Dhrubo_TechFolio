"use client";

import SectionHeading from "@/components/section-heading";
import HeadingLine from "@/components/ui/heading-line";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Briefcase,
  CalendarDays,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import React, { useState, useRef, useEffect } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const education = [
  {
    id: "edu-1",
    title: "B.Tech in Computer Science and Engineering",
    subtitle: "Academy of Technology",
    location: "Adisaptagram, Hooghly, India",
    duration: "2025 – 2028",
    status: "ongoing" as const,
    description:
      "Pursuing a comprehensive CS degree with focus on software engineering, algorithms, data structures, and modern web technologies.",
    tags: ["Full-time", "On-site"],
    logo: "/aot.png",
    logoFallback: "AOT",
  },
  {
    id: "edu-2",
    title: "Diploma in Computer Science & Technology",
    subtitle: "Technique Polytechnic Institute",
    location: "Hooghly, West Bengal, India",
    duration: "2023 – 2025",
    status: "completed" as const,
    description:
      "Completed 10+2 with Physics, Chemistry, and Mathematics. Developed an early interest in programming and systematic problem-solving.",

    tags: ["Graduated", "Merit"],
    logo: "/tpi.png",
    logoFallback: "TPI",
  },
  {
    id: "edu-3",
    title: "Higher Secondary Education",
    subtitle: "Bagati Ram Gopal School",
    location: "Mogra, Hooghly, India",
    duration: "2021 – 2022",
    status: "completed" as const,
    description:
      "Completed secondary education with a focus on science and mathematics, laying the groundwork for future technical studies.",

    tags: ["Graduated", "Distinction"],
    logo: "/college/st-augustine-logo.png",
    logoFallback: "SADS",
  },
];

const experience = [
  {
    id: "exp-1",
    title: "InnovateX Engineers Community",
    subtitle: "Convenor",
    location: "Kolkata, India",
    duration: "2025 – Present",
    status: "ongoing" as const,
    description:
      "Leading a college tech community focused on open-source, hackathons, and developer education. Organising workshops and mentoring junior developers.",

    tags: ["Leadership", "Community Building"],
    logo: "/innovatex.png",
    logoFallback: "INX",
  },
  {
    id: "exp-2",
    title: "Technical Associate",
    subtitle: "IEI Student Chapter CSE, AOT",
    location: "AOT",
    duration: "2025 – Present",
    status: "ongoing" as const,
    description:
      "Serving as Technical Associate for the Institution of Engineers (India) Student Chapter, managing technical operations and supporting student-led initiatives.",

    tags: ["Full Stack", "Developer"],
    logo: "/sccse.png",
    logoFallback: "< />",
  },
  {
    id: "exp-3",
    title: "ISRO AI/ML Certified Trainee",
    subtitle: "AI/ML for Geodata Analysis",
    location: "Remote",
    duration: "2025",
    status: "completed" as const,
    description:
      "Contributing to open-source repositories, raising pull requests, and collaborating with global developers on meaningful projects.",

    tags: ["AI/ML", "ISRO", "Geodata"],
    logo: "/isro.png",
    logoFallback: "GH",
  },

  {
    id: "exp-4",
    title: "Google Cloud Arcade Facilitator 2023, 2024, 2025",
    subtitle: "Google Cloud",
    location: "Remote",
    duration: "2025",
    status: "completed" as const,
    description:
      " Google Cloud Skills Boost and Qwiklabs —hands-on learning environments that let you experiment with real cloud tools and technologies. ",

    tags: ["Google Cloud", "Facilitator"],
    logo: "/gc.png",
    logoFallback: "GH",
  },

  {
    id: "exp-5",
    title: "Mentor, Open-Source Contributor",
    subtitle: "10x Hackathon / 5x Hackathon Mentor. @SSOC, @GSSOC @Apertre3.0",
    location: "Remote",
    duration: "2023 – Present",
    status: "ongoing" as const,
    description:
      "Contributing to open-source repositories, raising pull requests, and collaborating with global developers on meaningful projects.",

    tags: ["Open Source", "Mentorship"],
    logo: "/company/github-logo.png",
    logoFallback: "GH",
  },

];

type Tab = "education" | "experience";

// Animation variants matching home page
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// ─── Main Section ────────────────────────────────────────────────────────────

const Journey = () => {
  const [activeTab, setActiveTab] = useState<Tab>("education");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const tabs: { id: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { id: "education", label: "Education", icon: GraduationCap, count: education.length },
    { id: "experience", label: "Experience", icon: Briefcase, count: experience.length },
  ];

  const items = activeTab === "education" ? education : experience;

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Reset scroll position when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [activeTab]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth >= 1024 ? 500 : 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <SectionHeading id="journey" text="Journey">
      {/* Console-style grid background matching home page */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(#F6EAC5 1px, transparent 1px),
              linear-gradient(90deg, #F6EAC5 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      <div className="relative py-12 md:px-12 md:py-16">
        {/* Section title - restored original style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 px-4 md:px-0"
        >
          <h2 className="font-incognito text-2xl font-semibold md:text-4xl lg:text-5xl">
            My Journey So Far
          </h2>
          <HeadingLine className="mt-4" lineWidth={50} />
          <p className="text-muted-foreground mt-4 max-w-xl text-sm md:text-base">
            A record of where I&apos;ve studied and worked — building skills,
            shipping products, and growing as a developer.
          </p>
        </motion.div>

        {/* Tab switcher - console style */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-8 flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-0"
        >
          <div className="inline-flex border border-border/50 bg-card/30 backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-medium transition-all duration-200",
                    "hover:bg-foreground/5",
                    isActive && "bg-foreground text-background hover:bg-foreground",
                    !isActive && "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {tab.label}
                  <span
                    className={cn(
                      "ml-1 rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold",
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-foreground/10 text-foreground/60",
                    )}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Console-style navigation buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="group flex items-center gap-2 border border-border/50 bg-card/30 px-4 py-2 font-mono text-sm backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-foreground/5 active:scale-95"
            >
              <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">PREV</span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="group flex items-center gap-2 border border-border/50 bg-card/30 px-4 py-2 font-mono text-sm backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-foreground/5 active:scale-95"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <AnimatePresence>
          {showScrollHint && items.length > 2 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 flex justify-center px-4 md:px-0"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3 py-1.5 font-mono text-[10px] backdrop-blur-sm">
                <span className="animate-pulse">→</span>
                Scroll to explore more
                <span className="animate-pulse">←</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-[7.5vw] pb-8 no-scrollbar scroll-smooth md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <AnimatePresence mode="wait">
            {items.map((item) => (
              <motion.div
                key={`${activeTab}-${item.id}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="relative min-w-[85vw] max-w-[85vw] shrink-0 snap-center md:min-w-[55vw] md:max-w-[55vw] lg:min-w-[40vw] lg:max-w-[40vw]"
                onHoverStart={() => setHoveredCard(item.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Card with console aesthetic */}
                <div
                  className={cn(
                    "group relative h-full overflow-hidden border bg-card/50 backdrop-blur-sm transition-all duration-300",
                    "border-border/50 hover:border-foreground/30",
                    "shadow-lg hover:shadow-xl",
                  )}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
                      hoveredCard === item.id && "opacity-100",
                    )}
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(246,234,197,0.1), transparent 70%)",
                    }}
                  />

                  {/* Top bar with console decorations */}
                  <div className="border-b border-border/50 bg-black/5 px-4 py-2 dark:bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="size-3 text-muted-foreground" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {activeTab === "education" ? "academic_record" : "work_log"}
                          .{item.status === "ongoing" ? "active" : "archived"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="size-1.5 rounded-full bg-green-500/60" />
                        <div className="size-1.5 rounded-full bg-yellow-500/60" />
                        <div className="size-1.5 rounded-full bg-red-500/60" />
                      </div>
                    </div>
                  </div>

                  {/* Content with logo */}
                  <div className="flex">
                    {/* Logo Section - Left side */}
                    <div className="border-r border-border/50 shrink-0 hidden sm:flex p-6 md:p-8 items-center justify-center">
                      <div className="flex size-16 md:size-20 items-center justify-center rounded-lg border border-border/50 bg-gradient-to-br from-background to-card shadow-md">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={`${item.subtitle} logo`}
                            className="size-12 md:size-16 object-contain p-1"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              if (e.currentTarget.nextSibling) {
                                (e.currentTarget.nextSibling as HTMLElement).style.display = "flex";
                              }
                            }}
                          />
                        ) : null}
                        <div
                          className={`items-center justify-center size-full font-mono text-lg font-bold text-foreground/40 ${item.logo ? "hidden" : "flex"
                            }`}
                        >
                          {item.logoFallback}
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Right side */}
                    <div className="flex flex-col gap-4 justify-between w-full p-6 md:p-8">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-mono text-xl font-bold leading-tight tracking-tight md:text-2xl">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground mt-1 font-mono text-sm">
                              {item.subtitle}
                            </p>
                          </div>

                          {/* Status indicator */}
                          <div
                            className={cn(
                              "flex items-center gap-1.5 rounded border px-2 py-1",
                              item.status === "ongoing"
                                ? "border-green-500/50 bg-green-500/10"
                                : "border-border/50 bg-card/30",
                            )}
                          >
                            <span
                              className={cn("size-1.5 rounded-full", {
                                "animate-pulse bg-green-500": item.status === "ongoing",
                                "bg-muted-foreground": item.status === "completed",
                              })}
                            />
                            <span className="font-mono text-[10px] uppercase">
                              {item.status === "ongoing" ? "Active" : "Completed"}
                            </span>
                          </div>
                        </div>

                        {/* Meta info */}
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border/30 pt-3">
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                            <CalendarDays className="size-3" />
                            {item.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                            <MapPin className="size-3" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      {"tags" in item && (
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-border/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      {/* <div className="space-y-2">
                        {item.highlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 font-mono text-xs"
                          >
                            <span className="text-muted-foreground/50 mt-0.5 shrink-0">
                              {`${String(i + 1).padStart(2, "0")}.`}
                            </span>
                            <span className="text-muted-foreground/80 leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SectionHeading>
  );
};

export default Journey;