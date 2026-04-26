import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 bg-background">
      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight">PixelWeft</Link>
          <h1 className="font-display text-3xl font-bold text-foreground mt-4">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 space-y-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/5 border-border/60 h-12"
          />
          <div className="relative">
            <Input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/5 border-border/60 h-12 pr-10"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <Button variant="primary" className="w-full h-12" type="submit">Sign In</Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-foreground hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
