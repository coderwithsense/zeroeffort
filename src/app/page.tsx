"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Brain,
  CalendarDays,
  Sparkles,
  ChevronRight,
  Check,
  Star,
  Zap,
  MousePointerClick,
  Search,
  ArrowRight,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [playgroundPrompt, setPlaygroundPrompt] = useState("");

  const handleWaitlistSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) {
      toast(
        "You've been added to our waitlist. We'll notify you when we launch!"
      );
      setEmail("");
    }
  };

  const handleGenerate = () => {
    if (playgroundPrompt) {
      toast(
        "We're creating your personalized productivity plan. Check back in a moment!"
      );
      setPlaygroundPrompt("");
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 glassmorphism border-b border-white/20 rounded-b-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="gradient-button p-2 rounded-xl mr-2 shadow-lg">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold hero-gradient-text">
              ZeroEffort
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="hidden sm:block hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#playground"
              className="hidden sm:block hover:text-primary transition-colors"
            >
              Playground
            </a>
            <a
              href="#pricing"
              className="hidden sm:block hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <Button
              variant="outline"
              className="hidden sm:flex hover:border-primary hover:text-primary rounded-xl"
            >
              Sign In
            </Button>
            <Button className="gradient-button rounded-xl shadow-lg">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Orb Background */}
      <section className="glow pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-gradient-text">
            Transform Tasks to
            <br />
            Action in Minutes
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Generate beautiful and actionable productivity plans from a simple
            text description. Stop deciding, start achieving.
          </p>
          <form
            onSubmit={handleWaitlistSignup}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 shadow-lg rounded-xl border-white/30 focus:border-green-500"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 gradient-button rounded-xl shadow-lg"
            >
              Join Waitlist
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div className="mt-4 py-2 px-6 bg-yellow-100 text-yellow-800 rounded-full inline-block shadow-md">
            🚀 Early bird offer: $29 lifetime access for first 100 signups
          </div>
        </div>
      </section>

      {/* Icon Grid Section */}
      <section className="py-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center hover-lift">
              <div className="w-16 h-16 flex items-center justify-center glassmorphism rounded-2xl mb-4 shadow-lg border border-white/30">
                <Zap className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-sm text-slate-600">Smart Planning</p>
            </div>
            <div className="flex flex-col items-center text-center hover-lift">
              <div className="w-16 h-16 flex items-center justify-center glassmorphism rounded-2xl mb-4 shadow-lg border border-white/30">
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-sm text-slate-600">AI-Powered</p>
            </div>
            <div className="flex flex-col items-center text-center hover-lift">
              <div className="w-16 h-16 flex items-center justify-center glassmorphism rounded-2xl mb-4 shadow-lg border border-white/30">
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-sm text-slate-600">Time Saving</p>
            </div>
            <div className="flex flex-col items-center text-center hover-lift">
              <div className="w-16 h-16 flex items-center justify-center glassmorphism rounded-2xl mb-4 shadow-lg border border-white/30">
                <MousePointerClick className="h-8 w-8 text-indigo-500" />
              </div>
              <p className="text-sm text-slate-600">One-Click Setup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section id="playground" className="section-container">
        <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-3xl shadow-lg p-8 md:p-12 border-0 overflow-hidden relative">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>

          <h2 className="text-4xl font-bold text-center mb-4 hero-gradient-text relative z-10">
            Playground
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto relative z-10">
            Try ZeroEffort instantly. Describe your task and let AI create your
            perfect productivity plan.
          </p>

          <div className="max-w-3xl mx-auto bg-transparent rounded-2xl overflow-hidden relative z-10">
            <div className="p-8">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-400/20 to-blue-400/20">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-slate-700 font-medium">
                  Describe your goals or tasks
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                  placeholder="Create a stunning 30-day productivity plan for learning web development"
                  value={playgroundPrompt}
                  onChange={(e) => setPlaygroundPrompt(e.target.value)}
                  className="h-14 rounded-xl border-0 bg-slate-100/70 focus:ring-2 focus:ring-green-500 shadow-inner text-base"
                />
                <Button
                  onClick={handleGenerate}
                  className="h-14 px-8 gradient-button rounded-xl shadow-md whitespace-nowrap font-medium"
                >
                  Generate
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">
                <div className="col-span-3 md:col-span-1 bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 group transition-all duration-300">
                  <div className="h-20 bg-gradient-to-r from-green-100/50 to-green-200/50 rounded-xl mb-3 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-green-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 text-center">
                    Quick daily tasks
                  </p>
                </div>
                <div className="col-span-3 md:col-span-1 bg-gradient-to-br from-white to-slate-50  rounded-2xl p-5  group transition-all duration-300">
                  <div className="h-20 bg-gradient-to-r from-blue-100/50 to-blue-200/50 rounded-xl mb-3 flex items-center justify-center">
                    <CalendarDays className="h-8 w-8 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 text-center">
                    Weekly schedule
                  </p>
                </div>
                <div className="col-span-3 md:col-span-1 bg-gradient-to-br from-white to-slate-50  rounded-2xl p-5  group transition-all duration-300">
                  <div className="h-20 bg-gradient-to-r from-purple-100/50 to-purple-200/50 rounded-xl mb-3 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 text-center">
                    Monthly plan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute top-10 right-12 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
          </div>
          <div className="absolute bottom-10 left-12 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400/30"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400/30"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="section-container relative overflow-hidden py-24"
      >
        {/* Decorative elements */}
        <div className="absolute top-10 right-12 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400/50"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400/50"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
        </div>
        <div className="absolute bottom-16 left-12 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400/30"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400/30"></div>
        </div>

        {/* Large decorative circle */}
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/5"></div>
        <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-gradient-to-tr from-green-500/10 to-blue-500/5"></div>

        <h2 className="text-4xl font-bold text-center mb-4 hero-gradient-text">
          Why Choose ZeroEffort?
        </h2>
        <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
          Our AI productivity coach eliminates decision fatigue and helps you
          achieve more with less effort.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md p-8 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl shadow-lg border border-white/30 group">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl inline-block mb-6 group-hover:rotate-3 transition-transform">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Zero-Effort Management
            </h3>
            <p className="text-secondary">
              Tell us your goal, and we'll create your perfect daily action plan
              with no additional decisions required.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md p-8 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl shadow-lg border border-white/30 group">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl inline-block mb-6 group-hover:rotate-3 transition-transform">
              <Brain className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Adaptive Priority System
            </h3>
            <p className="text-slate-600">
              Smart scheduling that dynamically adjusts to your pace and
              progress to ensure optimal productivity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md p-8 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl shadow-lg border border-white/30 group">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl inline-block mb-6 group-hover:rotate-3 transition-transform">
              <CalendarDays className="h-10 w-10 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Single Command Inputs
            </h3>
            <p className="text-slate-600">
              Simple commands for powerful scheduling and focus time blocking to
              maximize your output.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-container relative py-24">
        {/* Decorative elements */}
        <div className="absolute top-20 left-12 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400/50"></div>
        </div>
        <div className="absolute bottom-20 right-12 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400/30"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400/30"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400/30"></div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 hero-gradient-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
            Choose the plan that suits your productivity needs. No hidden fees.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-md p-10 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl shadow-xl border border-white/30 relative">
              <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl -z-10"></div>
              <div className="text-2xl font-bold mb-4">Free Plan</div>
              <div className="text-5xl font-bold mb-8">
                $0
                <span className="text-lg font-normal text-slate-500">
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span>AI Task Scheduling</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Basic Prioritization</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Daily Reminders</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full hover:border-green-500 hover:text-green-500 rounded-xl border-white/30 py-3 font-medium"
              >
                Get Started
              </Button>
            </div>

            <div className="bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-md p-10 hover:translate-y-[-4px] transition-all duration-300 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 border-2 border-green-500 rounded-2xl"></div>
              <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-green-50/20 to-blue-50/20 rounded-2xl -z-10"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                  Popular
                </div>
              </div>
              <div className="text-2xl font-bold mb-4">Pro Plan</div>
              <div className="text-5xl font-bold mb-8">
                $9.99
                <span className="text-lg font-normal text-slate-500">
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span>AI Feedback & Analysis</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Skill Evaluation</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <span>LinkedIn Auto-Updates</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-50 p-1 rounded-full mr-3">
                    <Star className="h-4 w-4 text-green-500" />
                  </div>
                  <span>Priority Support</span>
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl shadow-lg py-3 font-medium border-0">
                Get Pro Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative overflow-hidden mt-24">
        {/* Background gradients and decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/90 backdrop-blur-md -z-10"></div>
        <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/50"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent"></div>

        {/* Decorative elements */}
        <div className="absolute top-12 right-20 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400/30"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400/30"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400/30"></div>
        </div>
        <div className="absolute bottom-20 left-16 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-400/20"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400/20"></div>
        </div>

        {/* Large decorative shapes */}
        <div className="absolute -right-32 bottom-0 w-64 h-64 rounded-full bg-gradient-to-tl from-blue-100/20 to-transparent"></div>
        <div className="absolute -left-32 top-20 w-64 h-64 rounded-full bg-gradient-to-br from-green-100/20 to-transparent"></div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-16">
            {/* Logo and mission statement */}
            <div className="mb-10 md:mb-0 md:max-w-xs">
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  ZeroEffort
                </span>
              </div>
              <p className="text-slate-600 mb-6">
                Eliminating decision fatigue and helping you achieve more with
                less effort.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-500 hover:text-green-500 transition-colors"
                >
                  <div className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all">
                    <Twitter className="h-5 w-5" />
                  </div>
                </a>
                <a
                  href="#"
                  className="text-slate-500 hover:text-green-500 transition-colors"
                >
                  <div className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all">
                    <Linkedin className="h-5 w-5" />
                  </div>
                </a>
                <a
                  href="#"
                  className="text-slate-500 hover:text-green-500 transition-colors"
                >
                  <div className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all">
                    <Instagram className="h-5 w-5" />
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation sections */}
            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10">
              <div>
                <h3 className="font-semibold mb-5 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Product
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#features"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#playground"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Playground
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-5 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-5 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Support
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Knowledge Base
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-5 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-slate-600 hover:text-green-500 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>

          {/* Newsletter section */}
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="md:flex-1">
                <h4 className="text-lg font-semibold mb-2">Stay up to date</h4>
                <p className="text-slate-600">
                  Get the latest productivity tips and news directly to your
                  inbox.
                </p>
              </div>
              <div className="md:flex-1">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                  <button className="px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-200/70 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; 2025 ZeroEffort. All rights reserved.</p>
            {/* <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-500 hover:text-green-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-green-500 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-green-500 transition-colors"
              >
                Cookies
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
