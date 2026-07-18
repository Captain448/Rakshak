import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    type: "up" | "down" | "neutral";
  };
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) {
  const trendColors = {
    up: "text-red-600 font-bold",
    down: "text-green-600 font-bold",
    neutral: "text-govgray-600",
  };

  return (
    <div className="bg-white border border-govgray-200 rounded p-5 flex justify-between items-start shadow-xs hover:border-navy-700 transition-colors">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-govgray-600 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-extrabold text-navy-900 tracking-tight">
          {value}
        </span>
        {description && <p className="text-[11px] text-govgray-600">{description}</p>}
        {trend && (
          <span className={`text-[10px] mt-1 ${trendColors[trend.type]}`}>
            {trend.value}
          </span>
        )}
      </div>
      {icon && (
        <div className="bg-govgray-100 p-2.5 rounded text-navy-900 shrink-0">
          {icon}
        </div>
      )}
    </div>
  );
}
