export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">CodeOjas</h2>
          <p className="mt-2 text-sm text-gray-400">
            AI-powered platform to learn, practice, and master coding with
            real-world intelligence.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Features</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* THub / Pitch */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Built For</h3>
          <p className="text-sm text-gray-400">
            🎓 Students & Developers 
            <br />
            🤖 AI / GenAI Hackathons  
            <br />
            💼 Recruiter-ready startup
          </p>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} CodeOjas. All rights reserved.
      </div>
    </footer>
  );
}