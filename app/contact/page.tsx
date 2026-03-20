export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-20">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]"></div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-12">
          Contact <span className="text-orange-500">CodeOjas</span>
        </h1>

        {/* Contact Card */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-orange-500 transition">

          <p className="text-gray-300 mb-8 text-center">
            Have questions, feedback, or ideas? Send us a message and we’ll get back to you.
          </p>

          {/* Form */}
          <form className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-black border border-white/10 focus:border-orange-500 outline-none text-gray-200"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-black border border-white/10 focus:border-orange-500 outline-none text-gray-200"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 rounded-lg bg-black border border-white/10 focus:border-orange-500 outline-none text-gray-200"
            />

            <button
              type="submit"
              className="
              w-full
              py-3
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r
              from-orange-500
              via-orange-400
              to-yellow-500
              bg-[length:200%_200%]
              animate-[gradientMove_4s_ease_infinite]
              shadow-lg shadow-orange-500/30
              hover:scale-105
              transition
              "
            >
              🚀 Send Message
            </button>

          </form>

        </div>

      </div>
    </main>
  );
}