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
import { JSX } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function IntegrationRow({
  icon,
  label,
  isLoading,
  isConnected,
  connectUrl,
}: {
  icon: JSX.Element;
  label: string;
  isLoading: boolean;
  isConnected: boolean;
  connectUrl: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-base font-medium text-foreground">
          {icon}
          {label}
        </div>

        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        ) : isConnected ? (
          <div className="flex items-center gap-1 text-green-500">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm">Connected</span>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => (window.location.href = connectUrl)}
          >
            Connect
          </Button>
        )}
      </div>

      {!isConnected && !isLoading && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <XCircle className="w-4 h-4" />
          Not connected
        </p>
      )}
    </div>
  );
}

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
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🔗 Google Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <IntegrationRow
            icon={<CalendarDays className="w-5 h-5 text-primary" />}
            label="Google Calendar"
            isLoading={loadingCalendar}
            isConnected={calendarData?.connected}
            connectUrl="/api/auth/google/calendar"
          />

          <IntegrationRow
            icon={<Mail className="w-5 h-5 text-secondary" />}
            label="Gmail"
            isLoading={loadingGmail}
            isConnected={gmailData?.connected}
            connectUrl="/api/auth/google/gmail"
          />
        </CardContent>
      </Card>
    </div>
  );
}
