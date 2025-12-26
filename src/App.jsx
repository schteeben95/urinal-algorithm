import { useState, useEffect } from 'react';
import Header from './components/Header';
import ConfigurationPanel from './components/ConfigurationPanel';
import UrinalDisplay from './components/UrinalDisplay';
import ResultsPanel from './components/ResultsPanel';
import SciencePanel from './components/SciencePanel';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { findBestUrinal } from './urinalAlgorithm';

const LOADING_MESSAGES = [
  "Analysing proxemic vectors...",
  "Consulting behavioural psychology literature...",
  "Computing Nash equilibrium...",
  "Applying Kantian ethics framework...",
  "Calibrating social anxiety coefficients...",
  "Measuring interpersonal distance matrices...",
  "Factoring in splash-back dynamics...",
  "Evaluating collective welfare implications...",
  "Cross-referencing Middlemist et al. (1976)...",
  "Optimising for minimum awkwardness...",
];

function App() {
  const [urinalCount, setUrinalCount] = useState(5);
  const [occupiedPositions, setOccupiedPositions] = useState([]);
  const [hasDividers, setHasDividers] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showMiddlemistModal, setShowMiddlemistModal] = useState(false);
  const [showAdversarialModal, setShowAdversarialModal] = useState(false);

  // Recalculate whenever configuration changes with artificial delay for comedic effect
  useEffect(() => {
    setIsLoading(true);

    // Pick a random loading message
    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    setLoadingMessage(randomMessage);

    // Add artificial delay (300-400ms)
    const delay = 300 + Math.random() * 100;

    const timer = setTimeout(() => {
      const calculatedResult = findBestUrinal(urinalCount, occupiedPositions, hasDividers);
      setResult(calculatedResult);
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [urinalCount, occupiedPositions, hasDividers]);

  const handleUrinalCountChange = (newCount) => {
    setUrinalCount(newCount);
    // Remove any occupied positions that are now out of range
    setOccupiedPositions(prev => prev.filter(pos => pos <= newCount));
  };

  const handleToggleOccupied = (position) => {
    setOccupiedPositions(prev => {
      if (prev.includes(position)) {
        // Unoccupy this position
        return prev.filter(pos => pos !== position);
      } else {
        // Occupy this position
        return [...prev, position].sort((a, b) => a - b);
      }
    });
  };

  const handleReset = () => {
    setUrinalCount(5);
    setOccupiedPositions([]);
    setHasDividers(false);
  };

  // Easter egg detection: Middlemist study configuration
  const isMiddlemistConfig = urinalCount === 3 &&
                            occupiedPositions.length === 1 &&
                            occupiedPositions[0] === 2;

  // Easter egg detection: Adversarial configuration (alternating occupied/empty)
  const isAdversarialConfig = () => {
    if (occupiedPositions.length < 2 || urinalCount < 4) return false;

    // Check if positions follow an alternating pattern (e.g., 1, 3, 5 or 2, 4, 6)
    const sorted = [...occupiedPositions].sort((a, b) => a - b);
    let isAlternating = true;

    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i + 1] - sorted[i] !== 2) {
        isAlternating = false;
        break;
      }
    }

    // Also check if it's creating maximum discomfort (many occupied with tight spacing)
    const occupancyRatio = occupiedPositions.length / urinalCount;
    return isAlternating && occupancyRatio >= 0.4;
  };

  const showAdversarialWarning = isAdversarialConfig();

  // Trigger modals when easter eggs are detected
  useEffect(() => {
    if (isMiddlemistConfig) {
      setShowMiddlemistModal(true);
    }
  }, [isMiddlemistConfig]);

  useEffect(() => {
    if (showAdversarialWarning) {
      setShowAdversarialModal(true);
    }
  }, [showAdversarialWarning]);

  return (
    <div className="min-h-screen bg-institutional-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        <ConfigurationPanel
          urinalCount={urinalCount}
          onUrinalCountChange={handleUrinalCountChange}
          hasDividers={hasDividers}
          onDividersChange={setHasDividers}
          onReset={handleReset}
        />

        <UrinalDisplay
          totalUrinals={urinalCount}
          occupiedPositions={occupiedPositions}
          scores={result?.allScores || result?.scores}
          recommendation={result?.recommendation}
          onToggleOccupied={handleToggleOccupied}
        />

        <ResultsPanel result={result} isLoading={isLoading} loadingMessage={loadingMessage} />

        <SciencePanel />
      </main>

      <Footer />

      {/* Easter Egg Modals */}
      <Modal
        isOpen={showMiddlemistModal}
        onClose={() => setShowMiddlemistModal(false)}
        type="info"
      >
        <div className="text-yellow-900">
          <p className="text-lg font-bold mb-3">
            🔬 HISTORICAL CONFIGURATION DETECTED
          </p>
          <p className="text-sm mb-3">
            You have recreated the experimental setup from Middlemist, Knowles & Matter (1976) — the foundational
            study of lavatory proxemics published in the <em>Journal of Personality and Social Psychology</em>.
          </p>
          <p className="text-xs opacity-75">
            Expected effect: 75% increase in micturition onset delay. Recommendation: Position 1 or 3 (maintain maximum buffer).
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showAdversarialModal}
        onClose={() => setShowAdversarialModal(false)}
        type="danger"
      >
        <div className="text-red-900">
          <p className="text-lg font-bold mb-3">
            😰 ADVERSARIAL CONFIGURATION DETECTED
          </p>
          <p className="text-sm mb-3">
            This arrangement appears designed to maximise discomfort. If you encounter this in the wild, consider:
          </p>
          <ul className="text-sm ml-4 space-y-1">
            <li>• The possibility of deliberate psychological warfare</li>
            <li>• Waiting for improved conditions</li>
            <li>• Lifestyle changes that reduce bathroom frequency</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default App;
