"use client";

import { useMemo, useState } from "react";

type Project = {
  domain?: string;
  skills?: string[];
  languages?: string[];
  tools?: string[];
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    writeup?: string;
  };
};

function uniqSorted(items: string[]) {
  return Array.from(new Set(items.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function TogglePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border border-app px-3 py-1 text-sm transition",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        active
          ? "bg-muted"
          : "hover:bg-muted",
      ].join(" ")}
      title={active ? `Filter: ${label} (on)` : `Filter: ${label} (off)`}
    >
      {/* little status dot */}
      <span
        className={[
          "h-2 w-2 rounded-full border border-app",
          active ? "bg-app" : "bg-transparent",
        ].join(" ")}
      />
      <span>{label}</span>
      <span className="text-xs text-muted-foreground">
        {active ? "ON" : "OFF"}
      </span>
    </button>
  );
}


export default function Filters({
  projects,
  query,
  setQuery,

  // Skill/tool tag filters (selected via typeahead)
  selected,
  setSelected,

  // Compact filters
  domain,
  setDomain,
  language,
  setLanguage,
  hasGithub,
  setHasGithub,
  hasDemo,
  setHasDemo,
  hasPaper,
  setHasPaper,

  clearAll,
}: {
  projects: Project[];
  query: string;
  setQuery: (v: string) => void;

  selected: Set<string>;
  setSelected: (s: Set<string>) => void;

  domain: string;
  setDomain: (v: string) => void;

  language: string;
  setLanguage: (v: string) => void;

  hasGithub: boolean;
  setHasGithub: (v: boolean) => void;

  hasDemo: boolean;
  setHasDemo: (v: boolean) => void;

  hasPaper: boolean;
  setHasPaper: (v: boolean) => void;

  clearAll: () => void;
}) {
  const domains = useMemo(
    () => uniqSorted(projects.map((p) => p.domain ?? "").filter(Boolean)),
    [projects]
  );

  const languages = useMemo(() => {
    const all = projects.flatMap((p) => p.languages ?? []);
    return uniqSorted(all);
  }, [projects]);

  // For tag typeahead: skills + tools only (keeps it tighter than “everything”)
  const allTags = useMemo(() => {
    const skills = projects.flatMap((p) => p.skills ?? []);
    const tools = projects.flatMap((p) => p.tools ?? []);
    return uniqSorted([...skills, ...tools]);
  }, [projects]);

  const [tagQuery, setTagQuery] = useState("");
  const tagSuggestions = useMemo(() => {
    const q = tagQuery.trim().toLowerCase();
    if (!q) return [];
    return allTags
      .filter((t) => t.toLowerCase().includes(q))
      .filter((t) => !selected.has(t))
      .slice(0, 8);
  }, [tagQuery, allTags, selected]);

  function addTag(tag: string) {
    const next = new Set(selected);
    next.add(tag);
    setSelected(next);
    setTagQuery("");
  }

  function removeTag(tag: string) {
    const next = new Set(selected);
    next.delete(tag);
    setSelected(next);
  }

  return (
    <div className="rounded-3xl border border-app p-5 shadow-sm">
      {/* Search + Clear */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1">
          <label className="text-sm font-medium">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: Python, LLMs, Streamlit, calibration..."
            className="mt-1 w-full rounded-xl border border-app bg-app px-3 py-2"
          />
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="rounded-xl border border-app px-4 py-2 text-sm hover:bg-muted"
        >
          Clear
        </button>
      </div>

      {/* Domain + Language */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Domain</label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="mt-1 w-full rounded-xl border border-app bg-app px-3 py-2"
          >
            <option value="">All domains</option>
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-1 w-full rounded-xl border border-app bg-app px-3 py-2"
          >
            <option value="">All languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

        {/* Link toggles */}
        <div className="mt-5">
        <div className="mb-2 text-sm font-medium">Links</div>
        <div className="flex flex-wrap gap-2">
            <TogglePill
            label="Has GitHub"
            active={hasGithub}
            onClick={() => setHasGithub(!hasGithub)}
            />
            <TogglePill
            label="Has Demo"
            active={hasDemo}
            onClick={() => setHasDemo(!hasDemo)}
            />
            <TogglePill
            label="Has Paper"
            active={hasPaper}
            onClick={() => setHasPaper(!hasPaper)}
            />
        </div>
        </div>


      {/* Skill/Tool typeahead */}
      <div className="mt-4">
        <label className="text-sm font-medium">Add skill/tool filter</label>
        <div className="relative mt-1">
          <input
            value={tagQuery}
            onChange={(e) => setTagQuery(e.target.value)}
            placeholder="Type to search tags (e.g., Azure, LightGBM, calibration...)"
            className="w-full rounded-xl border border-app bg-app px-3 py-2"
          />

          {tagSuggestions.length > 0 ? (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-app bg-app shadow-lg">
              {tagSuggestions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => addTag(t)}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  {t}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Selected tag chips */}
        {selected.size > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from(selected).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => removeTag(t)}
                className="rounded-full border border-app px-3 py-1 text-sm hover:bg-muted"
                title="Remove filter"
              >
                {t} <span className="opacity-60">×</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
