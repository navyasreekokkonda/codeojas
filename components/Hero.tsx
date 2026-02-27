export default function Hero() {
  return (
    <section className="text-center py-24">
      <h1 className="text-5xl font-extrabold mb-6">
        Learn DSA the <span className="text-blue-600">Smart</span> Way
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        CodeOjas uses AI to generate personalized Data Structures & Algorithms
        problems based on your level — beginner to advanced.
      </p>

      <div className="flex justify-center gap-4">
        <span className="px-4 py-2 bg-black text-white rounded">
          AI-Powered
        </span>
        <span className="px-4 py-2 border rounded">
          DSA Focused
        </span>
        <span className="px-4 py-2 border rounded">
          Personalized Learning
        </span>
      </div>
    </section>
  );
}