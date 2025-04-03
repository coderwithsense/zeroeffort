"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ComingSoon = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg mb-8">We're working hard to launch this feature!</p>
        <div className="flex items-center space-x-2">
          <Input placeholder="Enter your email" className="w-64" />
          <Button variant="default">Notify Me</Button>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon;
