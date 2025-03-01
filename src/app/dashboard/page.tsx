"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 21,
    hours: 8,
    minutes: 45,
    seconds: 12,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown.seconds > 0) {
        setCountdown((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (countdown.minutes > 0) {
        setCountdown((prev) => ({
          ...prev,
          minutes: prev.minutes - 1,
          seconds: 59,
        }));
      } else if (countdown.hours > 0) {
        setCountdown((prev) => ({
          ...prev,
          hours: prev.hours - 1,
          minutes: 59,
          seconds: 59,
        }));
      } else if (countdown.days > 0) {
        setCountdown((prev) => ({
          ...prev,
          days: prev.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubmitted(true);
      toast.success("You'll be notified when we launch!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 z-0 opacity-30">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: [100, 50, 100],
            y: [0, 50, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="z-10 text-center px-4 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        {/* <motion.div
          className="mb-8 inline-flex items-center gap-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-5 h-5" />
          </span>
          <span className="text-xl font-bold text-primary">ZeroEffort</span>
        </motion.div> */}

        {/* Headline */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          🚀 Just Build. We will Handle the Rest.
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Say goodbye to decision fatigue. ZeroEffort is the AI-powered
          productivity assistant that schedules, organizes, and prioritizes your
          tasks automatically—so you can focus on execution.
        </motion.p>

        {/* New: What We’re Building Section */}
        <motion.div
          className="text-left max-w-md mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-4">What We’re Building:</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>
                Zero Effort Task Management – Add tasks with a simple command,
                and let AI handle the rest.
              </span>
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>
                Smart Scheduling – AI automatically arranges your day based on
                your priorities and availability.
              </span>
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>
                Brainrot Detox Mode – Optimize focus time by detecting
                distractions.
              </span>
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>
                AI-Powered Skill Updates – Auto-sync achievements & progress to
                LinkedIn & GitHub.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Email form */}
        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button
              type="submit"
              className="bg-primary text-primary-foreground flex items-center gap-2"
            >
              Notify me <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.form>
        ) : (
          <motion.div
            className="text-center p-4 rounded-lg bg-primary/10 text-primary inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>Thanks! We'll notify you when we launch.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      {/* <motion.div
        className="absolute bottom-8 flex gap-6 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a href="#" className="text-sm hover:text-primary transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="#" className="text-sm hover:text-primary transition-colors">
          @zeroeffort
        </a>
        <a href="#" className="text-sm hover:text-primary transition-colors">
          Privacy Policy
        </a>
      </motion.div> */}
    </div>
  );
};

export default ComingSoon;
