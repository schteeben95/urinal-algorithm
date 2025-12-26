export default function Footer() {
  return (
    <footer className="bg-institutional-800 text-institutional-200 py-8 px-4 mt-8 border-t-4 border-institutional-600">
      <div className="max-w-6xl mx-auto">
        <div className="border-2 border-institutional-600 rounded-lg p-6 bg-institutional-900">
          <div className="text-center space-y-3">
            <div className="text-xs font-mono text-institutional-400 mb-4 overflow-hidden">
              <div className="hidden sm:block">─────────────────────────────────────────────────────────────</div>
              <div className="sm:hidden">───────────────────────</div>
            </div>

            <p className="text-sm">
              <strong className="text-white font-mono">DISCLAIMER:</strong> For entertainment and educational purposes.
            </p>

            <p className="text-xs leading-relaxed max-w-2xl mx-auto">
              Not responsible for bathroom-related social incidents, interpersonal awkwardness,
              or paruresis exacerbation. Results may vary based on individual comfort thresholds
              and cultural context.
            </p>

            <p className="text-xs italic opacity-75 mt-4">
              Optimised for field deployment. Discrete consultation recommended.
            </p>

            <div className="text-xs font-mono text-institutional-400 mt-4 mb-4 overflow-hidden">
              <div className="hidden sm:block">─────────────────────────────────────────────────────────────</div>
              <div className="sm:hidden">───────────────────────</div>
            </div>

            <p className="text-xs opacity-50">
              All research cited is genuine. The absurdity lies not in the science,
              but in applying it to urinal selection.
            </p>

            <p className="text-xs opacity-50 mt-2">
              Built with rigorous academic standards and questionable life priorities.
            </p>

            <div className="mt-6 text-xs text-institutional-400">
              © {new Date().getFullYear()} Steven X. Han
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
