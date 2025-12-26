# The Urinal Algorithm

**Applying Rigorous Science to Life's Most Awkward Decisions**

A humorous but scientifically rigorous web application that helps users determine the optimal urinal to use in a public restroom. The humour comes from applying serious academic research to a mundane social situation.

## Features

- **Interactive Urinal Configuration**: Adjust the number of urinals (2-20) and toggle privacy dividers
- **Real-time Scoring Algorithm**: Four weighted factors based on genuine academic research:
  - Proximity to Occupied Urinals (40%) — Based on Middlemist et al. (1976)
  - Edge Position Preference (25%) — Based on Kranakis & Krizanc (2010)
  - Social Responsibility (20%) — Based on cooperative game theory
  - Buffer Zone Compliance (15%) — Based on ICUP protocol and Hall's proxemics
- **Visual Feedback**: Colour-coded urinals showing comfort scores
- **Educational Content**: Collapsible panel with full academic citations and explanations
- **Easter Eggs**: Special messages for specific configurations

## The Science

While the application is presented humorously, all research cited is genuine:

- **Middlemist, R.D., Knowles, E.S., & Matter, C.F. (1976)**: Demonstrated that adjacent urinal usage increases micturition onset delay by 75%
- **Kranakis, E. & Krizanc, D. (2010)**: Mathematical proof that end positions provide 50% longer expected privacy time
- **Hall, E.T. (1966)**: Proxemics research on personal space zones
- **Hutchings, K. & Kehinde, O. (2024)**: Recent research on paruresis (shy bladder syndrome)

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Client-side only (no backend required)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This application is designed for easy deployment on Vercel:

1. Push to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite framework and deploy

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Language

All text uses Australian English spelling (e.g., "behaviour" not "behavior", "optimisation" not "optimization").

## Example Scenarios

1. **5 urinals, none occupied** → Recommends position 1 or 5 (score: 100)
2. **5 urinals, position 3 occupied** → Recommends position 1 or 5 (score: ~90)
3. **5 urinals, positions 1 and 5 occupied** → Recommends position 3 (score: ~75)
4. **5 urinals, positions 1, 3, 5 occupied** → "WAIT" advisory (protocol violation)
5. **3 urinals, position 2 occupied** → Easter egg: Middlemist study configuration

## Disclaimer

For entertainment purposes only. Not responsible for bathroom-related social incidents.

All research cited is genuine. The absurdity lies not in the science, but in applying it to urinal selection.

## Licence

MIT
