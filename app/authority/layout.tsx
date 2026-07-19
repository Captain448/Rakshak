"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function AuthorityPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userSessionStr = localStorage.getItem("rakshak_user");
      if (!userSessionStr) {
        router.push("/login");
        return;
      }

      try {
        const user = JSON.parse(userSessionStr);
        if (user && (user.username.includes("officer") || user.email.includes("officer"))) {
          setAuthorized(true);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center py-40 text-center animate-pulse">
        <RefreshCw className="h-8 w-8 animate-spin text-saffron-500" />
        <p className="text-xs font-bold text-navy-900 uppercase tracking-wider">
          Securing Authority Environment...
        </p>
      </div>
    );
  }

  if (!authorized) {
    return null; // Prevents flashing content while redirecting
  }

  return <>{children}</>;
}
