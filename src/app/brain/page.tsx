'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { User, Brain, Activity, Settings, Calendar, BookOpen, CheckSquare, ListTodo, Clock, Smile, Frown } from 'lucide-react';

// Type definitions
interface UserBrain {
  id: string;
  userId: string;
  likes: string[];
  dislikes: string[];
  writingStyle?: string;
  timezone?: string;
  dailyActiveHours?: {
    start: string;
    end: string;
  };
  preferredTools: string[];
  shortTermGoals?: Array<{
    goal: string;
    timeframe: string;
  }>;
  longTermGoals?: Array<{
    goal: string;
    timeframe: string;
  }>;
  currentProjects?: Array<{
    name: string;
    status: string;
    due: string;
  }>;
  projectBacklog?: Array<{
    name: string;
    priority: string;
  }>;
  workloadStatus?: string;
  knownTopics: string[];
  interestedTopics: string[];
  currentLearning?: Array<{
    topic: string;
    progress: string;
  }>;
  checkInPreferences?: {
    frequency: string;
    preferredTime: string;
  };
  customTriggers?: Array<{
    trigger: string;
    action: string;
  }>;
  recentRoutines?: Array<{
    name: string;
    lastCompleted: string;
  }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Main component
export default function BrainPage() {
  const { data: brain, error, isLoading } = useSWR<UserBrain>('/api/brain', fetcher);
  const [activeTab, setActiveTab] = useState<string>('overview');

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error loading brain data</h2>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!brain) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No brain data found</h2>
          <p className="mt-2 text-gray-600">We're still learning about you</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Brain size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Settings size={18} /> },
    { id: 'goals', label: 'Goals & Projects', icon: <CheckSquare size={18} /> },
    { id: 'knowledge', label: 'Knowledge', icon: <BookOpen size={18} /> },
    { id: 'routines', label: 'Routines', icon: <Activity size={18} /> },
    { id: 'notes', label: 'Notes', icon: <ListTodo size={18} /> },
  ];

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
        {/* Tabs */}
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
                  ${activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>
        
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'overview' && <OverviewTab brain={brain} />}
          {activeTab === 'preferences' && <PreferencesTab brain={brain} />}
          {activeTab === 'goals' && <GoalsProjectsTab brain={brain} />}
          {activeTab === 'knowledge' && <KnowledgeTab brain={brain} />}
          {activeTab === 'routines' && <RoutinesTab brain={brain} />}
          {activeTab === 'notes' && <NotesTab brain={brain} />}
        </div>
      </div>
    </motion.div>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <h2 className="text-xl font-medium">Loading your brain data...</h2>
      </div>
    </div>
  );
}

// Tab Components
function OverviewTab({ brain }: { brain: UserBrain }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="col-span-1 md:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <User size={20} className="text-primary" />
          Brain Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Writing Style</h3>
            <p className="text-lg">{brain.writingStyle || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Timezone</h3>
            <p className="text-lg">{brain.timezone || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Workload Status</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${brain.workloadStatus === 'High' ? 'bg-red-100 text-red-800' : 
                brain.workloadStatus === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'}`}>
              {brain.workloadStatus || "Not specified"}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Hours</h3>
            <p className="text-lg">
              {brain.dailyActiveHours 
                ? `${brain.dailyActiveHours.start} - ${brain.dailyActiveHours.end}` 
                : "Not specified"}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Smile size={20} className="text-green-500" />
          Likes
        </h2>
        {brain.likes.length > 0 ? (
          <ul className="space-y-2">
            {brain.likes.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No preferences recorded yet</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Frown size={20} className="text-red-500" />
          Dislikes
        </h2>
        {brain.dislikes.length > 0 ? (
          <ul className="space-y-2">
            {brain.dislikes.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No dislikes recorded yet</p>
        )}
      </motion.div>
    </>
  );
}

function PreferencesTab({ brain }: { brain: UserBrain }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Settings size={20} className="text-primary" />
          Preferred Tools
        </h2>
        <div className="flex flex-wrap gap-2">
          {brain.preferredTools.length > 0 ? (
            brain.preferredTools.map((tool, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {tool}
              </span>
            ))
          ) : (
            <p className="text-muted-foreground">No preferred tools recorded yet</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Clock size={20} className="text-primary" />
          Daily Active Hours
        </h2>
        {brain.dailyActiveHours ? (
          <div className="relative pt-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ 
                  width: '60%', 
                  marginLeft: '20%' 
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>12 AM</span>
            </div>
            <div className="mt-4">
              <p className="text-center font-medium">
                Active from {brain.dailyActiveHours.start} to {brain.dailyActiveHours.end}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No active hours recorded yet</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-primary" />
          Check-in Preferences
        </h2>
        {brain.checkInPreferences ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Frequency</h3>
              <p className="text-lg">{brain.checkInPreferences.frequency}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Preferred Time</h3>
              <p className="text-lg">{brain.checkInPreferences.preferredTime}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No check-in preferences recorded yet</p>
        )}
      </motion.div>
    </>
  );
}

function GoalsProjectsTab({ brain }: { brain: UserBrain }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <CheckSquare size={20} className="text-primary" />
          Short-term Goals
        </h2>
        {brain.shortTermGoals && brain.shortTermGoals.length > 0 ? (
          <ul className="space-y-4">
            {brain.shortTermGoals.map((goal, index) => (
              <li key={index} className="bg-muted bg-opacity-50 p-3 rounded-lg">
                <p className="font-medium">{goal.goal}</p>
                <p className="text-sm text-muted-foreground mt-1">Timeframe: {goal.timeframe}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No short-term goals recorded yet</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <CheckSquare size={20} className="text-primary" />
          Long-term Goals
        </h2>
        {brain.longTermGoals && brain.longTermGoals.length > 0 ? (
          <ul className="space-y-4">
            {brain.longTermGoals.map((goal, index) => (
              <li key={index} className="bg-muted bg-opacity-50 p-3 rounded-lg">
                <p className="font-medium">{goal.goal}</p>
                <p className="text-sm text-muted-foreground mt-1">Timeframe: {goal.timeframe}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No long-term goals recorded yet</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-1 md:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Activity size={20} className="text-primary" />
          Current Projects
        </h2>
        {brain.currentProjects && brain.currentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brain.currentProjects.map((project, index) => (
              <div key={index} className="bg-muted bg-opacity-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg">{project.name}</h3>
                <div className="mt-2 flex justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-muted-foreground">Due: {project.due}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No current projects recorded yet</p>
        )}
      </motion.div>
    </>
  );
}

function KnowledgeTab({ brain }: { brain: UserBrain }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-primary" />
          Known Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {brain.knownTopics.length > 0 ? (
            brain.knownTopics.map((topic, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {topic}
              </span>
            ))
          ) : (
            <p className="text-muted-foreground">No known topics recorded yet</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-primary" />
          Interested Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {brain.interestedTopics.length > 0 ? (
            brain.interestedTopics.map((topic, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {topic}
              </span>
            ))
          ) : (
            <p className="text-muted-foreground">No interested topics recorded yet</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-primary" />
          Currently Learning
        </h2>
        {brain.currentLearning && brain.currentLearning.length > 0 ? (
          <ul className="space-y-4">
            {brain.currentLearning.map((item, index) => (
              <li key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.topic}</span>
                  <span className="text-sm text-muted-foreground">{item.progress}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2" 
                    style={{ width: item.progress }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No learning progress recorded yet</p>
        )}
      </motion.div>
    </>
  );
}

function RoutinesTab({ brain }: { brain: UserBrain }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="col-span-1 md:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Activity size={20} className="text-primary" />
          Recent Routines
        </h2>
        {brain.recentRoutines && brain.recentRoutines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brain.recentRoutines.map((routine, index) => (
              <div key={index} className="bg-muted bg-opacity-50 p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium">{routine.name}</span>
                <span className="text-sm text-muted-foreground">Last: {routine.lastCompleted}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No recent routines recorded yet</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Activity size={20} className="text-primary" />
          Custom Triggers
        </h2>
        {brain.customTriggers && brain.customTriggers.length > 0 ? (
          <ul className="space-y-3">
            {brain.customTriggers.map((trigger, index) => (
              <li key={index} className="bg-muted bg-opacity-50 p-3 rounded-lg">
                <p className="font-medium">"{trigger.trigger}"</p>
                <p className="text-sm text-muted-foreground mt-1">Action: {trigger.action}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No custom triggers recorded yet</p>
        )}
      </motion.div>
    </>
  );
}

function NotesTab({ brain }: { brain: UserBrain }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="col-span-1 md:col-span-3 bg-card rounded-xl border border-border p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <ListTodo size={20} className="text-primary" />
        Personal Notes
      </h2>
      {brain.notes ? (
        <div className="prose max-w-none">
          <p>{brain.notes}</p>
        </div>
      ) : (
        <div className="bg-muted bg-opacity-50 p-6 rounded-lg text-center">
          <p className="text-muted-foreground">No personal notes recorded yet</p>
          <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Add your first note
          </button>
        </div>
      )}
    </motion.div>
  );
}