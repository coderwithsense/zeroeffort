import { Brain } from "lucide-react";
import { Button } from "../ui/button";

export const AiPreferencesSection = ({
  aiPreferences,
  updateAiPreference,
}: {
  aiPreferences: { tone: string; summarization: string };
  updateAiPreference: (key: AiPrefKey, value: any) => void;
}) => (
  <div className="space-y-6">
    <div className="bg-card rounded-xl border border-border shadow-md">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              AI Preferences
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize how AI interacts with you
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Tone of Voice */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["friendly", "formal", "technical", "casual"].map((tone) => {
              const isSelected = aiPreferences.tone === tone;
              return (
                <button
                  key={tone}
                  onClick={() => updateAiPreference("tone", tone)}
                  className={`p-3 rounded-lg border text-sm font-semibold capitalize transition-colors duration-200
                    ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted text-muted-foreground border-border hover:bg-accent hover:text-white"
                    }`}
                >
                  {tone}
                </button>
              );
            })}
          </div>

          {/* Summarization Style */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Summarization Style
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  key: "bullets",
                  name: "Bullet Points",
                  desc: "Quick and scannable",
                },
                {
                  key: "prose",
                  name: "Full Prose",
                  desc: "Detailed paragraphs",
                },
              ].map(({ key, name, desc }) => {
                const isSelected = aiPreferences.summarization === key;
                return (
                  <button
                    key={key}
                    onClick={() => updateAiPreference("summarization", key)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 group
                      ${
                        isSelected
                          ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                          : "border-border bg-muted hover:border-accent"
                      }`}
                  >
                    <div
                      className={`font-semibold ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {name}
                    </div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
