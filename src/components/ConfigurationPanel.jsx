export default function ConfigurationPanel({
  urinalCount,
  onUrinalCountChange,
  hasDividers,
  onDividersChange,
  onReset
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-institutional-900 mb-4">
        Configuration Parameters
      </h2>

      <div className="space-y-6">
        {/* Urinal Count Slider */}
        <div>
          <label
            htmlFor="urinal-count"
            className="block text-sm font-medium text-institutional-700 mb-2"
          >
            Number of Urinals: <span className="text-institutional-900 font-bold">{urinalCount}</span>
          </label>
          <input
            id="urinal-count"
            type="range"
            min="2"
            max="10"
            value={urinalCount}
            onChange={(e) => onUrinalCountChange(parseInt(e.target.value))}
            className="w-full h-2 bg-institutional-200 rounded-lg appearance-none cursor-pointer accent-institutional-600"
          />
          <div className="flex justify-between text-xs text-institutional-500 mt-1">
            <span>2</span>
            <span>10</span>
          </div>
        </div>

        {/* Dividers Toggle */}
        <div className="flex items-center">
          <input
            id="dividers"
            type="checkbox"
            checked={hasDividers}
            onChange={(e) => onDividersChange(e.target.checked)}
            className="w-4 h-4 text-institutional-600 bg-institutional-100 border-institutional-300 rounded focus:ring-institutional-500"
          />
          <label
            htmlFor="dividers"
            className="ml-2 text-sm font-medium text-institutional-700"
          >
            Privacy dividers present
            <span className="ml-2 text-xs text-institutional-500 italic">
              (reduces proximity stress by 50%)
            </span>
          </label>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="w-full bg-institutional-600 hover:bg-institutional-700 text-white font-medium py-2 px-4 rounded-md transition-colours duration-200"
        >
          Reset to Default Configuration
        </button>
      </div>
    </div>
  );
}
