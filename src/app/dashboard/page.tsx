"use client";

import React, { useState, useEffect } from 'react';
import { UserButton } from "@clerk/clerk-react";
import { CalendarDays, Clock, Brain, Sparkles, Zap, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Animation for counting up numbers
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 87) {
        setCount(prev => prev + 1);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [count]);
  
  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const features = [
    {
      title: "Smart Task Scheduling",
      description: "AI-powered task organization that adapts to your work patterns and energy levels throughout the day",
      icon: <Clock className="w-8 h-8 text-purple-300" />,
      time: "2 weeks"
    },
    {
      title: "AI Prioritization Engine",
      description: "Automatically identify your most important tasks and optimize your workflow for maximum productivity",
      icon: <Brain className="w-8 h-8 text-blue-300" />,
      time: "3 weeks"
    },
    {
      title: "Calendar Integration",
      description: "Seamlessly sync with your existing calendars and schedule tasks in available time slots",
      icon: <CalendarDays className="w-8 h-8 text-green-300" />,
      time: "1 month"
    }
  ];
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-4 py-4 flex justify-between items-center border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 mr-2 text-purple-400" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">ZeroEffort</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <UserButton />
          </Button>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  The Ultimate Productivity Dashboard
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-md">
                We are building something extraordinary. Join our journey and be the first to experience the future of productivity.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl transition-all hover:shadow-purple-500/10 hover:border-purple-500/30">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-tr from-purple-500 to-blue-500 p-3 rounded-lg mr-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Early Access Program</h3>
                    <p className="text-gray-300">Be among the first to try our features</p>
                  </div>
                </div>
                <div className="bg-purple-500/20 rounded-full px-3 py-1 text-sm font-medium text-purple-300">
                  Limited Spots
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4 flex-1 text-center">
                  <div className="text-3xl font-bold text-purple-300">{count}%</div>
                  <div className="text-xs text-gray-400">Development Progress</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 flex-1 text-center">
                  <div className="text-3xl font-bold text-blue-300">3</div>
                  <div className="text-xs text-gray-400">Weeks Until Launch</div>
                </div>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition-all">
                      Notify Me
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="mt-4 bg-green-500/20 p-4 rounded-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-200">You are on the list! We will notify you when we launch.</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right section - Feature Preview */}
          <div className="bg-gradient-to-br from-black/40 to-purple-900/20 border border-white/10 rounded-2xl p-8 backdrop-blur-lg shadow-xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
            
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
              <span>Upcoming Features</span>
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-500 p-4 rounded-xl ${index === activeFeature ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 scale-105 border border-white/10' : 'hover:bg-white/5'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${index === activeFeature ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/10'}`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-lg">{feature.title}</h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10">
                          {index === activeFeature && (
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Launching in {feature.time}
                            </span>
                          )}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                      {index === activeFeature && (
                        <Button variant="ghost" className="mt-2 text-xs text-purple-300 hover:text-purple-200 p-0 flex items-center">
                          Learn more <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-sm text-gray-400">Feature roadmap is subject to change</span>
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveFeature(i)}
                    className={`w-2 h-2 rounded-full transition-all ${activeFeature === i ? 'bg-purple-400 w-6' : 'bg-white/20'}`}
                    aria-label={`View feature ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-12 border-t border-white/10 backdrop-blur-md bg-black/20 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 ZeroEffort. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Button variant="ghost" className="text-gray-400 hover:text-white">Terms</Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">Privacy</Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;