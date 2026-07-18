"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (filters: { state: string; district: string; query: string }) => void;
}

export const INDIAN_REGIONS = {
  "All States": [],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "Dwarka", "Rohini"],
  "Uttar Pradesh": ["Gautam Buddha Nagar (Noida)", "Lucknow", "Ghaziabad", "Kanpur", "Varanasi"],
  "Haryana": ["Gurugram", "Faridabad", "Rohtak", "Ambala", "Panchkula"],
  "Maharashtra": ["Mumbai City", "Pune", "Nagpur", "Thane", "Nashik"],
  "Jharkhand": ["Jamtara", "Ranchi", "Dhanbad", "Jamshedpur"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "North 24 Parganas"]
};

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [query, setQuery] = useState("");

  const states = Object.keys(INDIAN_REGIONS);
  const districts = selectedState !== "All States" 
    ? INDIAN_REGIONS[selectedState as keyof typeof INDIAN_REGIONS] || [] 
    : [];

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict(""); // Reset district
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ state: selectedState, district: selectedDistrict, query });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="bg-govgray-50 border border-govgray-200 rounded p-4 flex flex-col md:flex-row gap-4 items-end">
      {/* State Selector */}
      <div className="flex-1 flex flex-col gap-1 w-full">
        <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
          State / UT
        </label>
        <select
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full h-9.5"
        >
          {states.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* District Selector */}
      <div className="flex-1 flex flex-col gap-1 w-full">
        <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
          District
        </label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={selectedState === "All States"}
          className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full disabled:bg-govgray-100 disabled:text-govgray-600 h-9.5"
        >
          <option value="">All Districts</option>
          {districts.map((dst) => (
            <option key={dst} value={dst}>
              {dst}
            </option>
          ))}
        </select>
      </div>

      {/* Text query input */}
      <div className="flex-[2] flex flex-col gap-1 w-full">
        <label className="text-[10px] font-bold text-govgray-600 uppercase tracking-wider">
          Keywords (Scam type, indicator, etc)
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'WhatsApp video call', 'Part-time jobs', 'CBI'"
          className="bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 w-full h-9.5"
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-navy-900 text-white text-xs font-bold px-5 h-9.5 rounded hover:bg-navy-800 transition-colors flex items-center justify-center gap-1.5 shrink-0 w-full md:w-auto"
      >
        <Search className="h-4 w-4" />
        Filter Alerts
      </button>
    </form>
  );
}
