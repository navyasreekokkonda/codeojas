export default function Hero() {
  return (
    <section className="text-center py-28 px-6">

      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
        Learn DSA the{" "}
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Smart Way
        </span>
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        CodeOjas uses AI to generate personalized Data Structures & Algorithms
        problems based on your level — beginner to advanced.
      </p>

      {/* CTA BUTTON */}
      <div className="flex justify-center mb-10">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition">
          Start Practicing 🚀
        </button>
      </div>

      {/* FEATURE BADGES */}
      <div className="flex flex-wrap justify-center gap-4">

        <span className="px-5 py-2 bg-black text-white rounded-full shadow hover:scale-105 transition">
          🤖 AI-Powered
        </span>

        <span className="px-5 py-2 border rounded-full hover:bg-gray-100 transition">
          📚 DSA Focused
        </span>

        <span className="px-5 py-2 border rounded-full hover:bg-gray-100 transition">
          🎯 Personalized Learning
        </span>

      </div>

    </section>
  );
}