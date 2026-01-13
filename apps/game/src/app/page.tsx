import { Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Sparkles, Gamepad2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GameLandingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden">
          <div className="relative z-10 container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="h-4 w-4" />
              <span>Growth Lab</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Master the Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Growth Strategy</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Immersive simulations to test your product, marketing, and leadership skills in real-time scenarios.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-purple-900/20 bg-foreground text-background hover:bg-foreground/90" asChild>
                <Link href="/game/1">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Start Simulation
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-white/10 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm" asChild>
                <Link href="#games">
                  Browse Games
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Available Games Grid */}
        <section id="games" className="py-20 px-6 border-t border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Available Modules</h2>
              <span className="text-sm text-muted-foreground">1 Active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Default Simulation */}
              <div className="group relative rounded-3xl p-1 transition-all hover:shadow-2xl hover:shadow-purple-900/20">
                <div className={cn(
                  "absolute inset-0 rounded-3xl transition-opacity opacity-0 group-hover:opacity-100",
                  "bg-gradient-to-br from-purple-500/30 via-transparent to-transparent"
                )} />

                <div className="relative glass-panel rounded-[1.3rem] h-full flex flex-col p-6 overflow-hidden transition-colors group-hover:bg-white/10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-900/40">
                    <Gamepad2 className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">Startup Simulation</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    Manage budget, marketing channels, and product development in a competitive turn-based environment.
                  </p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-6 w-6 rounded-full border border-black bg-white/10" />
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-purple-400 hover:text-purple-300" asChild>
                      <Link href="/game/1">
                        Play Now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Card 2: Coming Soon */}
              <div className="glass-panel p-6 rounded-3xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles className="h-6 w-6 text-white/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">Crisis Management</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Navigate PR disasters and operational failures in this high-stakes decision making module.
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-muted-foreground border border-white/10">
                  Coming Soon
                </span>
              </div>

              {/* Card 3: New Module */}
              <div className="glass-panel p-6 rounded-3xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles className="h-6 w-6 text-white/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">Product Launch</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Execute a perfect GTM strategy from pre-launch hype to Day 1 retention metrics.
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-muted-foreground border border-white/10">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
