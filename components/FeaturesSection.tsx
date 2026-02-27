import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why CodeOjas?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon="🧠"
          title="AI-Powered Learning"
          description="Generate personalized DSA problems instantly using advanced AI models."
        />

        <FeatureCard
          icon="🎯"
          title="Level-Based Practice"
          description="Beginner, Intermediate, or Advanced — problems adapt to your skill level."
        />

        <FeatureCard
          icon="🚀"
          title="Interview Focused"
          description="Designed to help you crack coding interviews with smart problem generation."
        />
      </div>
    </section>
  );
}