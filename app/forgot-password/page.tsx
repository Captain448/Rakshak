"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, ShieldAlert, CheckCircle, RefreshCw, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPortal() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          new_password: newPassword
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Verification failed");
      }

      setSuccess("Your password has been successfully reset! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to reset password.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-full max-w-md bg-white border border-govgray-200 rounded p-6 shadow-md">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <div className="bg-navy-900 p-2.5 rounded text-white">
            <Landmark className="h-6 w-6 text-saffron-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-900 uppercase tracking-wide">
              PASSWORD RECOVERY
            </h2>
            <p className="text-[9px] text-govgray-600 font-bold uppercase tracking-wider">
              Secure Safety Account Recovery
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-semibold p-3 rounded mb-4 flex items-center gap-2">
            <ShieldAlert className="h-4.5 w-4.5 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-semibold p-3 rounded mb-4 flex items-center gap-2">
            <CheckCircle className="h-4.5 w-4.5 text-green-600 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. 'citizen'"
              className="bg-white border border-govgray-300 rounded p-2.5 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. 'citizen@safety.gov.in'"
              className="bg-white border border-govgray-300 rounded p-2.5 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
              New Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-white border border-govgray-300 rounded p-2.5 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-govgray-500 hover:text-navy-900 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs py-2.5 rounded shadow transition-colors flex justify-center items-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="text-[10px] text-center text-govgray-600 font-semibold mt-4">
          Back to{" "}
          <Link href="/login" className="text-saffron-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
