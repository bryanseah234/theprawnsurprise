# PRD: theprawnsurprise

## Overview
A retro-styled web app providing three randomization tools: a dice roller, a chaos wheel (spinner), and a Magic 8-Ball. Designed for party games and group decision-making. Uses a neobrutalist / retro pixel aesthetic with tab-based navigation.

## Goals
- Provide three standalone randomization utilities in a single-page app
- Tab navigation between tools (Dice Roll, Chaos Wheel, Magic 8-Ball)
- Retro visual aesthetic with coral, ocean, zest color palette
- Mobile-responsive layout

## Non-Goals
- Multiplayer / sync across devices
- Custom dice faces beyond numeric
- Saving results
- Sound effects

## User Stories
- As a group deciding something, I want a chaos wheel to randomly pick from options.
- As a board gamer without dice, I want a digital dice roller.
- As a curious person, I want to ask the Magic 8-Ball a question.

## Tech Stack
- **Language**: TypeScript / React
- **Build**: Vite
- **Styling**: Tailwind CSS with custom retro/pixel design tokens (`coral`, `ocean`, `zest`, `font-retro`)
- **Icons**: Lucide React

## Architecture
```
theprawnsurprise/
├── App.tsx                         # Tab controller
├── types.ts                        # Tab enum
├── components/
│   ├── Dice/DiceRoller.tsx          # Dice roll logic + animation
│   ├── Spinner/ChaosWheel.tsx       # Spinning wheel with segments
│   ├── MagicBall/Magic8Ball.tsx     # Magic 8-Ball responses
│   └── ui/RetroButton.tsx          # Shared button component
└── utils/                          # cn() utility
```

**State:**
- `activeTab: Tab` — controls which tool is shown (`Tab.DICE | Tab.SPINNER | Tab.MAGIC_BALL`)

## Features (detailed)

### Dice Roller
- Roll N dice (configurable count)
- Shows individual die faces with animated roll
- Displays total sum

### Chaos Wheel
- Spinning wheel with colored segments
- Spin animation with deceleration
- Highlights winning segment

### Magic 8-Ball
- User types question, presses button
- Randomly picks from pool of classic 8-Ball responses
- Reveal animation

### Tab UI
- Active tab: `bg-zest`, pressed-in appearance (`translate-y-1`, no shadow)
- Inactive: `bg-white`, offset shadow (`shadow-retro`)
- Tabs: Dice Roll (Dices icon), Chaos Wheel (Disc icon), 8-Ball (Sparkles icon)

## Deployment / Run
```bash
npm install
npm run dev
```

## Constraints & Notes
- **No persistence**: results not saved; page refresh resets everything
- **Randomness**: uses `Math.random()` — not cryptographically secure (fine for party games)
- **Custom fonts**: retro font loaded via CSS; ensure `font-retro` is defined in Tailwind config
