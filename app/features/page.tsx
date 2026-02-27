import FeatureCard from "@/components/FeatureCard";

export default function FeaturesPage() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Why <span className="text-indigo-400">CodeOjas</span>?
        </h1>

        <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
          CodeOjas is not just another coding platform. It’s an intelligent,
          AI-driven system built for real learning and real careers.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon="🤖"
            title="AI-Generated Problems"
            description="Dynamic coding problems generated using AI based on difficulty, topic, and user skill level."
          />

          <FeatureCard
            icon="🧠"
            title="Personalized Learning"
            description="Each learner gets a custom learning path powered by AI feedback and performance analysis."
          />

          <FeatureCard
            icon="⚡"
            title="Real-World Focus"
            description="Problems inspired by real industry scenarios, not repetitive textbook questions."
          />
        </div>

      </div>
    </section>
  );
}