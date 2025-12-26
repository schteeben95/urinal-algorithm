import { getScoreTier } from '../urinalAlgorithm';
import { UrinalIcon, WallPattern } from './UrinalSVG';

function getScoreLabel(score) {
  if (score >= 90) return { label: 'OPTIMAL', color: 'text-green-600' };
  if (score >= 70) return { label: 'ACCEPTABLE', color: 'text-green-600' };
  if (score >= 40) return { label: 'SUBOPTIMAL', color: 'text-yellow-600' };
  if (score >= 20) return { label: 'INADVISABLE', color: 'text-red-600' };
  return { label: 'CRITICAL', color: 'text-red-700' };
}

function Urinal({ position, isOccupied, score, isRecommended, onClick }) {
  const tier = score ? getScoreTier(score.composite) : null;
  const scoreLabel = score ? getScoreLabel(score.composite) : null;

  return (
    <div className="flex flex-col items-center group relative flex-shrink-0" style={{ height: '220px', minWidth: '80px' }}>
      {/* Recommendation badge - absolutely positioned */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 h-6">
        {isRecommended && !isOccupied && (
          <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse whitespace-nowrap">
            BEST
          </div>
        )}
      </div>

      {/* Main urinal container - fixed position */}
      <div className="absolute top-6">
        <div
          onClick={onClick}
          className="cursor-pointer transition-all duration-200 relative"
          title={
            isOccupied
              ? `Position ${position}: Occupied - Click to unoccupy`
              : score
              ? `Position ${position}: Score ${score.composite}/100 - Click to occupy`
              : `Position ${position}: Click to toggle occupancy`
          }
        >
          {/* SVG Urinal */}
          <div className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 transform group-hover:scale-105 transition-transform">
            <UrinalIcon
              isOccupied={isOccupied}
              isRecommended={isRecommended}
              scoreTier={tier}
            />
          </div>

          {/* Position number overlay */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
            <div className={`text-xs font-bold ${isOccupied ? 'text-gray-500' : 'text-institutional-700'} bg-white px-2 py-0.5 rounded border border-institutional-300`}>
              #{position}
            </div>
          </div>
        </div>
      </div>

      {/* Status label and score - absolutely positioned below */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center" style={{ width: '80px' }}>
        {isOccupied ? (
          <div className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-300 inline-block">
            OCCUPIED
          </div>
        ) : score ? (
          <>
            <div className="text-xs text-institutional-500 font-mono mb-0.5">
              ────
            </div>
            <div className="text-xl sm:text-2xl font-bold text-institutional-900 font-mono">
              {score.composite}
            </div>
            <div className={`text-xs font-bold mt-0.5 ${scoreLabel.color} whitespace-nowrap`}>
              {scoreLabel.label}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default function UrinalDisplay({
  totalUrinals,
  occupiedPositions,
  scores,
  recommendation,
  onToggleOccupied
}) {
  const urinals = Array.from({ length: totalUrinals }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-institutional-900 mb-4 text-center">
        Restroom Configuration
      </h2>

      <div className="w-full mb-4 overflow-x-auto">
        <div className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-8 ${totalUrinals > 7 ? 'min-w-min' : 'min-w-fit justify-center'}`}>
          {/* Left wall */}
          <WallPattern side="left" className="w-6 h-48 rounded-l-lg flex-shrink-0" />

          {/* Urinals */}
          {urinals.map(position => {
            const isOccupied = occupiedPositions.includes(position);
            const score = scores?.find(s => s.position === position);
            const isRecommended = recommendation === position;

            return (
              <Urinal
                key={position}
                position={position}
                isOccupied={isOccupied}
                score={score}
                isRecommended={isRecommended}
                onClick={() => onToggleOccupied(position)}
              />
            );
          })}

          {/* Right wall */}
          <WallPattern side="right" className="w-6 h-48 rounded-r-lg flex-shrink-0" />
        </div>
      </div>

      {totalUrinals > 7 && (
        <div className="text-center text-xs text-institutional-500 mb-2 italic">
          ← Scroll horizontally to view all urinals →
        </div>
      )}

      <div className="text-center text-sm text-institutional-600 italic">
        Click on any urinal to toggle occupancy status
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-institutional-200">
        <div className="text-sm font-semibold text-institutional-700 mb-2 text-center">Legend:</div>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 border-2 border-red-700 rounded"></div>
            <span className="text-institutional-700">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-400 border-2 border-green-600 rounded"></div>
            <span className="text-institutional-700">Recommended (Best Choice)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-200 border-2 border-green-500 rounded"></div>
            <span className="text-institutional-700">Good (≥70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-200 border-2 border-yellow-500 rounded"></div>
            <span className="text-institutional-700">Acceptable (40-69)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-200 border-2 border-red-500 rounded"></div>
            <span className="text-institutional-700">Avoid (&lt;40)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
