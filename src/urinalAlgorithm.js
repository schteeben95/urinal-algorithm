/**
 * The Urinal Algorithm - Core Scoring Logic
 *
 * Based on rigorous academic research including:
 * - Middlemist et al. (1976) on proximity stress
 * - Kranakis & Krizanc (2010) on mathematical optimisation
 * - Hall (1966) on proxemics
 * - ICUP (International Choice of Urinal Protocol)
 */

/**
 * Calculate proximity score (30% weight - reduced from 40%)
 * Based on Middlemist et al. (1976) study showing adjacent usage increases
 * micturition onset delay by 75%
 */
function calculateProximityScore(position, occupiedPositions, hasDividers) {
  if (occupiedPositions.length === 0) {
    return 100; // No occupied urinals = maximum privacy
  }

  // Find minimum distance to any occupied urinal
  const distances = occupiedPositions.map(occupied => Math.abs(position - occupied));
  const minDistance = Math.min(...distances);

  // Base score scales with distance
  let proximityScore = Math.min(100, (minDistance - 1) * 50);

  // Check if surrounded on both sides
  const hasLeftNeighbour = occupiedPositions.includes(position - 1);
  const hasRightNeighbour = occupiedPositions.includes(position + 1);

  if (hasLeftNeighbour && hasRightNeighbour) {
    proximityScore *= 0.67; // 1.5x penalty = 0.67 multiplier
  }

  // Dividers provide psychological barrier
  if (hasDividers && proximityScore < 100) {
    proximityScore = proximityScore + (100 - proximityScore) * 0.5;
  }

  return proximityScore;
}

/**
 * Calculate edge position preference score (20% weight - reduced from 25%)
 * Based on Kranakis & Krizanc (2010) proving end positions provide
 * 50% longer expected privacy time
 */
function calculateEdgeScore(position, totalUrinals) {
  if (position === 1 || position === totalUrinals) {
    return 100; // End positions
  } else if (position === 2 || position === totalUrinals - 1) {
    return 50; // Adjacent to ends
  }
  return 0; // Middle positions
}

/**
 * ENHANCED COLLECTIVE WELFARE SCORING SYSTEM
 * Replaces simple social responsibility with sophisticated multi-factor analysis
 * Weight: 35% (increased from 20%)
 */

/**
 * Component 1: Next User Viability (Critical)
 * Does at least one acceptable urinal remain for the next person?
 */
function calculateNextUserViability(candidatePosition, occupiedPositions, totalUrinals) {
  const newOccupied = [...occupiedPositions, candidatePosition];
  const allPositions = Array.from({ length: totalUrinals }, (_, i) => i + 1);
  const remaining = allPositions.filter(pos => !newOccupied.includes(pos));

  if (remaining.length === 0) {
    // You're taking the last urinal — no responsibility
    return { score: 100, acceptable: 0, total: 0 };
  }

  // Count how many remaining urinals have distance >= 2 from ALL occupied
  const acceptableForNext = remaining.filter(pos => {
    const minDist = Math.min(...newOccupied.map(occ => Math.abs(pos - occ)));
    return minDist >= 2;
  });

  if (acceptableForNext.length === 0) {
    // CRITICAL FAILURE: No good options remain for next person
    return { score: 0, acceptable: 0, total: remaining.length };
  }

  // Score based on proportion of acceptable options
  const proportion = acceptableForNext.length / remaining.length;
  return {
    score: 30 + (proportion * 70), // 30-100 range when at least one option exists
    acceptable: acceptableForNext.length,
    total: remaining.length
  };
}

/**
 * Component 2: Two-User Lookahead (Important)
 * Can TWO more people use the bathroom comfortably after your choice?
 */
function calculateTwoUserLookahead(candidatePosition, occupiedPositions, totalUrinals) {
  const newOccupied = [...occupiedPositions, candidatePosition];
  const allPositions = Array.from({ length: totalUrinals }, (_, i) => i + 1);
  const remaining = allPositions.filter(pos => !newOccupied.includes(pos));

  // Find all acceptable positions for the next user
  const acceptableForNext = remaining.filter(pos => {
    const minDist = Math.min(...newOccupied.map(occ => Math.abs(pos - occ)));
    return minDist >= 2;
  });

  if (acceptableForNext.length === 0) {
    return { score: 0, maxSecondUserOptions: 0 };
  }

  // For each acceptable next position, how many acceptable remain for a third user?
  let maxSecondUserOptions = 0;

  for (const nextPos of acceptableForNext) {
    const afterNext = [...newOccupied, nextPos];
    const remainingAfterNext = remaining.filter(p => p !== nextPos);

    const acceptableForThird = remainingAfterNext.filter(pos => {
      const minDist = Math.min(...afterNext.map(occ => Math.abs(pos - occ)));
      return minDist >= 2;
    });

    maxSecondUserOptions = Math.max(maxSecondUserOptions, acceptableForThird.length);
  }

  // Score based on whether a comfortable third user is possible
  if (maxSecondUserOptions === 0 && remaining.length > 1) {
    return { score: 50, maxSecondUserOptions: 0 }; // Second user possible but not third
  }

  return {
    score: 50 + (Math.min(maxSecondUserOptions, 2) * 25), // 50-100 range
    maxSecondUserOptions
  };
}

/**
 * Component 3: Symmetry Preservation (Tiebreaker)
 * Maintains symmetric gaps to maximise flexibility for future arrivals
 */
function calculateSymmetryScore(candidatePosition, occupiedPositions, totalUrinals) {
  const newOccupied = [...occupiedPositions, candidatePosition].sort((a, b) => a - b);

  // Calculate gaps between all occupied urinals (including walls)
  const gaps = [];
  gaps.push(newOccupied[0] - 1); // Gap from left wall
  for (let i = 0; i < newOccupied.length - 1; i++) {
    gaps.push(newOccupied[i + 1] - newOccupied[i] - 1);
  }
  gaps.push(totalUrinals - newOccupied[newOccupied.length - 1]); // Gap from right wall

  // More even gap distribution = better symmetry
  // Use coefficient of variation (lower = more even)
  const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  if (mean === 0) return { score: 100, gaps };

  const variance = gaps.reduce((sum, g) => sum + Math.pow(g - mean, 2), 0) / gaps.length;
  const cv = Math.sqrt(variance) / mean;

  // Convert CV to score (CV of 0 = perfect symmetry = 100, CV > 1 = poor = 0)
  const score = Math.max(0, Math.min(100, (1 - cv) * 100));

  return { score, gaps };
}

/**
 * Composite Collective Welfare Score
 * Combines all three components with internal weighting
 */
function calculateCollectiveWelfareScore(candidatePosition, occupiedPositions, totalUrinals) {
  const nextUser = calculateNextUserViability(candidatePosition, occupiedPositions, totalUrinals);
  const twoUser = calculateTwoUserLookahead(candidatePosition, occupiedPositions, totalUrinals);
  const symmetry = calculateSymmetryScore(candidatePosition, occupiedPositions, totalUrinals);

  // Weights within the collective welfare component
  const weights = {
    nextUser: 0.50,    // Most important: don't screw the next person
    twoUser: 0.30,     // Important: consider longer-term effects
    symmetry: 0.20     // Tiebreaker: maintain flexibility
  };

  const composite =
    (nextUser.score * weights.nextUser) +
    (twoUser.score * weights.twoUser) +
    (symmetry.score * weights.symmetry);

  return {
    composite: Math.round(composite),
    breakdown: {
      nextUserViability: nextUser,
      twoUserLookahead: twoUser,
      symmetryPreservation: symmetry
    }
  };
}

/**
 * Calculate buffer zone compliance score (15% weight)
 * Based on ICUP protocol and Hall's proxemics research
 * At least one empty urinal should exist between users
 */
function calculateBufferScore(position, occupiedPositions, hasDividers) {
  if (occupiedPositions.length === 0) {
    return 100; // No occupied urinals = perfect buffer
  }

  const distances = occupiedPositions.map(occupied => Math.abs(position - occupied));
  const minDistance = Math.min(...distances);

  if (minDistance === 1) {
    // Adjacent to occupied - protocol violation unless dividers present
    return hasDividers ? 50 : 0;
  } else if (minDistance === 2) {
    // Exactly one buffer - minimum compliance
    return 70;
  } else {
    // Two or more buffers - comfortable compliance
    return 100;
  }
}

/**
 * Calculate composite comfort score for a urinal position
 * Updated weights to reflect enhanced collective welfare importance
 */
export function calculateComfortScore(urinalPosition, occupiedPositions, totalUrinals, hasDividers) {
  const weights = {
    proximity: 0.30,           // Reduced from 0.40
    edge: 0.20,                // Reduced from 0.25
    collectiveWelfare: 0.35,   // Increased from 0.20 (was 'social')
    buffer: 0.15               // Unchanged
  };

  const proximityScore = calculateProximityScore(urinalPosition, occupiedPositions, hasDividers);
  const edgeScore = calculateEdgeScore(urinalPosition, totalUrinals);
  const collectiveWelfareResult = calculateCollectiveWelfareScore(urinalPosition, occupiedPositions, totalUrinals);
  const bufferScore = calculateBufferScore(urinalPosition, occupiedPositions, hasDividers);

  const compositeScore =
    (proximityScore * weights.proximity) +
    (edgeScore * weights.edge) +
    (collectiveWelfareResult.composite * weights.collectiveWelfare) +
    (bufferScore * weights.buffer);

  return {
    composite: Math.round(compositeScore),
    breakdown: {
      proximity: Math.round(proximityScore),
      edge: Math.round(edgeScore),
      collectiveWelfare: collectiveWelfareResult.composite,
      collectiveWelfareDetails: collectiveWelfareResult.breakdown,
      buffer: Math.round(bufferScore)
    }
  };
}

/**
 * Find the best urinal recommendation
 */
export function findBestUrinal(totalUrinals, occupiedPositions, hasDividers) {
  const allPositions = Array.from({ length: totalUrinals }, (_, i) => i + 1);
  const unoccupiedPositions = allPositions.filter(
    pos => !occupiedPositions.includes(pos)
  );

  if (unoccupiedPositions.length === 0) {
    return {
      recommendation: null,
      status: 'full',
      message: 'Facilities at maximum capacity. Recommend strategic retreat to alternative facilities or adoption of patience-based waiting protocol.',
      scores: []
    };
  }

  // Calculate scores for all unoccupied urinals
  const scoredUrinals = unoccupiedPositions.map(position => ({
    position,
    ...calculateComfortScore(position, occupiedPositions, totalUrinals, hasDividers)
  }));

  // Helper: Check if a position respects buffer protocol (distance >= 2 from all occupied)
  const respectsBufferProtocol = (urinal) => {
    if (occupiedPositions.length === 0) return true;
    const distances = occupiedPositions.map(occupied => Math.abs(urinal.position - occupied));
    const minDistance = Math.min(...distances);
    return minDistance >= 2 || hasDividers;
  };

  // Categorize urinals by buffer compliance and social responsibility
  const bufferCompliant = scoredUrinals.filter(respectsBufferProtocol);
  const bufferViolating = scoredUrinals.filter(u => !respectsBufferProtocol(u));

  const sociallyResponsible = scoredUrinals.filter(c =>
    c.breakdown.collectiveWelfareDetails.nextUserViability.acceptable > 0 ||
    c.breakdown.collectiveWelfareDetails.nextUserViability.total === 0 // Last urinal is fine
  );

  const antisocial = scoredUrinals.filter(c =>
    c.breakdown.collectiveWelfareDetails.nextUserViability.acceptable === 0 &&
    c.breakdown.collectiveWelfareDetails.nextUserViability.total > 0
  );

  // Apply "Don't Be That Guy" override - but ONLY if buffer-compliant + socially-responsible options exist
  const bufferCompliantAndSocial = bufferCompliant.filter(u =>
    sociallyResponsible.some(s => s.position === u.position)
  );

  // Only mark antisocial positions as excluded if there are buffer-compliant alternatives that ARE socially responsible
  // If ALL options are antisocial, don't mark any as excluded (user has no choice)
  let actuallyExcluded = [];
  if (bufferCompliantAndSocial.length > 0 && antisocial.length > 0) {
    antisocial.forEach(c => {
      c.excluded = true;
      c.exclusionReason = "This position would leave zero acceptable options for the next user. Don't be that guy.";
    });
    actuallyExcluded = antisocial;
  }

  // Choose candidates with priority:
  // 1. Buffer-compliant positions (even if antisocial)
  // 2. If none, fall back to buffer-violating positions
  let candidateUrinals;
  if (bufferCompliant.length > 0) {
    // Among buffer-compliant, prefer socially responsible if available, but don't exclude buffer-compliant antisocial
    const bufferCompliantCandidates = bufferCompliantAndSocial.length > 0 ? bufferCompliantAndSocial : bufferCompliant;
    candidateUrinals = bufferCompliantCandidates;
  } else {
    // No buffer-compliant options, use all positions (desperate measures)
    candidateUrinals = scoredUrinals;
  }

  // Sort by composite score (descending)
  candidateUrinals.sort((a, b) => b.composite - a.composite);

  const bestUrinal = candidateUrinals[0];

  // Check if ALL options violate the buffer protocol (adjacent to occupied without dividers)
  // This is a protocol violation, but offer "desperate measures" guidance
  const allViolateProtocol = scoredUrinals.every(urinal => {
    const distances = occupiedPositions.map(occupied => Math.abs(urinal.position - occupied));
    const minDistance = Math.min(...distances);
    return minDistance === 1 && !hasDividers;
  });

  if (allViolateProtocol) {
    return {
      recommendation: bestUrinal.position,
      status: 'desperate',
      message: '⚠️ PROTOCOL VIOLATION: All options are adjacent to occupied urinals. However, if you are desperate or if there are people waiting behind you (and you wish to avoid appearing as though you are merely loitering), Position #' + bestUrinal.position + ' represents the least suboptimal choice.',
      scores: candidateUrinals,
      allScores: scoredUrinals,
      excludedOptions: actuallyExcluded,
      bestScore: bestUrinal
    };
  }

  // Special message for empty bathroom
  if (occupiedPositions.length === 0) {
    return {
      recommendation: bestUrinal.position,
      status: 'optimal',
      message: 'Congratulations — You have achieved the theoretical maximum comfort state.',
      scores: candidateUrinals,
      allScores: scoredUrinals,
      excludedOptions: actuallyExcluded,
      bestScore: bestUrinal
    };
  }

  // Check if we actually excluded any antisocial options (only show warning if better alternatives existed)
  const hasAntisocialWarning = actuallyExcluded.length > 0;

  return {
    recommendation: bestUrinal.position,
    status: hasAntisocialWarning ? 'sociallyAware' : 'normal',
    message: getScoreDescription(bestUrinal.composite),
    scores: candidateUrinals,
    allScores: scoredUrinals,
    excludedOptions: actuallyExcluded,
    bestScore: bestUrinal
  };
}

/**
 * Get human-readable score description
 */
function getScoreDescription(score) {
  if (score >= 90) {
    return 'Optimal Selection — Maximum Privacy Protocol';
  } else if (score >= 70) {
    return 'Acceptable — Within Standard Comfort Parameters';
  } else if (score >= 40) {
    return 'Suboptimal — Elevated Social Stress Anticipated';
  } else {
    return 'Critical — Protocol Violation Imminent';
  }
}

/**
 * Get score tier for styling
 */
export function getScoreTier(score) {
  if (score >= 70) return 'recommended';
  if (score >= 40) return 'acceptable';
  return 'avoid';
}
