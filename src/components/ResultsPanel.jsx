import { useState } from 'react';

export default function ResultsPanel({ result, isLoading, loadingMessage }) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Loading state
  if (isLoading || !result) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-institutional-300">
        <h2 className="text-2xl font-semibold text-institutional-900 mb-4 font-mono">
          ALGORITHM RECOMMENDATION
        </h2>
        <div className="border-t-2 border-institutional-200 pt-4">
          <div className="text-center py-8">
            <div className="inline-block">
              <div className="flex items-center gap-3">
                <div className="animate-spin h-5 w-5 border-2 border-institutional-600 border-t-transparent rounded-full"></div>
                <span className="text-institutional-600 font-mono text-sm">
                  {loadingMessage || "Initializing analysis..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { recommendation, status, message, bestScore, excludedOptions } = result;

  const getStatusColor = () => {
    if (status === 'optimal') return 'bg-green-100 border-green-500 text-green-900';
    if (status === 'sociallyAware') return 'bg-blue-100 border-blue-500 text-blue-900';
    if (status === 'normal' && bestScore?.composite >= 70) return 'bg-green-100 border-green-500 text-green-900';
    if (status === 'normal' && bestScore?.composite >= 40) return 'bg-yellow-100 border-yellow-500 text-yellow-900';
    if (status === 'desperate') return 'bg-orange-100 border-orange-500 text-orange-900';
    if (status === 'wait') return 'bg-red-100 border-red-500 text-red-900';
    if (status === 'full') return 'bg-institutional-100 border-institutional-500 text-institutional-900';
    return 'bg-institutional-100 border-institutional-500 text-institutional-900';
  };

  const getComfortMeterColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-green-400';
    if (score >= 40) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  // Detect occupied positions from result data
  const occupiedPositions = result.allScores?.filter(s => s.composite === undefined).map(s => s.position) || [];

  // Special messages for different states
  const getSpecialMessage = () => {
    if (status === 'optimal' && occupiedPositions.length === 0) {
      return {
        title: "🎯 OPTIMAL CONDITIONS DETECTED",
        body: "Congratulations. You have encountered the theoretical ideal state. Select either end position to establish territorial dominance and maximise buffer zone for subsequent arrivals.",
        extra: `Recommended: Position ${recommendation}`,
        highlight: "Comfort Score: Maximum achievable (100)"
      };
    }

    if (status === 'full') {
      return {
        title: "⚠️ FACILITY AT MAXIMUM CAPACITY",
        body: "All positions currently occupied. Available options:",
        list: [
          "1. WAIT — Implement patience-based queuing protocol",
          "2. RETREAT — Seek alternative facilities",
          "3. STALL — Consider enclosed cubicle option"
        ],
        extra: "Estimated wait time: Indeterminate",
        subExtra: "(Dependent on occupant hydration levels)"
      };
    }

    if (status === 'desperate') {
      return {
        title: "⚠️ PROTOCOL ADVISORY",
        body: "All available positions violate ICUP minimum spacing requirements. Proceeding will result in mutual discomfort for you and adjacent occupants.",
        subtitle: "If you must proceed, recommended coping strategies:",
        list: [
          "• Strategic phone focus (appear deeply engrossed)",
          "• The thousand-yard stare (eyes fixed on wall)",
          "• Performative urgency (suggest medical necessity)"
        ],
        extra: `Least bad option: Position ${recommendation} (Score: ${bestScore?.composite})`
      };
    }

    return null;
  };

  const specialMessage = getSpecialMessage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-institutional-300">
      <h2 className="text-2xl font-semibold text-institutional-900 mb-4 font-mono tracking-wide">
        ALGORITHM RECOMMENDATION
      </h2>
      <div className="border-t-2 border-institutional-200"></div>

      {/* Special Message Display */}
      {specialMessage ? (
        <div className="border-4 rounded-lg p-6 mb-4 bg-blue-50 border-blue-500 text-blue-900 mt-4">
          <div className="text-center">
            <div className="text-xl font-bold mb-3">{specialMessage.title}</div>
            <p className="text-sm mb-3">{specialMessage.body}</p>
            {specialMessage.subtitle && (
              <p className="text-sm font-semibold mt-3 mb-2">{specialMessage.subtitle}</p>
            )}
            {specialMessage.list && (
              <div className="text-left max-w-lg mx-auto mt-3 space-y-1">
                {specialMessage.list.map((item, idx) => (
                  <div key={idx} className="text-sm">{item}</div>
                ))}
              </div>
            )}
            {specialMessage.extra && (
              <div className="mt-4 font-semibold text-sm">{specialMessage.extra}</div>
            )}
            {specialMessage.subExtra && (
              <div className="text-xs opacity-75 mt-1">{specialMessage.subExtra}</div>
            )}
            {specialMessage.highlight && (
              <div className="mt-2 text-sm font-bold">{specialMessage.highlight}</div>
            )}
          </div>
        </div>
      ) : (
        /* Normal recommendation */
        <div className={`border-4 rounded-lg p-6 mb-4 ${getStatusColor()} mt-4`}>
          {recommendation !== null ? (
            <div className="text-center">
              <div className="text-sm font-bold mb-2 tracking-wide font-mono">
                {status === 'desperate' ? 'DESPERATE MEASURES' : 'POSITION RECOMMENDED'}
              </div>
              <div className="text-6xl font-bold mb-3 font-mono">#{recommendation}</div>
              <div className="text-sm mt-3 font-mono">
                Status: <span className="font-bold">CLEARED FOR DEPLOYMENT</span>
              </div>
              <div className="text-xs italic mt-2">{message}</div>
              {bestScore && (
                <div className="text-xs mt-3 opacity-75 font-mono">
                  Confidence: {bestScore.composite}% (p &lt; 0.05)
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold mb-3">{message}</div>
            </div>
          )}
        </div>
      )}

      {/* "Don't Be That Guy" Warning */}
      {excludedOptions && excludedOptions.length > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-bold text-orange-900 mb-2">
                ANTISOCIAL CHOICE DETECTED
              </h3>
              <p className="text-sm text-orange-800 mb-2">
                Position{excludedOptions.length > 1 ? 's' : ''} {excludedOptions.map(o => '#' + o.position).join(', ')} would
                maximise YOUR comfort but leave ZERO acceptable options for the next user.
                This violates the Categorical Imperative of Urinal Selection.
              </p>
              <p className="text-xs text-orange-700 italic mt-2">
                "Act only according to that maxim whereby you can, at the same time, will that it should
                become a universal law." — Kant (probably thinking about urinals)
              </p>
              <div className="mt-3 text-xs text-orange-800">
                <strong>Why excluded:</strong> These positions create a "bathroom tragedy of the commons"
                where individual optimisation leads to collective misery.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comfort Score Meter */}
      {bestScore && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-institutional-700">
              Comfort Score
            </span>
            <span className="text-2xl font-bold text-institutional-900">
              {bestScore.composite}/100
            </span>
          </div>

          {/* Visual meter */}
          <div className="w-full bg-institutional-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full ${getComfortMeterColor(bestScore.composite)} transition-all duration-500`}
              style={{ width: `${bestScore.composite}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-institutional-500 mt-1">
            <span>Critical</span>
            <span>Suboptimal</span>
            <span>Acceptable</span>
            <span>Optimal</span>
          </div>
        </div>
      )}

      {/* Score Breakdown Toggle */}
      {bestScore && (
        <div>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full bg-institutional-100 hover:bg-institutional-200 text-institutional-800 font-medium py-2 px-4 rounded-md transition-colours duration-200 flex items-center justify-between"
          >
            <span>View Scoring Factor Breakdown</span>
            <span className="text-xl">{showBreakdown ? '−' : '+'}</span>
          </button>

          {showBreakdown && (
            <div className="mt-4 space-y-3 bg-institutional-50 p-4 rounded-lg">
              <div className="text-sm font-semibold text-institutional-900 mb-3">
                Contributing Factors (Position #{recommendation})
              </div>

              {/* Proximity Factor */}
              <div className="border-l-4 border-institutional-400 pl-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-institutional-700">
                    Proximity to Occupied Urinals
                  </span>
                  <span className="text-lg font-bold text-institutional-900">
                    {bestScore.breakdown.proximity}/100
                  </span>
                </div>
                <div className="text-xs text-institutional-600">
                  Weight: 30% • Based on Middlemist et al. (1976)
                </div>
                <div className="w-full bg-institutional-200 rounded-full h-2 mt-1">
                  <div
                    className="h-full bg-institutional-600 rounded-full"
                    style={{ width: `${bestScore.breakdown.proximity}%` }}
                  ></div>
                </div>
              </div>

              {/* Edge Position Factor */}
              <div className="border-l-4 border-institutional-400 pl-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-institutional-700">
                    Edge Position Preference
                  </span>
                  <span className="text-lg font-bold text-institutional-900">
                    {bestScore.breakdown.edge}/100
                  </span>
                </div>
                <div className="text-xs text-institutional-600">
                  Weight: 20% • Based on Kranakis & Krizanc (2010)
                </div>
                <div className="w-full bg-institutional-200 rounded-full h-2 mt-1">
                  <div
                    className="h-full bg-institutional-600 rounded-full"
                    style={{ width: `${bestScore.breakdown.edge}%` }}
                  ></div>
                </div>
              </div>

              {/* Collective Welfare Factor */}
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-institutional-700">
                    Collective Welfare Score
                  </span>
                  <span className="text-lg font-bold text-institutional-900">
                    {bestScore.breakdown.collectiveWelfare}/100
                  </span>
                </div>
                <div className="text-xs text-institutional-600 mb-2">
                  Weight: 35% • Based on cooperative game theory & rule utilitarianism
                </div>
                <div className="w-full bg-institutional-200 rounded-full h-2 mb-3">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${bestScore.breakdown.collectiveWelfare}%` }}
                  ></div>
                </div>

                {/* Sub-components */}
                <div className="ml-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-institutional-600">├─ Next User Viability:</span>
                    <span className="font-semibold text-institutional-800">
                      {Math.round(bestScore.breakdown.collectiveWelfareDetails.nextUserViability.score)}/100
                    </span>
                  </div>
                  <div className="text-institutional-500 ml-3 text-xs">
                    ({bestScore.breakdown.collectiveWelfareDetails.nextUserViability.acceptable} acceptable urinal{bestScore.breakdown.collectiveWelfareDetails.nextUserViability.acceptable !== 1 ? 's' : ''} remain{bestScore.breakdown.collectiveWelfareDetails.nextUserViability.acceptable === 1 ? 's' : ''} for next user)
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-institutional-600">├─ Two-User Lookahead:</span>
                    <span className="font-semibold text-institutional-800">
                      {Math.round(bestScore.breakdown.collectiveWelfareDetails.twoUserLookahead.score)}/100
                    </span>
                  </div>
                  <div className="text-institutional-500 ml-3 text-xs">
                    ({bestScore.breakdown.collectiveWelfareDetails.twoUserLookahead.maxSecondUserOptions} option{bestScore.breakdown.collectiveWelfareDetails.twoUserLookahead.maxSecondUserOptions !== 1 ? 's' : ''} for third user)
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-institutional-600">└─ Symmetry Preservation:</span>
                    <span className="font-semibold text-institutional-800">
                      {Math.round(bestScore.breakdown.collectiveWelfareDetails.symmetryPreservation.score)}/100
                    </span>
                  </div>
                  <div className="text-institutional-500 ml-3 text-xs">
                    (Gap distribution: {bestScore.breakdown.collectiveWelfareDetails.symmetryPreservation.gaps.join(', ')})
                  </div>
                </div>
              </div>

              {/* Buffer Zone Factor */}
              <div className="border-l-4 border-institutional-400 pl-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-institutional-700">
                    Buffer Zone Compliance
                  </span>
                  <span className="text-lg font-bold text-institutional-900">
                    {bestScore.breakdown.buffer}/100
                  </span>
                </div>
                <div className="text-xs text-institutional-600">
                  Weight: 15% • Based on ICUP protocol
                </div>
                <div className="w-full bg-institutional-200 rounded-full h-2 mt-1">
                  <div
                    className="h-full bg-institutional-600 rounded-full"
                    style={{ width: `${bestScore.breakdown.buffer}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
