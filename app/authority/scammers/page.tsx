"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Plus, PhoneCall, CheckCircle } from "lucide-react";

export default function ScammerRegistryConsole() {
  const [contacts, setContacts] = useState<string[]>([]);
  const [newContact, setNewContact] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchRegistry = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/scammers`);
      if (!res.ok) throw new Error("Failed to load scammers blacklist");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      // Fallback seed numbers if backend offline
      setContacts(["+91 99988 87776", "+91 88877 66655", "AD-HDFCBK", "verify@oksbi", "SBI-KYC-WARN"]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistry();
  }, []);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.trim()) return;

    setSubmitting(true);
    setSuccess(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/scammers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ contact: newContact.trim() })
      });

      if (!res.ok) throw new Error("Failed to blacklist contact");
      const data = await res.json();
      setContacts(data.scammers || []);
      setNewContact("");
      setSuccess(`Contact "${newContact}" blacklisted successfully.`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to submit contact.";
      window.alert(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-2 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <ShieldAlert className="h-7 w-7 text-saffron-500" />
          Verified Scammer Contact Registry
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Cyber Safety Command Center registry. Entries added here will instantly trigger critical warnings when processed by Citizen Shield.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column: Blacklist Entry Form */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Register New Scammer Node
          </h3>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-semibold p-3 rounded flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5 text-green-600 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleAddContact} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
                Phone Number or SMS Handle
              </label>
              <input
                type="text"
                required
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="e.g. '+91 99988 77766' or 'AD-HDFCBK'"
                className="bg-white border border-govgray-300 rounded p-2.5 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !newContact.trim()}
              className="bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded shadow transition-colors flex justify-center items-center gap-2 w-full"
            >
              <Plus className="h-4.5 w-4.5" />
              {submitting ? "Blacklisting..." : "Blacklist Contact"}
            </button>
          </form>
        </div>

        {/* Right Column: Registry lists */}
        <div className="md:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm min-h-[360px]">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Active Scammer Contacts Blacklist ({contacts.length})
          </h3>

          {loading && (
            <div className="text-center py-12 text-xs font-bold text-govgray-600">
              Loading registry index...
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
              {contacts.map((contact, idx) => (
                <div key={idx} className="border border-red-200 bg-red-50/30 rounded p-3 flex items-center justify-between hover:border-red-400 transition-colors">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4.5 w-4.5 text-red-600" />
                    <span className="text-xs font-bold text-navy-900">{contact}</span>
                  </div>
                  <span className="text-[8px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    CRITICAL WARNING
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
