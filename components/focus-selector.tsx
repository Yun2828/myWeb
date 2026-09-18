"use client";
import type { RoleFocus } from "@/data/portfolio";

export function FocusSelector({ active, onChange }: { active: RoleFocus | null; onChange: (focus: RoleFocus | null) => void }) {
  const choose = (value: RoleFocus | null) => { onChange(value); const url = new URL(window.location.href); value ? url.searchParams.set("focus", value) : url.searchParams.delete("focus"); window.history.replaceState({}, "", url); };
  const options: { value: RoleFocus | null; label: string }[] = [{ value: null, label: "View All" }, { value: "software-engineering", label: "Software Engineering" }, { value: "ai-ml", label: "AI / Machine Learning" }];
  return <div className="project-focus-tabs" aria-label="Browse portfolio by focus"><div><p className="focus-prompt">Browse my work</p></div><div className="focus-options" role="tablist" aria-label="Browse portfolio by focus">{options.map((option) => <button type="button" role="tab" key={option.label} className={active === option.value ? "focus-option active" : "focus-option"} aria-selected={active === option.value} aria-controls="portfolio-results" tabIndex={active === option.value ? 0 : -1} onClick={() => choose(option.value)}>{option.label}</button>)}</div></div>;
}
