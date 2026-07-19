"use client";

import { useState, useEffect, useCallback } from "react";
import { ShieldAlert, Search, ShieldCheck, RefreshCw, XCircle, Clock, AlertTriangle } from "lucide-react";

interface EvidenceSample {
  reported_by: string;
  message_text: string;
  timestamp: string;
  gemini_score: number;
}

interface TrustEntity {
  id: string;
  value: string;
  type: string;
  status: string;
  organization: string;
  report_count: number;
  confidence_score: number;
  gemini_risk_average: number;
  officer_verified: boolean;
  officer_blocked: boolean;
  blocked_reason: string;
  verified_source: string;
  first_reported_at: string;
  last_reported_at: string;
  evidence_samples: EvidenceSample[];
  history: { event: string; time: string }[];
}

export default function NationalReputationDirectory() {
  const [entities, setEntities] = useState<TrustEntity[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<TrustEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEntities = useCallback(async () => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/entities`);
      if (!res.ok) throw new Error("Failed to fetch entities");
      const data = await res.json();
      setEntities(data);
      if (selectedEntity) {
        const updated = data.find((e: TrustEntity) => e.id === selectedEntity.id);
        if (updated) setSelectedEntity(updated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedEntity]);

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

  const handleVerify = async (id: string) => {
    setActionLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/entities/${id}/verify`, {
        method: "POST"
      });
      if (!res.ok) throw new Error("Failed to verify entity");
      await fetchEntities();
    } catch (err) {
      alert("Verification update failed.");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlock = async (id: string) => {
    const reason = window.prompt("Enter block justification reason:");
    if (reason === null) return;
    if (!reason.trim()) {
      alert("A block justification reason is required.");
      return;
    }

    setActionLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/entities/${id}/block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked_reason: reason.trim() })
      });
      if (!res.ok) throw new Error("Failed to block entity");
      await fetchEntities();
    } catch (err) {
      alert("Block override failed.");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReset = async (id: string) => {
    setActionLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/v1/authority/entities/${id}/reset`, {
        method: "POST"
      });
      if (!res.ok) throw new Error("Failed to reset entity");
      await fetchEntities();
    } catch (err) {
      alert("Reset operation failed.");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Search & Filter Logic
  const filteredEntities = entities.filter((ent) => {
    const matchesStatus = filterStatus === "ALL" || ent.status === filterStatus;
    const matchesSearch =
      ent.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 py-2 max-w-6xl mx-auto">
      {/* Title */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <ShieldAlert className="h-7 w-7 text-saffron-500" />
          National Trust & Reputation Intelligence Directory
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Monitor community cybercrime evidence, check AI threat metrics, and manage manual block/verify safety overrides.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main List Table (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm min-h-[460px]">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-govgray-400" />
              <input
                type="text"
                placeholder="Search values or organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-govgray-300 rounded text-xs focus:outline-none focus:border-navy-700 w-full"
              />
            </div>
            {/* Filter Tabs */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-govgray-300 rounded text-xs font-bold text-navy-900 bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Verified</option>
              <option value="UNKNOWN">Unknown</option>
              <option value="SUSPECTED">Suspected</option>
              <option value="HIGH_RISK">High Risk</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20 text-xs font-bold text-govgray-600">
              Fetching reputation registries...
            </div>
          ) : filteredEntities.length === 0 ? (
            <div className="text-center py-20 text-xs font-bold text-govgray-600 border border-dashed border-govgray-200 rounded">
              No matching records found in Directory.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-govgray-200 font-extrabold text-[10px] uppercase text-govgray-600 tracking-wider">
                    <th className="py-2.5">Value</th>
                    <th className="py-2.5">Type</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Confidence</th>
                    <th className="py-2.5 text-center">Reports</th>
                    <th className="py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-govgray-100 font-medium">
                  {filteredEntities.map((ent) => (
                    <tr
                      key={ent.id}
                      onClick={() => setSelectedEntity(ent)}
                      className={`hover:bg-govgray-50/50 cursor-pointer transition-colors ${
                        selectedEntity?.id === ent.id ? "bg-navy-50/40" : ""
                      }`}
                    >
                      <td className="py-3 font-bold text-navy-900 break-all max-w-[150px]">
                        {ent.value}
                        {ent.organization && (
                          <span className="block text-[9px] font-semibold text-govgray-600 mt-0.5">
                            {ent.organization}
                          </span>
                        )}
                      </td>
                      <td className="py-3 uppercase text-[9px] font-bold text-govgray-600">
                        {ent.type}
                      </td>
                      <td className="py-3">
                        <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                          ent.status === "VERIFIED"
                            ? "bg-green-100 text-green-800"
                            : ent.status === "BLOCKED"
                            ? "bg-red-100 text-red-800"
                            : ent.status === "HIGH_RISK"
                            ? "bg-amber-100 text-amber-800"
                            : ent.status === "SUSPECTED"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-govgray-100 text-govgray-800"
                        }`}>
                          {ent.status}
                        </span>
                      </td>
                      <td className="py-3 font-bold">
                        {ent.confidence_score.toFixed(1)}%
                      </td>
                      <td className="py-3 text-center font-bold">
                        {ent.report_count}
                      </td>
                      <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1.5">
                          <button
                            disabled={actionLoading}
                            onClick={() => handleVerify(ent.id)}
                            className="p-1 text-green-600 hover:bg-green-50 border border-green-200 rounded transition-colors"
                            title="Verify Entity"
                          >
                            <ShieldCheck className="h-4 w-4" />
                          </button>
                          <button
                            disabled={actionLoading}
                            onClick={() => handleBlock(ent.id)}
                            className="p-1 text-red-600 hover:bg-red-50 border border-red-200 rounded transition-colors"
                            title="Block Entity"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                          <button
                            disabled={actionLoading}
                            onClick={() => handleReset(ent.id)}
                            className="p-1 text-govgray-600 hover:bg-govgray-100 border border-govgray-200 rounded transition-colors"
                            title="Reset to Community Logic"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Intelligence Detail Panel (Right col) */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-5 shadow-sm min-h-[460px]">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-2">
            Audit & Evidence Workspace
          </h3>

          {!selectedEntity ? (
            <div className="flex flex-col gap-2 justify-center items-center py-24 text-center text-govgray-600">
              <Clock className="h-10 w-10 text-govgray-300" />
              <span className="text-xs font-semibold">Select an Entity to Inspect</span>
              <p className="text-[10px] max-w-[200px] leading-relaxed">
                Click on any directory row to review user logs, AI ratings, and investigation trails.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4.5">
              {/* Entity Overview */}
              <div className="bg-govgray-50 border border-govgray-200 rounded p-4 text-xs flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-navy-900 break-all text-sm">{selectedEntity.value}</span>
                  <span className="text-[9px] uppercase font-bold text-govgray-600">{selectedEntity.type}</span>
                </div>
                
                {selectedEntity.officer_blocked && (
                  <div className="bg-red-50 border border-red-200 text-red-800 text-[10px] font-bold p-2.5 rounded flex flex-col gap-1 mt-1">
                    <div className="flex items-center gap-1.5 uppercase text-[9px] tracking-wide text-red-700">
                      <AlertTriangle className="h-3.5 w-3.5" /> Blocked by Authority
                    </div>
                    <p className="normal-case leading-relaxed font-semibold">
                      Reason: &ldquo;{selectedEntity.blocked_reason}&rdquo;
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-1 text-[10px] font-bold text-govgray-600 border-t border-govgray-200 pt-2 mt-1">
                  <div className="flex justify-between">
                    <span>First Reported:</span>
                    <span className="text-navy-900">{selectedEntity.first_reported_at}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Last Active Report:</span>
                    <span className="text-navy-900">{selectedEntity.last_reported_at}</span>
                  </div>
                </div>
              </div>

              {/* Evidence Samples */}
              <div>
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-2">
                  Recent Message Evidence ({selectedEntity.evidence_samples.length})
                </span>
                {selectedEntity.evidence_samples.length === 0 ? (
                  <div className="text-[10px] font-semibold text-govgray-600 bg-govgray-50 border border-govgray-200 p-3 rounded text-center">
                    No text evidence logged for this entity.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                    {selectedEntity.evidence_samples.map((ev, i) => (
                      <div key={i} className="border border-govgray-200 rounded p-2.5 bg-govgray-50/50 flex flex-col gap-1 text-[10px]">
                        <div className="flex justify-between items-center font-bold text-govgray-600">
                          <span>Reported by: {ev.reported_by}</span>
                          <span className="text-red-600">AI Risk: {ev.gemini_score}%</span>
                        </div>
                        <p className="font-semibold text-navy-900 leading-relaxed bg-white border border-govgray-100 p-1.5 rounded">
                          &ldquo;{ev.message_text}&rdquo;
                        </p>
                        <span className="text-[8px] text-right font-medium text-govgray-600">{ev.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* History Event Logs */}
              <div>
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-2">
                  Investigation Audit Trail
                </span>
                <div className="border-l-2 border-govgray-200 pl-3 flex flex-col gap-3 max-h-40 overflow-y-auto pr-1">
                  {selectedEntity.history.map((hist, idx) => (
                    <div key={idx} className="flex flex-col text-[10px] leading-relaxed">
                      <span className="font-bold text-navy-900">{hist.event}</span>
                      <span className="text-[8px] text-govgray-600 font-semibold">{hist.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
