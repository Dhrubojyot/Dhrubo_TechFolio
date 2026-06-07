"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/terminal";

import { Button } from "@/components/ui/button";

import { Send, X } from "lucide-react";

import SectionHeading from "@/components/section-heading";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [step, setStep] = useState<number>(0);

  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const canSend =
    email.trim().length > 3 &&
    message.trim().length > 4;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSend) return;

    try {
      setStatus("sending");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: name,
          from_email: email,
          message: message,
          reply_to: email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus("sent");
      setEmail("");
      setName("");
      setMessage("");
      setStep(0);

    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const onReset = () => {
    setStep(0);
    setEmail("");
    setName("");
    setMessage("");
    setStatus("idle");
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (step < 2) {
        setStep((prev) => prev + 1);
      }
    }
  };

  return (
    <SectionHeading
      id="contact"
      text="Contact"
      className="px-4 py-12 md:px-8 md:py-16"
    >
      <div className="absolute inset-0 size-full">
        <div className="before:bg-border after:bg-border relative h-full w-full before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <form onSubmit={onSubmit} className="w-full">
          <Terminal className="max-h-none w-full max-w-none">

            {/* EMAIL */}
            {step >= 0 && (
              <>
                <div className="text-foreground/90 flex items-start gap-2 font-mono">
                  <span className="text-emerald-400">$</span>

                  <TypingAnimation
                    startOnView
                    duration={26}
                  >
                    Could you share your email with me?
                  </TypingAnimation>
                </div>

                <AnimatedSpan className="grid gap-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-emerald-400">
                      ↪
                    </span>

                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      onKeyDown={handleEnter}
                      disabled={
                        status === "sending"
                      }
                      autoComplete="email"
                      className="border-foreground/20 text-foreground placeholder:text-foreground/40 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                    />
                  </div>
                </AnimatedSpan>
              </>
            )}

            {/* NAME */}
            {step >= 1 && (
              <>
                <div className="text-foreground/90 flex items-start gap-2 font-mono">
                  <span className="text-sky-400">$</span>

                  <TypingAnimation duration={26}>
                    Great! And may I know your name?
                  </TypingAnimation>
                </div>

                <AnimatedSpan className="grid gap-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-sky-400">
                      ↪
                    </span>

                    <input
                      type="text"
                      placeholder="Siddharth"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      onKeyDown={handleEnter}
                      autoComplete="name"
                      className="border-foreground/20 text-foreground placeholder:text-foreground/40 w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/30"
                    />
                  </div>
                </AnimatedSpan>
              </>
            )}

            {/* MESSAGE */}
            {step >= 2 && (
              <>
                <div className="text-foreground/90 flex items-start gap-2 font-mono">
                  <span className="text-amber-400">$</span>

                  <TypingAnimation duration={26}>
                    Awesome, now tell us how we can assist you today.
                  </TypingAnimation>
                </div>

                <AnimatedSpan className="grid gap-2">
                  <div className="flex items-start gap-2 font-mono">
                    <span className="mt-2 text-amber-400">
                      ↪
                    </span>

                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project, timeline, and goals…"
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      className="border-foreground/20 text-foreground placeholder:text-foreground/40 w-full resize-y rounded-md border bg-transparent px-3 py-2 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/30"
                    />
                  </div>
                </AnimatedSpan>

                <AnimatedSpan className="mt-2">
                  <div className="border-foreground/20 border-t border-dashed pt-4">
                    <div className="flex items-center justify-end gap-2">

                      <Button
                        type="button"
                        variant="outline"
                        onClick={onReset}
                        className="border-foreground/20 bg-foreground/5 hover:bg-foreground/10 font-mono text-xs"
                      >
                        <X className="mr-1 h-3.5 w-3.5" />
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={
                          status === "sending"
                        }
                        className="border-foreground/20 bg-primary/10 text-foreground hover:bg-primary/20 border-2 font-mono text-xs disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Send className="mr-1 h-3.5 w-3.5" />

                        {status === "sending"
                          ? "Sending..."
                          : status === "sent"
                            ? "Sent!"
                            : "Send"}
                      </Button>
                    </div>
                  </div>
                </AnimatedSpan>
              </>
            )}

            {/* SUCCESS */}
            {status === "sent" && (
              <AnimatedSpan className="font-mono text-emerald-400/90">
                ✓ Message sent successfully.
              </AnimatedSpan>
            )}

            {/* ERROR */}
            {status === "error" && (
              <AnimatedSpan className="font-mono text-red-400/90">
                ⚠ Something went wrong. Please try again.
              </AnimatedSpan>
            )}
          </Terminal>
        </form>
      </div>
    </SectionHeading>
  );
}