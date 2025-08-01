import {
  Calendar,
  FileText,
  Link,
  Mail,
  MessageSquare,
  Slack,
  Trello,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const IntegrationsSection = ({
  integrations,
  toggleIntegration,
}: {
  integrations: Record<IntegrationKey, boolean>;
  toggleIntegration: (key: IntegrationKey) => void;
}) => {
  const integrationsList = [
    {
      key: "notion" as IntegrationKey,
      name: "Notion",
      icon: FileText,
      description: "Create and link tasks or notes from your workspace.",
    },
    {
      key: "slack" as IntegrationKey,
      name: "Slack",
      icon: Slack,
      description: "Receive real-time updates and notifications in Slack.",
    },
    {
      key: "discord" as IntegrationKey,
      name: "Discord",
      icon: MessageSquare,
      description: "Collaborate with your team via Discord channels.",
    },
    {
      key: "trello" as IntegrationKey,
      name: "Trello",
      icon: Trello,
      description: "Sync project tasks and keep boards up to date.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-background rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Link className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Integrations
              </h3>
              <p className="text-muted-foreground text-sm">
                Connect your favorite tools and services to use with ZeroEffort AI
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationsList.map(({ key, name, icon: Icon, description }) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{name}</div>
                    <div className="text-sm text-muted-foreground">
                      {description}{" "}
                      <span className="ml-1 px-2 py-0.5 text-xs bg-border text-muted-foreground rounded-full">
                        Coming soon
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none opacity-60">
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-muted`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform translate-x-1`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
