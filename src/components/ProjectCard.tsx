"use client";

import { useRouter } from "next/navigation";

type Project = {
  slug: string;
  title: string;
  blurb: string;
  highlights?: string[];
  skills: string[];
  languages: string[];
  tools: string[];
  domain: string;
  year: number;
  coverImage?: string;
  links: {
    github?: string;
    demo?: string;
    paper?: string;
    writeup?: string; // backward compatibility
  };
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
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation(); // don't trigger card navigation
        window.open(href, "_blank", "noreferrer");
      }}
    >
      {children}
    </button>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57v-2.03c-3.2.72-3.87-1.4-3.87-1.4-.52-1.36-1.26-1.72-1.26-1.72-1.03-.73.08-.72.08-.72 1.14.08 1.74 1.2 1.74 1.2 1.01 1.77 2.65 1.26 3.3.97.1-.75.39-1.26.7-1.55-2.55-.3-5.23-1.31-5.23-5.83 0-1.29.45-2.35 1.2-3.18-.12-.3-.52-1.52.12-3.16 0 0 .98-.32 3.2 1.21a10.7 10.7 0 0 1 2.92-.4c.99 0 1.99.14 2.92.4 2.22-1.53 3.2-1.21 3.2-1.21.64 1.64.24 2.86.12 3.16.75.83 1.2 1.89 1.2 3.18 0 4.53-2.68 5.53-5.24 5.82.4.36.76 1.09.76 2.2v3.26c0 .31.21.69.8.57A11.27 11.27 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5z" />
    </svg>
  );
}

function PaperIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v4h4" />
      <path d="M8 11h8M8 15h8M8 19h6" />
    </svg>
  );
}

function DemoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M8 12h8" />
      <path d="M12 8v8" />
      <path d="M7.5 16.5l-2 3a2.5 2.5 0 0 1-4.2-2.3l1.4-5.1A4 4 0 0 1 6.6 9h10.8a4 4 0 0 1 3.9 3.1l1.4 5.1a2.5 2.5 0 0 1-4.2 2.3l-2-3" />
      <path d="M16.5 12h.01M18.5 13.5h.01" />
    </svg>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  const { slug, title, blurb, year, domain, skills, languages, tools, links, coverImage } =
    project;

  const paperHref = links.paper ?? links.writeup;

  const tags = [domain, ...languages.slice(0, 2), ...tools.slice(0, 2), ...skills.slice(0, 2)]
    .filter(Boolean)
    .slice(0, 7);

  function goToDetail() {
    router.push(`/projects/${slug}`);
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToDetail();
        }
      }}
      className="group cursor-pointer rounded-3xl border border-app shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden rounded-t-3xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: coverImage ? `url(${coverImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Strong top overlay for readable header + icons */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.10))",
          }}
        />

        {/* TOP header row */}
        <div className="absolute left-0 right-0 top-0 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-white/85">
                {domain} • {year}
              </div>
              <h3 className="mt-1 clamp-2 text-lg font-semibold leading-tight text-white">
                {title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {paperHref ? (
                <IconButton href={paperHref} label="Paper / Write-up">
                  <PaperIcon />
                </IconButton>
              ) : null}
              {links.github ? (
                <IconButton href={links.github} label="GitHub">
                  <GithubIcon />
                </IconButton>
              ) : null}
              {links.demo ? (
                <IconButton href={links.demo} label="Demo">
                  <DemoIcon />
                </IconButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-b-3xl bg-app p-5">
        <p className="clamp-2 text-sm text-muted-foreground">{blurb}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-app px-2 py-0.5 text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-muted-foreground opacity-0 transition group-hover:opacity-100">
          Click to view details →
        </div>
      </div>
    </div>
  );
}
