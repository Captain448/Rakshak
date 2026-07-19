"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, ShieldAlert, UserPlus } from "lucide-react";
import Link from "next/link";

export default function UserSignupPortal() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          username, 
          password,
          email,
          full_name: fullName
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      const data = await res.json();
      // Store user details in localStorage
      localStorage.setItem("rakshak_user", JSON.stringify(data.user));
      
      // Redirect to home page
      router.push("/");
      // Force page refresh to update Navbar state
      router.refresh();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Registration error.";
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
              CREATE AN ACCOUNT
            </h2>
            <p className="text-[9px] text-govgray-600 font-bold uppercase tracking-wider">
              Rakshak AI Citizen Safety Registry
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-semibold p-3 rounded mb-4 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. 'Rajesh Kumar'"
              className="bg-white border border-govgray-300 rounded p-2.5 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
              Email Address
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
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white border border-govgray-300 rounded p-2.5 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs py-2.5 rounded shadow transition-colors flex justify-center items-center gap-2 mt-2 disabled:opacity-50"
          >
            <UserPlus className="h-4 w-4" />
            {loading ? "Registering..." : "Register Account"}
          </button>
        </form>

        <p className="text-[10px] text-center text-govgray-600 font-semibold mt-4">
          Already registered?{" "}
          <Link href="/login" className="text-saffron-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
