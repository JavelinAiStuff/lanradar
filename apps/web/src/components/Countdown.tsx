"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
  label?: string;
  compact?: boolean;
}

export default function Countdown({ targetDate, label, compact = false }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      };
    };
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">🎮 Happening Now!</span>;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs">
        {label && <span className="text-muted-foreground mr-1">{label}</span>}
        <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded font-mono">{timeLeft.days}d</span>
        <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded font-mono">{timeLeft.hours}h</span>
        <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded font-mono">{timeLeft.minutes}m</span>
        <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded font-mono">{timeLeft.seconds}s</span>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {label && <p className="text-xs text-muted-foreground mb-1.5">{label}</p>}
      <div className="flex gap-2">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hrs" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Sec" },
        ].map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1.5 font-mono text-primary text-lg font-bold min-w-[3rem]">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
