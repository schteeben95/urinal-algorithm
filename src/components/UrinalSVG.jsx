// SVG component for urinal visualization

export function UrinalIcon({ isOccupied, isRecommended, scoreTier, className = '' }) {
  const getUrinalColor = () => {
    if (isOccupied) return '#9ca3af'; // grey
    if (isRecommended) return '#4ade80'; // green
    if (scoreTier === 'recommended') return '#86efac';
    if (scoreTier === 'acceptable') return '#fde047';
    if (scoreTier === 'avoid') return '#fca5a5';
    return '#e5e7eb'; // default grey
  };

  const urinalColor = getUrinalColor();
  const strokeColor = isOccupied ? '#6b7280' : isRecommended ? '#16a34a' : '#9ca3af';

  return (
    <svg
      viewBox="0 0 100 120"
      className={`${className} ${isRecommended ? 'animate-pulse-glow' : ''}`}
      style={{ filter: isRecommended ? 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.4))' : 'none' }}
    >
      {/* Urinal body */}
      <path
        d="M 30 10
           L 70 10
           Q 75 10, 75 15
           L 75 80
           Q 75 90, 70 95
           L 55 110
           Q 50 115, 45 110
           L 30 95
           Q 25 90, 25 80
           L 25 15
           Q 25 10, 30 10 Z"
        fill={urinalColor}
        stroke={strokeColor}
        strokeWidth="2"
        opacity={isOccupied ? "0.5" : "1"}
      />

      {/* Drain circle */}
      <circle
        cx="50"
        cy="70"
        r="6"
        fill="#374151"
        opacity={isOccupied ? "0.3" : "0.6"}
      />

      {/* Flush pipe */}
      <rect
        x="48"
        y="105"
        width="4"
        height="10"
        fill={strokeColor}
        opacity={isOccupied ? "0.4" : "0.7"}
      />

      {/* Person silhouette if occupied */}
      {isOccupied && (
        <g opacity="0.9">
          {/* Head */}
          <circle cx="50" cy="25" r="8" fill="#1f2937" />
          {/* Shoulders/body */}
          <path
            d="M 35 35
               L 35 55
               L 40 55
               L 40 40
               L 60 40
               L 60 55
               L 65 55
               L 65 35
               Q 65 32, 62 30
               L 50 28
               L 38 30
               Q 35 32, 35 35 Z"
            fill="#1f2937"
          />
        </g>
      )}
    </svg>
  );
}

export function WallPattern({ side = 'left', className = '' }) {
  return (
    <div className={`${className} bg-institutional-400 relative overflow-hidden`}>
      {/* Tile pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #334e68 1px, transparent 1px),
            linear-gradient(180deg, #334e68 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs text-institutional-700 font-bold transform -rotate-90 whitespace-nowrap">
          WALL
        </span>
      </div>
    </div>
  );
}
