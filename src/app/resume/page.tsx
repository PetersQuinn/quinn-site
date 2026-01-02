import Link from "next/link";

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-app p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Role({
  title,
  org,
  location,
  dates,
  bullets,
}: {
  title: string;
  org?: string;
  location?: string;
  dates: string;
  bullets: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="font-medium">{title}</div>
          {org ? (
            <div className="text-sm text-muted-foreground">
              {org}
              {location ? ` · ${location}` : ""}
            </div>
          ) : null}
        </div>
        <div className="text-sm text-muted-foreground">{dates}</div>
      </div>

      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Quinton Peters</h1>
        <p className="mt-1 text-muted-foreground">
          Machine Learning & AI Engineer · Duke University
        </p>

        </div>

      {/* Education */}
      <Card title="Education">
        <div className="space-y-4">
          <div>
            <div className="font-medium">
              B.Eng. Risk, Data, and Financial Engineering
            </div>
            <div className="text-sm text-muted-foreground">
              Duke University ·  Aug 2022 –  May 2026 · GPA: 3.64
            </div>
          </div>

          <div>
            <div className="font-medium">
              M.Eng. Financial Technologies (4+1 Program)
            </div>
            <div className="text-sm text-muted-foreground">
              Duke University · Aug 2025 – May 2027 · GPA: 4.00
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Accepted into Duke’s selective 4+1 FinTech master’s program.
              The degree can be completed in one additional year and offers
              flexibility to be taken fully online, or delayed/declined, if desired.
            </p>
          </div>
        </div>
      </Card>

      {/* Experience */}
      <Card title="Experience">
        <div className="space-y-6">
          {/* Voyatek */}
          <div className="space-y-4">
            <Role
              title="Machine Learning & Software Development Associate"
              org="Voyatek"
              location="Remote"
              dates="August 2025 – Present"
              bullets={[
                "Continuing development of the Project Performance Insights (PPI) platform after it won Voyatek’s 2025 AI Innovation Award.",
                "Leading a Node.js rearchitecture of the Application Fraud Firewall, reducing latency and integrating model-driven anomaly detection.",
                "Designing and maintaining Azure-hosted microservices for secure LLM inference, retrieval agents, and internal AI utilities.",
                "Conducting applied research on multimodal and agentic LLM systems using Microsoft and Amazon frameworks.",
              ]}
            />

            <Role
              title="AI & Machine Learning Consultant Intern"
              org="Voyatek"
              dates="May 2025 - August 2025"
              bullets={[
                "Built and deployed internal generative AI systems using Azure AI Foundry and private LLM APIs for automated project reporting.",
                "Solely Engineered the award-winning PPI dashboard combining Streamlit, SQLite, and Azure-based inference pipelines.",
                "Prototyped LLM-agent backends for executive reporting using Amazon Bedrock and Azure Cognitive Services.",
                "Enhanced RFP and policy document workflows with Python, embeddings, and retrieval-augmented generation (RAG).",
              ]}
            />
          </div>

          {/* General Motors */}
          <div className="space-y-4">
            <Role
              title="Manufacturing Process Optimization Intern – Data"
              org="General Motors"
              dates="May 2024 - August 2024"
              location="Warren, MI"
              bullets={[
                "Engineered a sensor calibration system for laser safety, reducing false triggers and production downtime.",
                "Built predictive maintenance models using historical failure data to reduce unplanned downtime.",
                "Developed dynamic parameter optimization frameworks improving cross-plant performance consistency.",
                "Automated KPI extraction from production logs to inform real-time process improvements.",
              ]}
            />
          </div>
        </div>
      </Card>
    </main>
  );
}
