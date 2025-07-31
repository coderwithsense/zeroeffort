"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  User,
  Brain,
  Activity,
  Settings,
  Calendar,
  BookOpen,
  CheckSquare,
  ListTodo,
  Clock,
  Smile,
  Frown,
  Info,
} from "lucide-react";
import { EmptyBrainState, ErrorState, LoadingState } from "./LoadingState";
import {
  OverviewTab,
  GoalsProjectsTab,
  KnowledgeTab,
  NotesTab,
  PreferencesTab,
  RoutinesTab,
} from "./Tabs";
import SettingsPage from "./Settings/Settings";
// import { UserBrain } from "@/types/userBrain";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BrainPage() {
  const {
    data: brain,
    error,
    isLoading,
  } = useSWR<UserBrain>("/api/brain", fetcher);
  const [activeTab, setActiveTab] = useState<string>("overview");

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!brain) return <EmptyBrainState />;

  const tabs = [
    { id: "overview", label: "Overview", icon: <Brain size={18} /> },
    { id: "preferences", label: "Preferences", icon: <Settings size={18} /> },
    { id: "goals", label: "Goals & Projects", icon: <CheckSquare size={18} /> },
    { id: "knowledge", label: "Knowledge", icon: <BookOpen size={18} /> },
    { id: "routines", label: "Routines", icon: <Activity size={18} /> },
    { id: "notes", label: "Notes", icon: <ListTodo size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const GuideBox = ({ commands }: { commands: string[] }) => (
    <div className="col-span-full bg-muted/40 border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
        <Info size={16} /> Guide Commands
      </div>
      <ul className="list-disc list-inside text-sm space-y-1">
        {commands.map((cmd, i) => (
          <li key={i} className="text-muted-foreground">
            <code>{cmd}</code>
          </li>
        ))}
      </ul>
    </div>
  );

  const guideCommands: Record<string, string[]> = {
    overview: [
      "What is my writing style?",
      "What timezone am I in?",
      "What's my workload like lately?",
    ],
    preferences: [
      "Add to brain: I like using Notion and Figma",
      "My preferred tools include VSCode and Midjourney",
      "Set active hours from 10am to 6pm",
    ],
    goals: [
      "Add short term goal: Finish portfolio by July",
      "Add long term goal: Land a remote dev job by 2026",
      "Mark project ShipOrSlip as in progress",
    ],
    knowledge: [
      "Add to brain: I know about LangGraph and vector databases",
      "Add interested topic: self-hosted LLMs",
      "Track learning: learning NumPy at 30%",
    ],
    routines: [
      "Add to brain: I do a 15-minute journaling routine",
      "Trigger: When I say 'stuck', play the focus playlist",
    ],
    notes: [
      "Note to self: Check out Sora video generation this weekend",
      "Add to notes: German flashcards are in Anki",
    ],
    settings: [],
  };

  const renderTab = () => {
    return (
      <>
        {activeTab === "overview" && <OverviewTab brain={brain} />}
        {activeTab === "preferences" && <PreferencesTab brain={brain} />}
        {activeTab === "goals" && <GoalsProjectsTab brain={brain} />}
        {activeTab === "knowledge" && <KnowledgeTab brain={brain} />}
        {activeTab === "routines" && <RoutinesTab brain={brain} />}
        {activeTab === "notes" && <NotesTab brain={brain} />}
        {activeTab === "settings" && <SettingsPage />}

        <GuideBox commands={guideCommands[activeTab]} />
      </>
    );
  };

  return (
    <motion.div
      className="container py-8 mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-8">
        <motion.h1
          className="text-3xl md:text-4xl font-bold"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Your Digital Brain
        </motion.h1>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Personalized information we've learned about you
        </motion.p>
      </header>

      <div className="flex flex-col space-y-8">
        <motion.div
          className="border-b border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <nav className="-mb-px flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mr-8 py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderTab()}
        </div>
      </div>
    </motion.div>
  );
}
