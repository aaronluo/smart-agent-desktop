"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center">
      <div style={{ width: "100%", maxWidth: 380 }}>
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-midnight mb-2">
            Smart Agent
          </h1>
          <p className="text-midnight-100 text-sm">Enterprise AI Desktop</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-canvas-200">
          <h2 className="font-display text-xl font-semibold text-midnight mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-midnight mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@dxc.com"
                className="w-full px-4 py-3 rounded-lg border border-canvas-200 bg-canvas text-midnight placeholder:text-midnight-100/50 focus:outline-none focus:ring-2 focus:ring-true-blue/30 focus:border-true-blue transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-midnight mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-canvas-200 bg-canvas text-midnight placeholder:text-midnight-100/50 focus:outline-none focus:ring-2 focus:ring-true-blue/30 focus:border-true-blue transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-midnight text-white font-semibold rounded-lg hover:bg-midnight-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-midnight-100/60 text-xs mt-8">
          Powered by DXC Technology
        </p>
      </div>
    </main>
  );
}
