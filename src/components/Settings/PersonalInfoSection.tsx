"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import useSWR from "swr";
import {
  ChevronRight,
  Key,
  Trash2,
  User,
  Loader2,
  CalendarDays,
  Mail,
} from "lucide-react";
import { JSX } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const PersonalInfoSection = ({
  showDeleteModal,
  setShowDeleteModal,
}: {
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
}) => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  const { data: calendarData, isLoading: loadingCalendar } = useSWR(
    "/api/calendar/check",
    fetcher
  );
  const { data: gmailData, isLoading: loadingGmail } = useSWR(
    "/api/gmail/check",
    fetcher
  );

  const IntegrationStatus = ({
    label,
    icon,
    isConnected,
    isLoading,
    connectUrl,
  }: {
    label: string;
    icon: JSX.Element;
    isConnected: boolean;
    isLoading: boolean;
    connectUrl: string;
  }) => (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-muted-foreground/10 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <span className="font-medium text-foreground">{label}</span>
      </div>

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      ) : isConnected ? (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Connected
        </span>
      ) : (
        <button
          onClick={() => (window.location.href = connectUrl)}
          className="text-sm text-primary hover:underline font-medium"
        >
          Connect
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-background rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="User avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
                {user?.firstName?.[0] ?? "U"}
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {user?.fullName ?? "User"}
              </h3>
              <p className="text-muted-foreground">
                {user?.emailAddresses[0]?.emailAddress ?? ""}
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full mt-2">
                Pro Account
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => openUserProfile()}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/70 transition-colors border border-border w-full"
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  Edit Profile
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => openUserProfile()}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/70 transition-colors border border-border w-full"
            >
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  Change Password
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Google Integrations */}
      <div className="bg-background rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-1">
              Connected Accounts
            </h4>
            <p className="text-sm text-muted-foreground">
              Manage your OAuth connections
            </p>
          </div>
          <div className="space-y-3">
            <IntegrationStatus
              label="Google Calendar"
              icon={<CalendarDays className="w-4 h-4 text-blue-500" />}
              isConnected={calendarData?.connected}
              isLoading={loadingCalendar}
              connectUrl="/api/auth/google/calendar"
            />
            <IntegrationStatus
              label="Gmail"
              icon={<Mail className="w-4 h-4 text-pink-500" />}
              isConnected={gmailData?.connected}
              isLoading={loadingGmail}
              connectUrl="/api/auth/google/gmail"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
