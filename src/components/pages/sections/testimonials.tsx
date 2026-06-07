"use client";

// ? Just Dummy testimonial

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import SectionHeading from "@/components/section-heading";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "He's a very good developer — during Chakravyuh, he handled the frontend and delivered an excellent website from header to footer. His work was praised by everyone in the community.",
    by: "Srayash Raj, SCCSE AOT Tech Member",
    imgSrc: "https://i.pinimg.com/736x/d0/7c/49/d07c49daf805a6ac87f0eea9219b0aa0.jpg",
  },
  {
    tempId: 1,
    testimonial:
      "Dhrubojyoti is the kind of person who quietly puts in the work and delivers. Super reliable, always learning, and someone you can genuinely count on !",
    by: "Parthib Biswas, SCCSE AOT Tech Co-Lead",
    imgSrc: "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779814517/pb_vpcib0.png",
  },
  {
    tempId: 2,
    testimonial:
      "Dhrubo has been my junior since our diploma days, and now we’re continuing together in B.Tech. He is a motivational and inspiring person, as well as a skilled and dedicated developer.",
    by: "SK Mirajul Islam, SCCSE AOT Tech Member",
    imgSrc: "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779815385/mj_gdtnzc.png",
  },
  {
    tempId: 3,
    testimonial:
      "Dhrubojyoti is a cool and a leader whose dedication and vision played a key role in the success of “Hack Technique.” His ability to lead calmly and build cool initiatives leaves a lasting impression.",
    by: "Rumsha waqia wania, ATE @EY GDS",
    imgSrc: "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779814517/rwq_k0amf9.png",
  },
  {
    tempId: 4,
    testimonial: "I met Dhrubojyoti at multiple hackathons where we mentored participants together. His technical expertise and ability to guide teams and build impactful solutions truly stand out.",
    by: "Aditya Singh, ",
    imgSrc: "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779814516/ads_xtyocn.jpg",
  },
  {
    tempId: 5,
    testimonial:
      "I met Dhrubojyoti Chakraborty at AOT, where we both pursue B.Tech. He is a hardworking, tech-passionate, and talented person who loves learning and inspires others with his dedication and vision.",
    by: "Satavisa Kesh, SCCSE AOT PR Member",
    imgSrc: "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779815113/photo_6102566779050725009_y_b7xpci.jpg",
  },
  {
    tempId: 6,
    testimonial:
      "Worked with Dhurbo across multiple hackathons as a fellow mentor. His practical guidance and supportive nature always stood out. He genuinely helps teams improve and structure their ideas effectively.",
    by: "Jyotirmoy Roy, SDE @RezolveAi",
    imgSrc: "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779814517/jr_ffak5p.png",
  },
  {
    tempId: 7,
    testimonial:
      "I’ve known Dhrubojyoti for the past few months through the SC CSE Tech team. He is talented, responsible, and consistently delivers quality work with a calm and professional approach.",
    by: "Subhajit Roy, SCCSE AOT Tech Lead",
    imgSrc: "https://res.cloudinary.com/ddnyojaw1/image/upload/v1779815113/Traditional_fits_me_better_ig_%EF%B8%8FTeachers_Day_2024_at_AOTThank_you__.itzz_ankush.__vai_for_th_n4xumq.webp",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute top-1/2 left-1/2 cursor-pointer border-2 p-4 sm:p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "bg-primary text-primary-foreground border-primary z-10"
          : "bg-card text-card-foreground border-border hover:border-primary/50 z-0",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="bg-border absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(",")[0]}`}
        className="bg-muted mb-3 sm:mb-4 h-12 w-10 sm:h-14 sm:w-12 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3
        className={cn(
          "text-sm sm:text-base md:text-xl font-medium overflow-y-auto max-h-[60%] sm:max-h-none",
          isCenter ? "text-primary-foreground" : "text-foreground",
        )}
      >
        &quot;{testimonial.testimonial}&quot;
      </h3>
      <p
        className={cn(
          "absolute right-4 sm:right-8 bottom-4 sm:bottom-8 left-4 sm:left-8 mt-2 text-xs sm:text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setCardSize(280); // Mobile
      } else if (width < 768) {
        setCardSize(320); // Tablet
      } else {
        setCardSize(365); // Desktop
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <SectionHeading
      text="Testimonials"
      id="testimonials"
      className="h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[size:18px_18px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]" />
      </div>

      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center text-xl sm:text-2xl transition-colors",
            "bg-background border-border hover:bg-primary hover:text-primary-foreground border-2",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center text-xl sm:text-2xl transition-colors",
            "bg-background border-border hover:bg-primary hover:text-primary-foreground border-2",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </SectionHeading>
  );
};