"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import CallToAction from "@/components/sections/CallToAction";
import HowItWorks from "@/components/sections/HowItWorks";
import TryItYourself from "@/components/sections/TryItYourself";
import ValueProps from "@/components/sections/ValueProps";
import WaitlistSection from "@/components/sections/Waitlist";
import { Footer } from "@/components/sections/Footer";
import { Features } from "@/components/sections/Features";

const Index = () => {
  return (
  <>
    <Navbar />
    <Hero />
    <ValueProps />
    <HowItWorks />
    <Features />
    <TryItYourself />
    <WaitlistSection />
    <CallToAction />
    <Footer />
  </>
  );
};

export default Index;
