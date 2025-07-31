"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  CalendarDays,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GoogleIntegrations() {
  const { data: calendarData, isLoading: loadingCalendar } = useSWR(
    "/api/calendar/check",
    fetcher
  );
  const { data: gmailData, isLoading: loadingGmail } = useSWR(
    "/api/gmail/check",
    fetcher
  );

  return (
    <div className="w-full max-w-md p-4 sm:p-6 mx-auto">
      <Card className="bg-zinc-900 text-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🔗 Google Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Calendar */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-medium">
                <CalendarDays className="w-5 h-5 text-blue-400" />
                Google Calendar
              </div>
              {loadingCalendar ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              ) : calendarData?.connected ? (
                <div className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Connected</span>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() =>
                    (window.location.href = "/api/auth/google/calendar")
                  }
                >
                  Connect
                </Button>
              )}
            </div>
            {!calendarData?.connected && !loadingCalendar && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                Not connected
              </p>
            )}
          </div>

          {/* Gmail */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-medium">
                <Mail className="w-5 h-5 text-pink-400" />
                Gmail
              </div>
              {loadingGmail ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              ) : gmailData?.connected ? (
                <div className="flex items-center gap-1 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Connected</span>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() =>
                    (window.location.href = "/api/auth/google/gmail")
                  }
                >
                  Connect
                </Button>
              )}
            </div>
            {!gmailData?.connected && !loadingGmail && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                Not connected
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
