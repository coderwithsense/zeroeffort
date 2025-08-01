import {
  ChevronRight,
  Download,
  Eye,
  History,
  RotateCcw,
  Shield,
} from "lucide-react";

export const PrivacySection = () => (
  <div className="space-y-6">
    <div className="bg-background rounded-lg border border-border shadow-sm">
      <div className="p-6">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Data & Privacy
            </h3>
            <p className="text-sm text-muted-foreground">
              Control your data and privacy settings
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: Download,
              title: "Export Data",
              desc: "Download all your data",
              color: "blue",
            },
            {
              icon: RotateCcw,
              title: "Clear Brain Memory",
              desc: "Reset AI personalization",
              color: "orange",
            },
            {
              icon: Eye,
              title: "Permissions Dashboard",
              desc: "Manage data access",
              color: "purple",
            },
            {
              icon: History,
              title: "Session History",
              desc: "View past interactions",
              color: "gray",
            },
          ].map(({ icon: Icon, title, desc, color }) => {
            const colorMap = {
              blue: { bg: "bg-blue-100", text: "text-blue-600" },
              orange: { bg: "bg-orange-100", text: "text-orange-600" },
              purple: { bg: "bg-purple-100", text: "text-purple-600" },
              gray: { bg: "bg-muted", text: "text-muted-foreground" },
            };

            const { bg, text } = colorMap[color as keyof typeof colorMap];

            return (
              <button
                key={title}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted hover:bg-accent transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}
                  >
                    <Icon className={`w-4 h-4 ${text}`} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);
