import FeaturedCarousel from "@/components/FeaturedCarousel";
import projectsData from "@/data/projects.json";

/**
 * Turbopack/Next can wrap JSON imports as { default: ... } at runtime.
 * Normalize so we always get an array.
 */
function asArray<T>(x: unknown): T[] {
  if (Array.isArray(x)) return x as T[];
  if (x && typeof x === "object" && Array.isArray((x as any).default)) {
    return (x as any).default as T[];
  }
  return [];
}

export default function HomePage() {
  const projects = asArray<any>(projectsData);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      {/* Featured carousel card */}
      <div className="mb-8">
        <FeaturedCarousel projects={projects} intervalMs={4500} />
      </div>

      {/* Main hero card */}
      <div className="rounded-3xl border border-app p-10 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight">Quinton Peters</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          ML, Data, and FinTech with an emphasis on reliable, decision-aware systems
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/projects" className="btn-primary rounded-xl px-5 py-2">
            View Projects
          </a>

          <a
            href="https://github.com/PetersQuinn"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-app px-5 py-2 hover:bg-muted"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/quintonpeters/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-app px-5 py-2 hover:bg-muted"
          >
            LinkedIn
          </a>

          <a
            href="mailto:quinton.peters@duke.edu"
            className="rounded-xl border border-app px-5 py-2 hover:bg-muted"
          >
            Email
          </a>
        </div>

        {/* Optional: keep this section as a short “pitch”, not a bullet list */}
      </div>
    </main>
  );
}
