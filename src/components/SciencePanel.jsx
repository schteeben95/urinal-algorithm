import { useState } from 'react';

export default function SciencePanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-2xl font-semibold text-institutional-900">
          The Science Behind the Algorithm
        </h2>
        <span className="text-3xl text-institutional-600">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Introduction */}
          <div className="prose max-w-none">
            <p className="text-institutional-700 leading-relaxed">
              This algorithm applies genuine academic research to the age-old question of urinal selection.
              While the application may be humorous, the science is real. Each scoring factor is based on
              peer-reviewed research in psychology, mathematics, and behavioural science.
            </p>
          </div>

          {/* Factor 1: Proximity */}
          <div className="bg-institutional-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-institutional-900 mb-2">
              Factor 1: Proximity to Occupied Urinals (30% weight)
            </h3>
            <p className="text-sm text-institutional-700 mb-3">
              <strong>Scientific Basis:</strong> The landmark Middlemist, Knowles, and Matter (1976) study,
              published in the <em>Journal of Personality and Social Psychology</em>, demonstrated that
              adjacent urinal usage increases micturition onset delay by 75% (from 4.8 to 8.4 seconds) due
              to physiological stress response. This study provided empirical evidence that proximity to
              others in vulnerable situations causes measurable anxiety.
            </p>
            <p className="text-sm text-institutional-700">
              The algorithm accounts for minimum distance to occupied urinals, applies penalty multipliers
              for being surrounded on both sides, and reduces stress when privacy dividers are present.
            </p>
          </div>

          {/* Factor 2: Edge Position */}
          <div className="bg-institutional-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-institutional-900 mb-2">
              Factor 2: Edge Position Preference (20% weight)
            </h3>
            <p className="text-sm text-institutional-700 mb-3">
              <strong>Scientific Basis:</strong> Kranakis and Krizanc (2010) published a mathematical proof
              in <em>Lecture Notes in Computer Science</em> (the "Fun with Algorithms" volume) demonstrating
              that end positions provide 50% longer expected privacy time. The wall acts as a permanent
              "occupied" barrier, meaning potential intrusion can only come from one direction.
            </p>
            <p className="text-sm text-institutional-700">
              This reflects the broader psychological principle of preferring defensible positions with
              reduced exposure angles — a pattern seen in seating selection across many contexts.
            </p>
          </div>

          {/* Factor 3: Collective Welfare */}
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Factor 3: Collective Welfare Score (35% weight)
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              <strong>Scientific Basis:</strong> This enhanced factor combines cooperative game theory, rule
              utilitarianism, and Garrett Hardin's "Tragedy of the Commons" (1968) to evaluate not just how
              your choice affects the next user, but the cascading impact on the entire community.
            </p>

            <div className="ml-4 space-y-3 mb-3">
              <div className="text-sm text-blue-800">
                <strong>Component 1: Next User Viability (50%)</strong> — Does at least one acceptable urinal
                remain for the next person? This is critical: choosing a position that leaves zero good options
                violates the fundamental social contract of shared spaces.
              </div>
              <div className="text-sm text-blue-800">
                <strong>Component 2: Two-User Lookahead (30%)</strong> — Can TWO more people comfortably use
                the facilities after you? This prevents short-sighted optimization that helps the next person
                but creates problems for subsequent arrivals.
              </div>
              <div className="text-sm text-blue-800">
                <strong>Component 3: Symmetry Preservation (20%)</strong> — Positions that maintain even gap
                distribution maximise future flexibility. Uneven gaps force later arrivals into suboptimal choices.
              </div>
            </div>

            <div className="bg-blue-100 p-3 rounded mt-3">
              <h4 className="text-sm font-bold text-blue-900 mb-2">The Tragedy of the Bathroom Commons</h4>
              <p className="text-xs text-blue-800 mb-2">
                In 1968, ecologist Garrett Hardin described the "Tragedy of the Commons" — when individuals
                acting in rational self-interest deplete shared resources. The urinal problem presents a
                miniature version of this dilemma.
              </p>
              <p className="text-xs text-blue-800 mb-2">
                Consider 7 urinals with positions 1 and 7 occupied. Position 4 maximises YOUR distance from
                others. But it also ensures the next arrival has NO comfortable option — every remaining urinal
                is adjacent to someone.
              </p>
              <p className="text-xs text-blue-800 mb-2">
                Choosing position 3 or 5 instead sacrifices ~15% of your personal comfort but preserves viable
                options for the community. The algorithm now rewards this socially responsible behaviour.
              </p>
              <p className="text-xs text-blue-800">
                <strong>The "Don't Be That Guy" Override:</strong> When a position would leave zero acceptable
                options for the next user, and alternatives exist, the algorithm excludes it entirely. This
                implements rule utilitarianism: the best individual choice is the one that would produce the
                best outcomes if everyone followed the same rule.
              </p>
            </div>
          </div>

          {/* Factor 4: Buffer Zone */}
          <div className="bg-institutional-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-institutional-900 mb-2">
              Factor 4: Buffer Zone Compliance (15% weight)
            </h3>
            <p className="text-sm text-institutional-700 mb-3">
              <strong>Scientific Basis:</strong> The International Choice of Urinal Protocol (ICUP)
              establishes that at least one empty urinal should exist between any two users. This is
              supported by Edward T. Hall's proxemics research (1966) showing the personal space zone
              of 45cm-1.2m, which a single urinal width (~60cm) roughly satisfies.
            </p>
            <p className="text-sm text-institutional-700">
              Violating this buffer zone creates what Hall termed an "intimate distance" intrusion,
              appropriate only for close personal relationships — decidedly not the context of public
              restroom usage.
            </p>
          </div>

          {/* Related Research: Paruresis */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Related Research: Paruresis (Shy Bladder Syndrome)
            </h3>
            <p className="text-sm text-blue-800 mb-2">
              The anxiety measured in these studies relates to paruresis, a psychogenic condition affecting
              7-21% of the population (Hammelstein et al., 2005). Recent research by Hutchings and Kehinde
              (2024) in <em>BMJ Open</em> found that environmental factors like proximity to others and
              lack of privacy are significant contributors.
            </p>
            <p className="text-sm text-blue-800">
              While this algorithm is presented humorously, it addresses genuine discomfort experienced by
              many individuals in public restroom settings.
            </p>
          </div>

          {/* Easter Egg */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-xs">
            <p className="text-yellow-900">
              <strong>Historical Note:</strong> The Middlemist et al. (1976) study remains controversial
              due to its methodology — researchers used a periscope and stopwatch in a public restroom to
              measure... precisely what you think they measured. The ethics of this approach have been
              debated for decades, though the physiological findings remain scientifically sound.
            </p>
          </div>

          {/* Citations */}
          <div className="border-t-2 border-institutional-200 pt-4">
            <h3 className="text-lg font-bold text-institutional-900 mb-3">
              Academic Citations
            </h3>
            <div className="space-y-2 text-xs text-institutional-700">
              <p className="hanging-indent">
                Freedman, D., & Shepp, L. (1962). On the unfriendly seating arrangement problem.
                <em> SIAM Review</em>, 4(2), 150.
              </p>
              <p className="hanging-indent">
                Hall, E. T. (1966). <em>The Hidden Dimension</em>. Doubleday.
              </p>
              <p className="hanging-indent">
                Hammelstein, P., Pietrowsky, R., Merbach, M., & Brähler, E. (2005). Psychogenic urinary
                retention ("paruresis"): Diagnosis and epidemiology in a representative male sample.
                <em> Psychotherapy and Psychosomatics</em>, 74, 308-314.
              </p>
              <p className="hanging-indent">
                Hardin, G. (1968). The Tragedy of the Commons. <em>Science</em>, 162(3859), 1243-1248.
              </p>
              <p className="hanging-indent">
                Hutchings, K., & Kehinde, O. (2024). Exploring paruresis ('shy bladder syndrome') and
                factors that may contribute to it. <em>BMJ Open</em>, 14(11), e086097.
              </p>
              <p className="hanging-indent">
                Kranakis, E., & Krizanc, D. (2010). The Urinal Problem. <em>Lecture Notes in Computer
                Science</em>, Vol. 6099 (Fun with Algorithms). Springer.
              </p>
              <p className="hanging-indent">
                Kuoch, K. L., Meyer, D., Austin, D. W., & Knowles, S. R. (2017). A systematic review of
                paruresis: Clinical implications and future directions.
                <em> Journal of Psychosomatic Research</em>, 98, 122-129.
              </p>
              <p className="hanging-indent">
                Middlemist, R. D., Knowles, E. S., & Matter, C. F. (1976). Personal space invasions in the
                lavatory: Suggestive evidence for arousal.
                <em> Journal of Personality and Social Psychology</em>, 33(5), 541-546.
              </p>
              <p className="hanging-indent">
                Munroe, R. (2009). Urinal Protocol Vulnerability. <em>XKCD Blog</em>.
                <a
                  href="https://blog.xkcd.com/2009/09/02/urinal-protocol-vulnerability/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  https://blog.xkcd.com/2009/09/02/urinal-protocol-vulnerability/
                </a>
              </p>
              <p className="hanging-indent">
                Sorokowska, A., et al. (2017). Preferred Interpersonal Distances: A Global Comparison.
                <em> Journal of Cross-Cultural Psychology</em>, 48(4), 577-592.
              </p>
            </div>
          </div>

          <style jsx>{`
            .hanging-indent {
              padding-left: 2rem;
              text-indent: -2rem;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
