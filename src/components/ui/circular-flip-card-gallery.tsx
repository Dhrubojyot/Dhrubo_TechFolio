"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// --- Card Data ---
const cardData = [
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207632/IMG20251109153610_hss8wp.jpg",
    title: "Speaker at IIT Bombay’s Techfest",
  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207634/1741537656874_wzitfg.jpg",
    title: "Attended KubeKulture organized by CNCF Hooghly",

  },

  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207635/1734959745614_sxo95v.jpg",
    title: "Attended DevFest Kolkata 2024 organized by GDG Kolkata.",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207636/1716659413054_qcnbg9.jpg",
    title: "Top 2 place at the GCCD Extended Event Kolkata × AOT",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207634/1735200062328_fcmqbn.jpg",
    title: "Volunteered at Cloud @DevFest 2024 by GDG Cloud Kolkata",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779812579/React_Kolkata_Meet-up_26_1_zworof.png",
    title: "Top Community Partner at React Kolkata Meet-up 2026",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207631/kube3_ah4zry.jpg",
    title: "Attended KubeKulture organized by CNCF Hooghly",

  },

  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207633/1741537647574_txzymf.jpg",
    title: "Attended KubeKulture organized by CNCF Hooghly",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779207008/DSC_6574_ycmulf.jpg",
    title: "Volunteered at Chakravyuh as a Tech Associate of SCCSE AOT",
  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779208705/1772467537297_lnumxw.jpg",
    title: "Mentor at Techphoria 2.0, a State-Level Coding Competition at TPI",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779208912/1768193261582_rvurdb.jpg",
    title: "Lead Organizer & Judge of Hack Technique 2026",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779208910/1762187246319_ukclow.jpg",
    title: "Mentor at HackSpire’25 by FIEM ACM Student Chapter",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779812579/React_Kolkata_Meet-up_26_2_yyudjr.png",
    title: "Top Community Partner at React Kolkata Meet-up 2026",

  },
  {
    image:
      "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779208910/1762187247514_za0vuz.jpg",
    title: "Mentors at HackSpire’25 by FIEM ACM Student Chapter",

  },
];

// --- FlipCard Component ---
interface FlipCardProps {
  image: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

function FlipCard({ image, title, className, style }: FlipCardProps) {
  return (
    <div
      className={cn(
        "group w-24 h-32 md:w-28 md:h-36 rounded-xl [perspective:1000px] transition-transform duration-300 ease-in-out hover:scale-110",
        className,
      )}
      style={style}
    >
      <div className="relative w-full h-full rounded-xl shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front side - Image */}
        <div className="absolute inset-0 rounded-xl [backface-visibility:hidden]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl border-2 border-border"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/400x600/0a0a0a/333333?text=Image";
            }}
          />
        </div>
        {/* Back side - Title and Description */}
        <div className="absolute inset-0 rounded-xl bg-background border-2 border-border flex flex-col items-center justify-center p-3 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h3 className="font-bold text-xs md:text-sm text-foreground mb-1 text-balance">
            {title}
          </h3>

        </div>
      </div>
    </div>
  );
}

// --- Main CircularGallery Component ---
export default function CircularGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [rotation, setRotation] = useState(0);

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) {
        setSize(galleryRef.current.offsetWidth);
      }
    };
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (galleryRef.current) {
      resizeObserver.observe(galleryRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  // Slow animation loop
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setRotation((prev) => prev + 0.003);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const radius = size * 0.38;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div
      ref={galleryRef}
      className="relative w-full max-w-[340px] sm:max-w-[500px] md:max-w-[650px] aspect-square flex items-center justify-center mx-auto"
    >
      {/* Central text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-8">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-3">
          Hover to Explore
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center text-balance leading-tight">
          Moments That{" "}
          <span className="text-[#8cc2ff] italic">Inspire</span>
        </h2>
        <div className="mt-4 h-px w-16 bg-border mx-auto" />
        <p className="mt-3 text-xs text-muted-foreground font-mono tracking-wider">
          GALLERY
        </p>
      </div>

      {/* Circular arrangement of cards */}
      {size > 0 &&
        cardData.map((card, index) => {
          const angle =
            (index / cardData.length) * 2 * Math.PI - Math.PI / 2 + rotation;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <FlipCard
              key={index}
              {...card}
              className="absolute hover:z-20"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) rotate(${(angle + Math.PI / 2) * (180 / Math.PI)}deg)`,
              }}
            />
          );
        })}
    </div>
  );
}
