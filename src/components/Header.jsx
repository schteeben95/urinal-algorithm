import { useState } from 'react';

export default function Header() {
  const [showPeerReviewTooltip, setShowPeerReviewTooltip] = useState(false);

  return (
    <header className="bg-institutional-800 text-white py-8 px-4 shadow-lg border-b-4 border-institutional-600">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              THE URINAL ALGORITHM
            </h1>
          </div>
          <div className="text-right">
            <div className="text-institutional-300 text-sm font-mono">
              v2.3.1
            </div>
          </div>
        </div>

        <p className="text-institutional-200 text-lg md:text-xl italic mb-4">
          Applying Rigorous Science to Life's Most Awkward Decisions
        </p>

        <div className="flex items-center justify-center">
          <div className="relative inline-block">
            <div
              className="inline-flex items-center gap-2 bg-institutional-700 border-2 border-institutional-500 px-3 py-1 rounded-md cursor-help"
              onMouseEnter={() => setShowPeerReviewTooltip(true)}
              onMouseLeave={() => setShowPeerReviewTooltip(false)}
            >
              <span className="text-xs font-bold tracking-wide text-green-400">
                PEER REVIEWED
              </span>
              <span className="text-institutional-300 text-xs">*</span>
            </div>

            {showPeerReviewTooltip && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-institutional-900 border-2 border-institutional-600 text-institutional-200 text-xs px-3 py-2 rounded-md whitespace-nowrap z-10 shadow-lg">
                * Reviewed by Dave from accounting
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-institutional-600"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
