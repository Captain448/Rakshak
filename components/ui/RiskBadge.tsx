interface RiskBadgeProps {
  level: "low" | "medium" | "high" | "critical" | string;
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const normLevel = level?.toLowerCase();

  const styles = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-blue-100 text-blue-800 border-blue-200",
    high: "bg-amber-100 text-amber-800 border-amber-200",
    critical: "bg-red-100 text-red-800 border-red-200 font-bold animate-pulse",
  };

  const matchedStyle = styles[normLevel as keyof typeof styles] || "bg-govgray-100 text-govgray-800 border-govgray-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${matchedStyle}`}>
      {level}
    </span>
  );
}
