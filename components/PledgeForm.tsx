"use client";

import { useState } from "react";
import { HeartHandshake, CheckCircle2, AlertTriangle } from "lucide-react";

interface PledgeFormProps {
  templeId: string;
  eventName: string;
  pledgeCount: number;
}

export default function PledgeForm({
  templeId,
  eventName,
  pledgeCount: initialCount,
}: PledgeFormProps) {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(initialCount);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templeId, eventName, name: name.trim(), isPublic }),
      });
      if (!res.ok) throw new Error("Failed to submit pledge.");
      setSuccess(true);
      setCount((c) => c + 1);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(245,158,11,0.12)" }}
        >
          <CheckCircle2 size={28} strokeWidth={1.75} className="text-[#F59E0B]" />
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-[#FAFAF9] mb-1">
            Your pledge is registered
          </p>
          <p className="text-sm text-[#A8A29E]">
            {count} {count === 1 ? "person has" : "people have"} pledged to
            attend {eventName}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(249,115,22,0.1)" }}
        >
          <HeartHandshake size={20} strokeWidth={1.75} className="text-[#F97316]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#FAFAF9]">
            Pledge to attend
          </p>
          <p className="text-xs text-[#A8A29E]">
            {count} {count === 1 ? "person has" : "people have"} already pledged
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="pledge-name"
          className="block text-xs font-semibold text-[#A8A29E] mb-1.5 uppercase tracking-wide"
        >
          Your name
        </label>
        <input
          id="pledge-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="First name is fine"
          className="w-full bg-[#241D16] border border-[rgba(249,115,22,0.15)] rounded-lg px-3.5 py-2.5 text-sm text-[#FAFAF9] placeholder-[#57534E] focus:outline-none focus:border-[rgba(249,115,22,0.5)] focus:ring-2 focus:ring-[rgba(249,115,22,0.1)] transition-all duration-200"
          maxLength={80}
          aria-describedby={error ? "pledge-error" : undefined}
        />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${
              isPublic
                ? "bg-[#F97316] border-[#F97316]"
                : "border-[rgba(249,115,22,0.3)] bg-transparent"
            }`}
          >
            {isPublic && (
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-xs text-[#78716C] group-hover:text-[#A8A29E] transition-colors">
          Show my name publicly on this pledge
        </span>
      </label>

      {error && (
        <div
          id="pledge-error"
          className="flex items-center gap-2 text-xs text-[#EF4444] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.15)] rounded-lg px-3 py-2"
          role="alert"
        >
          <AlertTriangle size={14} strokeWidth={1.75} />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Registering pledge...
          </>
        ) : (
          <>
            <HeartHandshake size={16} strokeWidth={1.75} />
            Pledge to attend
          </>
        )}
      </button>

      <p className="text-[10px] text-[#57534E] text-center leading-relaxed">
        Pledges show collective commitment. Your identity is never shared
        without consent.
      </p>
    </form>
  );
}
