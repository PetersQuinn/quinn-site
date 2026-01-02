import Link from "next/link";
import projectsData from "@/data/projects.json";
import GalleryModal from "@/components/GalleryModal";

/**
 * Turbopack/Next can wrap JSON imports as { default: ... } at runtime.
 * This normalizes it so we always get an array.
 */
function asArray<T>(x: unknown): T[] {
  if (Array.isArray(x)) return x as T[];
  if (x && typeof x === "object" && Array.isArray((x as any).default)) {
    return (x as any).default as T[];
  }
  return [];
}

type BaseProject = {
  slug: string;
  title: string;
  blurb: string;
  highlights?: string[];
  skills?: string[];
  languages?: string[];
  tools?: string[];
  domain: string;
  year: number;
  coverImage?: string;
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    writeup?: string;
  };
};

type Project = BaseProject & {
  stats?: { label: string; value: string }[];
  sections?: { title: string; body: string[] }[];
  images?: string[];
};

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
    >
      {children}
    </a>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57v-2.03c-3.2.72-3.87-1.4-3.87-1.4-.52-1.36-1.26-1.72-1.26-1.72-1.03-.73.08-.72.08-.72 1.14.08 1.74 1.2 1.74 1.2 1.01 1.77 2.65 1.26 3.3.97.1-.75.39-1.26.7-1.55-2.55-.3-5.23-1.31-5.23-5.83 0-1.29.45-2.35 1.2-3.18-.12-.3-.52-1.52.12-3.16 0 0 .98-.32 3.2 1.21a10.7 10.7 0 0 1 2.92-.4c.99 0 1.99.14 2.92.4 2.22-1.53 3.2-1.21 3.2-1.21.64 1.64.24 2.86.12 3.16.75.83 1.2 1.89 1.2 3.18 0 4.53-2.68 5.53-5.24 5.82.4.36.76 1.09.76 2.2v3.26c0 .31.21.69.8.57A11.27 11.27 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5z" />
    </svg>
  );
}

function PaperIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v4h4" />
      <path d="M8 11h8M8 15h8M8 19h6" />
    </svg>
  );
}

function DemoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M8 12h8" />
      <path d="M12 8v8" />
      <path d="M7.5 16.5l-2 3a2.5 2.5 0 0 1-4.2-2.3l1.4-5.1A4 4 0 0 1 6.6 9h10.8a4 4 0 0 1 3.9 3.1l1.4 5.1a2.5 2.5 0 0 1-4.2 2.3l-2-3" />
      <path d="M16.5 12h.01M18.5 13.5h.01" />
    </svg>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-app px-3 py-1 text-xs">
      {children}
    </span>
  );
}

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-app p-5 shadow-sm">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

// Next 16: params may be async
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const projects = asArray<Project>(projectsData);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-4">
          <Link className="underline underline-offset-4" href="/projects">
            ← Back to Projects
          </Link>
        </p>
      </main>
    );
  }

  const paperHref = project.links?.paper || project.links?.writeup || "";
  const githubHref = project.links?.github || "";
  const demoHref = project.links?.demo || "";

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* Back */}
      <div className="mb-6">
        <Link className="text-sm underline underline-offset-4" href="/projects">
          ← Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <div className="overflow-hidden rounded-3xl border border-app shadow-sm">
        <div className="relative h-60">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: project.coverImage ? `url(${project.coverImage})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Stronger overlay at top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.78), rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.12))",
            }}
          />

          {/* TOP aligned header */}
          <div className="absolute inset-0 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs text-white/85">
                  {project.domain} • {project.year}
                </div>

                <h1 className="mt-1 clamp-2 text-3xl font-bold leading-tight text-white">
                  {project.title}
                </h1>

                <p className="mt-3 clamp-3 text-sm text-white/80">
                  {project.blurb}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {paperHref ? (
                  <IconButton href={paperHref} label="Paper / Write-up">
                    <PaperIcon />
                  </IconButton>
                ) : null}
                {githubHref ? (
                  <IconButton href={githubHref} label="GitHub">
                    <GithubIcon />
                  </IconButton>
                ) : null}
                {demoHref ? (
                  <IconButton href={demoHref} label="Demo">
                    <DemoIcon />
                  </IconButton>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {/* Left column */}
        <div className="space-y-5 md:col-span-1">
          <CardSection title="Project Info">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Domain:</span>{" "}
                {project.domain}
              </div>
              <div>
                <span className="font-medium text-foreground">Year:</span>{" "}
                {project.year}
              </div>
            </div>
          </CardSection>

          {project.stats?.length ? (
            <CardSection title="Quick Stats">
              <div className="space-y-3">
                {project.stats.map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-3">
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                    <div className="text-sm font-medium">{s.value}</div>
                  </div>
                ))}
              </div>
            </CardSection>
          ) : null}

          {project.languages?.length ? (
            <CardSection title="Languages">
              <div className="flex flex-wrap gap-2">
                {project.languages.map((x) => (
                  <Chip key={x}>{x}</Chip>
                ))}
              </div>
            </CardSection>
          ) : null}

          {project.tools?.length ? (
            <CardSection title="Tools">
              <div className="flex flex-wrap gap-2">
                {project.tools.map((x) => (
                  <Chip key={x}>{x}</Chip>
                ))}
              </div>
            </CardSection>
          ) : null}

          {project.skills?.length ? (
            <CardSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {project.skills.map((x) => (
                  <Chip key={x}>{x}</Chip>
                ))}
              </div>
            </CardSection>
          ) : null}
        </div>

        {/* Right column */}
        <div className="space-y-5 md:col-span-2">
          {project.images?.length ? (
            <CardSection title="Gallery">
              <GalleryModal images={project.images} />
            </CardSection>
          ) : null}

          {project.sections?.length ? (
            project.sections.map((sec) => (
              <CardSection key={sec.title} title={sec.title}>
                <div className="space-y-3 text-muted-foreground">
                  {sec.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </CardSection>
            ))
          ) : (
            <CardSection title="Overview">
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Add a <code>sections</code> array to this project in{" "}
                  <code>projects.json</code> to render a full write-up automatically
                  (What / How / Results / Lessons).
                </p>
              </div>
            </CardSection>
          )}
        </div>
      </div>
    </main>
  );
}
