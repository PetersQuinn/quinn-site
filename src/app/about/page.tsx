import Image from "next/image";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-app p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      {/* Top card: photo + intro */}
      <section className="overflow-hidden rounded-3xl border border-app shadow-sm">
        <div className="grid md:grid-cols-3">
            {/* Full-height image column */}
            <div className="relative min-h-[220px] md:min-h-[260px]">
            <Image
                src="/headshot.jpg"
                alt="Quinton Peters"
                fill
                className="object-cover"
                priority
            />
            </div>

            {/* Text */}
            <div className="p-6 md:col-span-2 space-y-3">
            <h1 className="text-2xl font-bold">About Me</h1>
            <p className="text-muted-foreground">
                I’m a Machine Learning and AI engineer from Duke University, with a strong focus on reliability,
                decision-making, and applied ML systems.
            </p>
            <p className="text-muted-foreground">
               I like working on problems where outputs affect real decisions. 
               That includes inference-time trust in LLMs, probabilistic predictions that need to be interpreted carefully, and tools that help people act under uncertainty rather than ignore it.
               A lot of my earlier projects started with sports analytics, which remains a big interest of mine both professionally and personally.
            </p>
            <p className="text-sm text-muted-foreground">
                Originally from Toledo, Ohio · Duke University
            </p>
            </div>
        </div>
        </section>


      {/* How you think */}
      <Card title="How I Think About Building Systems">
        <div className="space-y-3 text-muted-foreground">
          <p>
            I’m particularly interested in the reliability side of machine
            learning—understanding when models should be trusted, when they
            shouldn’t, and how to design systems that surface uncertainty rather
            than hide it.
          </p>
          <p>
            Many of my projects sit at the intersection of ML and decision
            support: selective prediction, calibrated probabilities, and tools
            that help users prioritize attention rather than blindly automate
            outcomes.
          </p>
        </div>
      </Card>

            {/* Interests */}
            <Card title="Interests & Communities">
        <div className="space-y-3 text-muted-foreground">
            <p>
            Sports, especially the NFL, are a big part of how I think about probability and performance. 
            Long before I worked on machine learning projects, I was asking questions about decision-making under pressure, variance, and evaluation through sports. 
            That perspective still shapes how I approach modeling today.
            </p>

            <p>
            Outside of work, I stay active through lifting, running, and playing sand volleyball. 
            It is how I reset, spend time with friends, and keep some balance alongside technical work.
            </p>

            <p>
            I also run and contribute to sports-focused social media accounts with over 75,000 total followers. 
            That experience taught me how quickly feedback appears when something resonates, how communities form around shared interests, and how to communicate ideas clearly to a broad audience.
            </p>
        </div>
        </Card>
    </main>
  );
}
