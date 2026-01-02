"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Filters from "@/components/Filters";
import projectsData from "@/data/projects.json";

function asArray<T>(x: unknown): T[] {
  if (Array.isArray(x)) return x as T[];
  if (x && typeof x === "object" && Array.isArray((x as any).default)) {
    return (x as any).default as T[];
  }
  return [];
}

type Project = {
  slug: string;
  title: string;
  blurb: string;
  highlights?: string[];
  skills?: string[];
  languages?: string[];
  tools?: string[];
  domain: string; // string, not string[]
  year: number;
  coverImage?: string;
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    writeup?: string;
  };
};

function matchesQuery(p: Project, q: string) {
  const needle = q.toLowerCase();

  const haystack = [
    p.title,
    p.blurb,
    p.domain,
    ...(p.skills ?? []),
    ...(p.languages ?? []),
    ...(p.tools ?? []),
    String(p.year ?? ""),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(needle);
}

function hasPaperLink(p: Project) {
  return Boolean(p?.links?.paper || p?.links?.writeup);
}

export default function ProjectsPage() {
  // ✅ normalize JSON import to a real array
  const projects = asArray<Project>(projectsData);

  // text search
  const [query, setQuery] = useState("");

  // tag filters (skills/tools) selected via typeahead
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // compact filters
  const [domain, setDomain] = useState("");
  const [language, setLanguage] = useState("");
  const [hasGithub, setHasGithub] = useState(false);
  const [hasDemo, setHasDemo] = useState(false);
  const [hasPaper, setHasPaper] = useState(false);

  const filtered = useMemo(() => {
    let out = projects;

    const q = query.trim();
    if (q) out = out.filter((p) => matchesQuery(p, q));

    // domain dropdown
    if (domain) out = out.filter((p) => (p.domain ?? "") === domain);

    // language dropdown
    if (language) {
      out = out.filter((p) => (p.languages ?? []).includes(language));
    }

    // link toggles
    if (hasGithub) out = out.filter((p) => Boolean(p?.links?.github));
    if (hasDemo) out = out.filter((p) => Boolean(p?.links?.demo));
    if (hasPaper) out = out.filter((p) => hasPaperLink(p));

    // selected tags (skills/tools) AND logic
    if (selected.size > 0) {
      out = out.filter((p) => {
        const tags = new Set([...(p.skills ?? []), ...(p.tools ?? [])]);
        return Array.from(selected).every((t) => tags.has(t));
      });
    }

    // newest first
    return out.slice().sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }, [projects, query, selected, domain, language, hasGithub, hasDemo, hasPaper]);

  function clearAll() {
    setQuery("");
    setSelected(new Set());
    setDomain("");
    setLanguage("");
    setHasGithub(false);
    setHasDemo(false);
    setHasPaper(false);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search and filter by domain, language, and whether a project has a
          GitHub, demo, or paper/write-up.
        </p>
      </div>

      <Filters
        projects={projects as any}
        query={query}
        setQuery={setQuery}
        selected={selected}
        setSelected={setSelected}
        domain={domain}
        setDomain={setDomain}
        language={language}
        setLanguage={setLanguage}
        hasGithub={hasGithub}
        setHasGithub={setHasGithub}
        hasDemo={hasDemo}
        setHasDemo={setHasDemo}
        hasPaper={hasPaper}
        setHasPaper={setHasPaper}
        clearAll={clearAll}
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p as any} />
        ))}
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        Showing {filtered.length} / {projects.length}
      </div>
    </main>
  );
}
