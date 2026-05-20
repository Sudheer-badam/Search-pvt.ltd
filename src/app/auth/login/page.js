"use client";

import React from "react";
import Link from "next/link";
import { Search, Mail, Lock, Code, Globe, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result.ok) {
        router.push("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error(error);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-6 bg-[url('/grid.svg')] bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Search className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Search Pvt.Ltd</span>
            </Link>
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Access your business intelligence dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border-border focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/50 border-border focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Sign In to Platform
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground font-bold">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleSocialLogin("google")}
              disabled={socialLoading === "google"}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-bold disabled:opacity-50"
            >
              {socialLoading === "google" ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <Globe className="w-5 h-5 text-rose-500" /> Google
                </>
              )}
            </button>
            <button 
              onClick={() => handleSocialLogin("github")}
              disabled={socialLoading === "github"}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-bold disabled:opacity-50"
            >
              {socialLoading === "github" ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <Code className="w-5 h-5" /> Github
                </>
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account? <Link href="/auth/signup" className="text-primary font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
