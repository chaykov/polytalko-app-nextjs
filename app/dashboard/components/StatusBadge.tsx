"use client";

export default function StatusBadge({
  status,
  showText = true,
}: {
  status: "online" | "offline";
  showText?: boolean;
}) {
  const statusColor = {
    online: "bg-green-500",
    offline: "bg-red-500",
  };

  return (
    <div className="flex items-center gap-x-1">
      <span className={`w-3 h-3 rounded-full ${statusColor[status]}`} />
      {showText && (
        <span className="text-sm text-gray-600 capitalize">{status}</span>
      )}
    </div>
  );
}
