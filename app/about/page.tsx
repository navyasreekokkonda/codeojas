export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-20">

      {/* Glow background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-10">
          About <span className="text-orange-500">CodeOjas</span>
        </h1>

        {/* Glass Card */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 text-lg leading-relaxed text-gray-300 hover:border-orange-500 transition">

          <p>
            <span className="text-orange-400 font-semibold">CodeOjas</span> is an
            AI-powered coding platform built to solve one major problem:
            repetitive coding practice.
          </p>

          <p className="mt-6">
            Traditional platforms often repeat the same problems again and again.
            CodeOjas changes this by generating fresh coding challenges using AI,
            helping developers truly understand algorithms instead of memorizing
            solutions.
          </p>

          <p className="mt-6">
            The platform combines modern AI tools with a clean coding environment
            so learners can practice Data Structures and Algorithms in a smarter,
            more interactive way.
          </p>

          <p className="mt-6">
            Our mission is simple: make coding practice more intelligent,
            personalized, and effective for every developer.
          </p>

        </div>

      </div>

    </main>
  );
}