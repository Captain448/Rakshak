"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface WarningBannerProps {
  message: string;
  type?: "critical" | "warning" | "info";
  dismissible?: boolean;
}

export default function WarningBanner({
  message,
  type = "warning",
  dismissible = true,
}: WarningBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const bgStyles = {
    critical: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconStyles = {
    critical: "text-red-600",
    warning: "text-amber-600",
    info: "text-blue-600",
  };

  return (
    <div className={`border-l-4 p-4 rounded-r shadow-xs flex justify-between items-start gap-3 transition-opacity ${bgStyles[type]}`}>
      <div className="flex gap-3">
        <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${iconStyles[type]}`} />
        <div>
          <span className="font-bold text-xs uppercase tracking-wider block mb-1">
            {type === "critical" ? "⚠️ CRITICAL ADVISORY" : type === "warning" ? "⚠️ SECURITY ALERT" : "ℹ️ INFORMATION"}
          </span>
          <p className="text-xs font-medium leading-relaxed">{message}</p>
        </div>
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="text-govgray-600 hover:text-govgray-900 rounded p-1 hover:bg-govgray-100/50"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
