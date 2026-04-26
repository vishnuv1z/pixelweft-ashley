import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/40 bg-background">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <span className="font-display text-xl font-bold text-foreground tracking-tight">PixelWeft</span>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We weave pixels into reality. A premium digital agency building the future, one project at a time.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Navigation</h4>
          {["About", "Projects", "Team", "Contact"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
              {item}
            </Link>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Legal</h4>
          <span className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">Terms & Conditions</span>
          <span className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">Privacy Policy</span>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Connect</h4>
          <a href="mailto:hello@pixelweft.com" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            hello@pixelweft.com
          </a>
          <div className="flex gap-4 pt-1">
            {["Twitter", "GitHub", "LinkedIn"].map((s) => (
              <span key={s} className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PixelWeft. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
