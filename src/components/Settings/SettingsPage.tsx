"use client";

import React, { useState } from "react";
import { User, Trash2, Link, Brain, Shield, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { IntegrationsSection } from "./IntegrationSection";
import { PrivacySection } from "./PrivacySection";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [integrations, setIntegrations] = useState({
    googleCalendar: true,
    gmail: true,
    notion: false,
    slack: false,
    discord: false,
    trello: false,
  });

  const [aiPreferences, setAiPreferences] = useState({
    tone: "friendly",
    summarization: "bullets",
  });

  const toggleIntegration = (key: IntegrationKey) => {
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "personal", name: "Personal", shortName: "Personal", icon: User },
    { id: "integrations", name: "Integrations", shortName: "Apps", icon: Link },
    { id: "privacy", name: "Privacy", shortName: "Privacy", icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoSection
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        );
      case "integrations":
        return (
          <IntegrationsSection
            integrations={integrations}
            toggleIntegration={toggleIntegration}
          />
        );
      case "privacy":
        return <PrivacySection />;
      default:
        return (
          <PersonalInfoSection
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Settings
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your account and preferences
            </p>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="border-b border-border">
            <nav className="-mb-px flex">
              {tabs.map(({ id, name, shortName, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-2 py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors touch-manipulation ${
                    activeTab === id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="hidden sm:inline">{name}</span>
                  <span className="sm:hidden text-center">{shortName}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">{renderContent()}</div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Delete Account
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              Are you sure you want to delete your account? This action cannot
              be undone and all your data will be permanently removed.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted active:bg-muted transition-colors text-sm sm:text-base touch-manipulation"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 active:bg-destructive/80 transition-colors text-sm sm:text-base touch-manipulation">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
