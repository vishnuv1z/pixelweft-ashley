import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client" });
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 bg-background">
      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight">PixelWeft</Link>
          <h1 className="font-display text-3xl font-bold text-foreground mt-4">Create Account</h1>
          <p className="text-muted-foreground">Join PixelWeft today</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 space-y-5">
          <Input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="bg-white/5 border-border/60 h-12"
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="bg-white/5 border-border/60 h-12"
          />
          <div className="relative">
            <Input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="bg-white/5 border-border/60 h-12 pr-10"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Role selector */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">I am a:</p>
            <div className="grid grid-cols-2 gap-3">
              {(["client", "developer"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setForm({ ...form, role })}
                  className={`py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    form.role === role
                      ? "border-foreground/30 bg-white/10 text-foreground"
                      : "border-border/40 bg-white/5 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {role === "client" ? "Client" : "Developer"}
                </button>
              ))}
            </div>
          </div>

          <Button variant="primary" className="w-full h-12" type="submit">Create Account</Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
