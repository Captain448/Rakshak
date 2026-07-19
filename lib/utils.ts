import { AlertSeverity } from "./types";

/**
 * Format string or Date to Indian Standard format e.g. DD-MM-YYYY
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return String(date);
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Format number to Indian Currency Format (INR)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Get CSS Tailwind classes for a specific Risk Severity level
 */
export function getRiskColor(level: AlertSeverity | string): {
  bg: string;
  text: string;
  border: string;
} {
  const norm = level?.toUpperCase();
  switch (norm) {
    case "LOW":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      };
    case "MEDIUM":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      };
    case "HIGH":
      return {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
      };
    case "CRITICAL":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      };
    default:
      return {
        bg: "bg-govgray-100",
        text: "text-govgray-800",
        border: "border-govgray-200",
      };
  }
}

/**
 * Truncate description text with ellipses
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Generate a random mock case ID following standard government format
 */
export function generateCaseId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `MHA-2026-${randomNum}`;
}
