"use client";

import { useState } from "react";
import { Search, Info, Network, Link2, UserMinus } from "lucide-react";

interface NodeConnection {
  type: string;
  label: string;
  risk: string;
  status: string;
}

interface GraphNode {
  id: string;
  label: string;
  value: string;
  risk: string;
  connections: NodeConnection[];
}

export default function FraudGraphExplorer() {
  const [searchVal, setSearchVal] = useState("");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  // Search trigger simulation
  const handleGraphSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.includes("99988") || searchVal.includes("cbi")) {
      setSelectedNode({
        id: "s1",
        label: "Suspect Phone",
        value: "+91 99988 87776",
        risk: "CRITICAL",
        connections: [
          { type: "Associated UPI", label: "cbi-verification@oksbi", risk: "CRITICAL", status: "Active Mule" },
          { type: "Money Sent From", label: "Rajesh Kumar (Victim)", risk: "LOW", status: "Verified Account" },
          { type: "Mule Bank Destination", label: "SBI Account ...12049", risk: "HIGH", status: "Flagged Account" },
          { type: "IP Logs registered", label: "192.168.1.14 (Gurgaon)", risk: "MEDIUM", status: "Active Session" }
        ]
      });
    } else {
      setSelectedNode({
        id: "s2",
        label: "UPI Handle",
        value: "verify-pan@okicici",
        risk: "HIGH",
        connections: [
          { type: "Associated Phone", label: "+91 91234 56789", risk: "HIGH", status: "Suspect Line" },
          { type: "Linked Account", label: "ICICI ...9420", risk: "HIGH", status: "Flagged Account" }
        ]
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Header */}
      <div className="border-b border-govgray-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
          <Network className="h-7 w-7 text-saffron-500" />
          Fraud Relationship Graph Explorer (Neo4j Registry)
        </h1>
        <p className="text-xs text-govgray-600 mt-1">
          Perform entity-relationship pathfinding checks across phone numbers, money mule accounts, UPI handles, and device prints.
        </p>
      </div>

      {/* Query Search */}
      <form onSubmit={handleGraphSearch} className="bg-govgray-50 border border-govgray-200 rounded p-4 flex gap-3 max-w-xl">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Enter Suspect Indicator (Phone, UPI handle, or account)..."
          className="flex-1 bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 h-9.5"
        />
        <button
          type="submit"
          className="bg-navy-900 text-white font-bold text-xs px-5 h-9.5 rounded hover:bg-navy-800 transition-colors flex items-center gap-1.5"
        >
          <Search className="h-4 w-4" />
          Run Neo4j Query
        </button>
      </form>

      {/* Main split dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Node graph drawing placeholder */}
        <div className="lg:col-span-2 bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-govgray-200 pb-3">
            <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide">
              Active Entity Cluster Graph
            </h3>
            <span className="text-[10px] text-govgray-600 font-semibold">Graph Database: Connected Nodes</span>
          </div>

          {/* Graph visual emulator: White canvas with clean navy circles */}
          <div className="bg-govgray-50 border border-govgray-200 rounded-lg h-96 relative flex items-center justify-center overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

            {/* Central Node */}
            <div className="absolute bg-navy-900 text-white border-2 border-saffron-500 rounded-full h-20 w-20 flex flex-col items-center justify-center text-center p-2 shadow z-10">
              <span className="text-[8px] font-bold uppercase tracking-wider text-saffron-500">Suspect</span>
              <p className="text-[9px] font-bold overflow-hidden text-ellipsis w-full">
                {selectedNode ? selectedNode.value : "+91 99988 87776"}
              </p>
            </div>

            {/* Relationship Lines & Satellites */}
            {/* Node 1 */}
            <div className="absolute top-12 left-1/4 flex flex-col items-center">
              <div className="bg-white border-2 border-red-600 rounded-full h-14 w-14 flex flex-col items-center justify-center text-center p-1.5 shadow">
                <span className="text-[8px] font-bold text-govgray-600 uppercase">UPI Handle</span>
                <p className="text-[8px] font-bold text-navy-900 w-full overflow-hidden text-ellipsis">cbi@oksbi</p>
              </div>
              <span className="text-[8px] text-red-600 font-bold bg-red-100 px-1 border border-red-200 mt-1 uppercase tracking-wider rounded">Linked Mule</span>
            </div>
            {/* Line SVG mock 1 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none">
              <line x1="25%" y1="18%" x2="50%" y2="50%" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4" />
            </svg>

            {/* Node 2 */}
            <div className="absolute bottom-12 left-[15%] flex flex-col items-center">
              <div className="bg-white border border-govgray-300 rounded-full h-14 w-14 flex flex-col items-center justify-center text-center p-1.5 shadow">
                <span className="text-[8px] font-bold text-govgray-600 uppercase">IP Address</span>
                <p className="text-[8px] font-bold text-navy-900 w-full overflow-hidden text-ellipsis">192.168.1.1</p>
              </div>
            </div>
            {/* Line SVG mock 2 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none">
              <line x1="18%" y1="78%" x2="50%" y2="50%" stroke="#d1d5db" strokeWidth="2" />
            </svg>

            {/* Node 3 */}
            <div className="absolute top-16 right-1/4 flex flex-col items-center">
              <div className="bg-white border border-govgray-300 rounded-full h-14 w-14 flex flex-col items-center justify-center text-center p-1.5 shadow">
                <span className="text-[8px] font-bold text-govgray-600 uppercase">Account</span>
                <p className="text-[8px] font-bold text-navy-900 w-full overflow-hidden text-ellipsis">SBI ...2049</p>
              </div>
            </div>
            {/* Line SVG mock 3 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none">
              <line x1="75%" y1="24%" x2="50%" y2="50%" stroke="#d1d5db" strokeWidth="2" />
            </svg>

            {/* Node 4 */}
            <div className="absolute bottom-16 right-12 flex flex-col items-center">
              <div className="bg-white border border-govgray-300 rounded-full h-14 w-14 flex flex-col items-center justify-center text-center p-1.5 shadow">
                <span className="text-[8px] font-bold text-govgray-600 uppercase">Victim</span>
                <p className="text-[8px] font-bold text-navy-900 w-full overflow-hidden text-ellipsis">Rajesh K.</p>
              </div>
              <span className="text-[8px] text-green-700 font-bold bg-green-100 px-1 border border-green-200 mt-1 uppercase tracking-wider rounded">Victim</span>
            </div>
            {/* Line SVG mock 4 */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none">
              <line x1="88%" y1="72%" x2="50%" y2="50%" stroke="#d1d5db" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Node details column */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4 shadow-sm">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wide border-b border-govgray-200 pb-3">
            Selected Entity Details
          </h3>

          {!selectedNode ? (
            <div className="flex flex-col gap-3 justify-center items-center py-12 text-center text-govgray-600">
              <Info className="h-8 w-8 text-govgray-300" />
              <p className="text-xs font-semibold">No Entity Selected</p>
              <span className="text-[10px] max-w-[200px] leading-relaxed">
                Submit a search query or click a node on the canvas to display associated threat trees.
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Node meta */}
              <div className="bg-govgray-50 p-4 border border-govgray-200 rounded flex flex-col gap-1.5">
                <span className="text-[10px] text-govgray-600 font-bold uppercase tracking-wider">
                  {selectedNode.label} Indicator
                </span>
                <span className="text-sm font-extrabold text-navy-900">
                  {selectedNode.value}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-semibold text-govgray-600">Threat Matrix:</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    selectedNode.risk === "CRITICAL" ? "bg-red-100 text-red-800 border-red-200 font-extrabold" : "bg-amber-100 text-amber-800 border-amber-200"
                  }`}>
                    {selectedNode.risk}
                  </span>
                </div>
              </div>

              {/* Connections list */}
              <div>
                <span className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider block mb-2">
                  Linked Entity Nodes ({selectedNode.connections.length})
                </span>
                <div className="flex flex-col gap-2">
                  {selectedNode.connections.map((conn, idx) => (
                    <div key={idx} className="border border-govgray-200 rounded p-2.5 bg-white flex flex-col gap-1 hover:border-navy-900 transition-colors">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-govgray-600">{conn.type}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] border uppercase ${
                          conn.risk === "CRITICAL"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : conn.risk === "HIGH"
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }`}>
                          {conn.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                        <Link2 className="h-3.5 w-3.5 text-saffron-500 shrink-0" />
                        {conn.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions panel */}
              <div className="border-t border-govgray-200 pt-3 mt-1 flex gap-2">
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 rounded transition-colors flex items-center justify-center gap-1.5">
                  <UserMinus className="h-4 w-4" /> Block Mule accounts
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
