"use client";

import * as React from "react";
import { useMeasure } from "@uidotdev/usehooks";
import { VariantProps, cva } from "class-variance-authority";
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const processCardVariants = cva("flex border backdrop-blur-lg", {
  variants: {
    variant: {
      indigo:
        "flex border text-slate-50 border-slate-700 backdrop-blur-lg bg-gradient-to-br from-[rgba(15,23,42,0.7)_40%] to-[#3730a3_120%]",
      cyber:
        "flex border-2 border-border bg-card shadow-lg shadow-black/20 group relative overflow-hidden transition-all duration-300",
      light: "shadow",
    },
    size: {
      sm: "min-w-[25%] max-w-[25%]",
      md: "min-w-[50%] max-w-[50%]",
      lg: "min-w-[75%] max-w-[75%]",
      xl: "min-w-full max-w-full",
    },
  },
  defaultVariants: {
    variant: "cyber",
    size: "md",
  },
});

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

interface ProcessCardProps
  extends Omit<HTMLMotionProps<"div">, "children">,
    VariantProps<typeof processCardVariants> {
  itemsLength: number;
  index: number;
  children?: React.ReactNode;
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    );
  }
  return context;
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-[120vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky left-0 top-0 w-full overflow-hidden", className)}
    {...props}
  />
));
ContainerSticky.displayName = "ContainerSticky";

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 md:p-8 flex items-center justify-center", className)} {...props} />
));
ProcessCardTitle.displayName = "ProcessCardTitle";

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-6 p-6 md:p-8", className)}
    {...props}
  />
));
ProcessCardBody.displayName = "ProcessCardBody";

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  children,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext();
  const start = index / itemsLength;
  const end = start + 1 / itemsLength;
  const { innerWidth } = typeof window !== "undefined" ? window : { innerWidth: 1024 };
  const [ref, { width }] = useMeasure();

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth, -((width ?? 0) * index) + 120 * index]
  );
  return (
    <motion.div
      ref={ref}
      style={{
        x: index > 0 ? x : 0,
        ...style,
      }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    >
      {/* Shimmer sweep on hover */}
      <div className="from-foreground/0 via-foreground/5 to-foreground/0 pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r transition-transform duration-700 ease-in-out group-hover:translate-x-[200%]" />

      {/* Decorative lines from original journey component */}
      <div className="pointer-events-none absolute -right-4 -bottom-16 w-full translate-x-1/4 translate-y-1/4 rotate-[-30deg] overflow-hidden">
        <div className="border-border/60 from-border/60 -ml-[4px] h-8 w-full border-t bg-gradient-to-r to-transparent" />
        <div className="border-border/40 from-border/40 -ml-[8px] h-8 w-full border-t bg-gradient-to-r to-transparent" />
        <div className="border-border/20 from-border/20 -ml-[12px] h-8 w-full border-t bg-gradient-to-r to-transparent" />
      </div>

      {/* Corner brackets */}
      <div className="border-foreground/20 absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2" />
      <div className="border-foreground/20 absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2" />
      {children}
    </motion.div>
  );
};
ProcessCard.displayName = "ProcessCard";
