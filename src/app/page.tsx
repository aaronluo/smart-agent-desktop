export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="bg-white border-b border-canvas-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold uppercase tracking-wide text-midnight">
            Smart Agent Desktop
          </h1>
          <nav className="flex gap-8">
            <a href="/dashboard" className="text-sm font-medium text-midnight-100 hover:text-true-blue">
              Dashboard
            </a>
            <a href="/agents" className="text-sm font-medium text-midnight-100 hover:text-true-blue">
              Agents
            </a>
            <a href="/settings" className="text-sm font-medium text-midnight-100 hover:text-true-blue">
              Settings
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-midnight text-white px-8 py-24">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Powered by AI
          </div>
          <h2 className="font-display text-4xl font-medium uppercase tracking-wide mb-6">
            Built for What's Next
          </h2>
          <p className="text-canvas-300 text-lg leading-relaxed">
            Enterprise AI agents designed to accelerate your digital transformation.
            Intelligent automation meets human expertise.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="px-8 py-16">
        <h3 className="font-display text-2xl font-medium uppercase tracking-wide mb-8">
          Core Capabilities
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Autonomous Operations",
              desc: "AI-driven automation frameworks that reduce costs and optimize efficiency.",
              badge: "AI Platform",
            },
            {
              title: "Human in the Loop",
              desc: "Augmented intelligence that enhances human decision-making.",
              badge: "Augmented",
            },
            {
              title: "Global Scale",
              desc: "70+ countries, 24/7 support, local expertise with worldwide reach.",
              badge: "Enterprise",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-true-blue/10 text-royal text-xs font-semibold tracking-wider uppercase mb-4">
                {card.badge}
              </span>
              <h4 className="font-display text-lg font-semibold mb-2">{card.title}</h4>
              <p className="text-midnight-100 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
