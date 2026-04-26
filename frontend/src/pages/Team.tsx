import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink } from "lucide-react";

const teamMembers = [
  { name: "Alex Kim", role: "AI Engineer", skills: ["Python", "TensorFlow", "NLP"], category: "AI/ML", avatar: "AK" },
  { name: "Priya Rao", role: "ML Researcher", skills: ["PyTorch", "Computer Vision", "MLOps"], category: "AI/ML", avatar: "PR" },
  { name: "Jordan Lee", role: "Mobile Developer", skills: ["React Native", "Swift", "Kotlin"], category: "Mobile Dev", avatar: "JL" },
  { name: "Sam Watts", role: "Mobile Developer", skills: ["Flutter", "Firebase", "Dart"], category: "Mobile Dev", avatar: "SW" },
  { name: "Maya Torres", role: "Frontend Engineer", skills: ["React", "TypeScript", "Tailwind"], category: "Web Dev", avatar: "MT" },
  { name: "Chris Baker", role: "Backend Engineer", skills: ["Node.js", "PostgreSQL", "AWS"], category: "Web Dev", avatar: "CB" },
  { name: "Ava Patel", role: "UI/UX Designer", skills: ["Figma", "Framer", "Prototyping"], category: "Web Dev", avatar: "AP" },
  { name: "Liam Chen", role: "Full Stack Dev", skills: ["Next.js", "Prisma", "Docker"], category: "Web Dev", avatar: "LC" },
];

const filters = ["All", "Web Dev", "Mobile Dev", "AI/ML"];

const Team = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = teamMembers.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || m.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <Layout>
      {/* pt-32 = top padding, pb-32 = bottom padding — change values as needed */}
      <section className="relative section-padding pt-52 pb-32">
        <AnimatedBackground />
        <div className="relative z-10">
          <SectionHeading tag="Our People" title="Meet the Team" description="The talented individuals behind every pixel and line of code." />
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search team..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card/60 border-border/60" />
            </div>
            <div className="flex gap-2">
              {filters.map((f) => (
                <Button key={f} variant={filter === f ? "primary" : "outline-subtle"} size="sm" onClick={() => setFilter(f)}>{f}</Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((m, i) => (
              <div
                key={m.name}
                className="team-card animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Avatar — always visible */}
                <div className="team-card-avatar">
                  {m.avatar}
                </div>

                {/* Expandable content */}
                <div className="team-card-body">
                  <div className="team-card-info">
                    <h3 className="font-display font-semibold text-foreground text-base">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </div>

                  <div className="team-card-skills">
                    {m.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-border/30">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button className="team-card-link">
                    Portfolio <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No team members found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Team;