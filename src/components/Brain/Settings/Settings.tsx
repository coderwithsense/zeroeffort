"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CalendarCheck, CalendarX } from "lucide-react";

export default function CalendarSettings() {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar/check")
      .then((res) => res.json())
      .then((data) => {
        setConnected(data.connected);
      })
      .catch((err) => {
        console.error("Failed to check calendar connection:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleConnect = () => {
    window.location.href = "/api/auth/google/calendar";
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold mb-4">Google Calendar</h1>

      {loading ? (
        <div className="flex items-center space-x-2 text-gray-500">
          <Loader2 className="animate-spin w-5 h-5" />
          <span>Checking connection...</span>
        </div>
      ) : connected ? (
        <div className="flex items-center gap-3 text-green-600 font-medium">
          <CalendarCheck className="w-5 h-5" />
          <span>Google Calendar is connected</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-red-500 font-medium">
            <CalendarX className="w-5 h-5" />
            <span>Google Calendar not connected</span>
          </div>
          <Button onClick={handleConnect}>Connect Google Calendar</Button>
          <p className="text-sm text-gray-500">
            Connecting your calendar lets you create and manage events
            seamlessly.
          </p>
        </div>
      )}
    </div>
  );
}
