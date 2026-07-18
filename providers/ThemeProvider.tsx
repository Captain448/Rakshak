"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/lib/types";

interface Notification {
  id: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
}

interface ThemeContextType {
  theme: "light";
  user: User | null;
  login: (role: User["role"]) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;
  apiLoading: boolean;
  setApiLoading: (loading: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<"light">("light");
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [apiLoading, setApiLoading] = useState(false);

  const login = (role: User["role"]) => {
    setUser({
      id: `usr-${Math.floor(Math.random() * 1000)}`,
      email: role === "citizen" ? "citizen@nic.in" : "officer-delhi@gov.in",
      role,
      agencyName: role !== "citizen" ? "Delhi Police Cyber Cell" : undefined,
      createdAt: new Date().toISOString(),
    });
    addNotification(`Logged in as ${role === "citizen" ? "Citizen" : "Officer"}`, "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("Logged out successfully", "info");
  };

  const addNotification = (message: string, type: Notification["type"] = "info") => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substring(7),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotif]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeNotification(newNotif.id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        user,
        login,
        logout,
        notifications,
        addNotification,
        removeNotification,
        apiLoading,
        setApiLoading,
      }}
    >
      {children}
      {/* Toast notifications container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => removeNotification(notif.id)}
            className={`p-3 rounded text-xs font-semibold shadow border cursor-pointer flex justify-between items-center transition-all ${
              notif.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : notif.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : notif.type === "warning"
                ? "bg-amber-50 border-amber-200 text-amber-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <span>{notif.message}</span>
            <span className="text-[10px] opacity-60 ml-2">×</span>
          </div>
        ))}
      </div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
