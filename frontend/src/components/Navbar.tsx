import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
      <nav
        className="pointer-events-auto rounded-2xl border border-white/[0.08] overflow-hidden"
        style={{
          width: "100%",
          maxWidth: scrolled ? "860px" : "1280px",
          background: scrolled
            ? "rgba(12, 12, 12, 0.65)"
            : "rgba(12, 12, 12, 0.45)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04)"
            : "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
          transition: "max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease, box-shadow 0.5s ease",
        }}
      >
        <div className="px-5 md:px-6 h-14 flex items-center justify-between relative">
          {/* Logo — Left */}
          <Link to="/" className="font-display text-lg font-bold text-foreground tracking-tight shrink-0">
            PixelWeft
          </Link>

          {/* Desktop Nav — Absolute Center */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-[45%]">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "text-foreground bg-white/[0.08]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth — Right */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 px-3 text-xs" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="primary" size="sm" className="h-8 px-4 text-xs rounded-lg" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/[0.06] px-5 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-foreground bg-white/[0.08]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-white/[0.06] mt-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground h-8 text-xs" asChild>
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              </Button>
              <Button variant="primary" size="sm" className="h-8 text-xs rounded-lg" asChild>
                <Link to="/register" onClick={() => setOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
