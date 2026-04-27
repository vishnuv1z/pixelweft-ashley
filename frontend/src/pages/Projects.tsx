import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const allProjects = [
  { title: "NeuralVault", category: "AI/ML", year: "2025", desc: "Enterprise AI analytics platform with predictive insights and natural language querying.", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" },
  { title: "SwiftCart", category: "Mobile App", year: "2024", desc: "E-commerce app with AR product preview, real-time tracking, and seamless payments.", image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop" },
  { title: "CloudSync Pro", category: "Web Dev", year: "2025", desc: "Collaboration suite with real-time editing, video conferencing, and project management.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" },
  { title: "HealthPulse", category: "AI/ML", year: "2024", desc: "AI-powered health monitoring system with predictive diagnostics and telemedicine.", image: "https://thumbs.dreamstime.com/b/health-control-application-smartphone-pulse-arterial-pressure-concept-modern-medical-technology-131215608.jpg" },
  { title: "UrbanFlow", category: "Mobile App", year: "2024", desc: "Smart city navigation app with real-time transit data and accessibility features.", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop" },
  { title: "DevForge", category: "Web Dev", year: "2025", desc: "Developer productivity platform with CI/CD pipelines and code analytics.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" },
];

const categories = ["All", "Web Dev", "Mobile App", "AI/ML"];

const Projects = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = allProjects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <Layout>
      {/* pt-32 = top padding, pb-32 = bottom padding — change values as needed */}
      <section className="relative section-padding pt-52 pb-32">
        <AnimatedBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <SectionHeading tag="Portfolio" title="Our Projects" description="Explore the digital products we've crafted for our clients." />
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card/60 border-border/60"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "primary" : "outline-subtle"}
                  size="sm"
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* Staggered Grid */}
          <div className="staggered-grid">
            {filtered.map((p, i) => (
              <div key={p.title} className="project-card animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="project-card-preview group overflow-hidden relative">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[600ms] ease-out" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                </div>
                <div className="project-card-meta">
                  <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{p.category}</span>
                    <span className="text-xs text-muted-foreground/50">•</span>
                    <span className="text-xs text-muted-foreground">{p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No projects found matching your criteria.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;