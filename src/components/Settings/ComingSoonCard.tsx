import { Button } from "../ui/button";

export function ComingSoonCard({ icon, title, description }: any) {
  return (
    <div className="border p-4 rounded-xl shadow-sm flex items-center justify-between opacity-70">
      <div>
        <h2 className="text-lg font-semibold">
          {icon} {title}
        </h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
        Coming Soon
      </span>
    </div>
  );
}

export function IntegrationCard({ icon, title, status, onClick }: any) {
  return (
    <div className="border p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          {icon} {title}
        </h2>
        <p
          className={`text-sm ${
            status === "Connected" ? "text-green-600" : "text-gray-600"
          }`}
        >
          Status: {status}
        </p>
      </div>
      <Button onClick={onClick}>
        {status === "Connected" ? "Reconnect" : "Connect"}
      </Button>
    </div>
  );
}
