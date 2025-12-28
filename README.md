# 🐴 Horse Racing Game - Insider Case Study

A feature-rich horse racing simulation game built with modern web technologies, demonstrating clean code practices, scalable architecture, and high-performance animations.

## 🎯 Project Overview

This project was developed as a case study for **Insider**, showcasing enterprise-level code quality, component-based design, and state management expertise. The application simulates a complete horse racing program with 20 unique horses racing across 6 rounds of varying distances.

## ✨ Key Features

- **20 Unique Horses**: Each horse has unique colors and condition scores (1-100)
- **6-Round Program**: Distances from 1200m to 2200m
- **10 Horses Per Round**: Randomly selected from the pool of 20
- **Real-time Racing Animation**: 60 FPS with `requestAnimationFrame`
- **Live Results**: Displays rankings with finish times after each round
- **Responsive Design**: Clean, modern UI with CSS Grid layout

## 🏗️ Architecture & Technical Decisions

### Technology Stack

| Category         | Technology        | Version | Why?                                          |
| ---------------- | ----------------- | ------- | --------------------------------------------- |
| Framework        | **Vue.js 3**      | 3.5+    | Composition API + `<script setup>` syntax     |
| Language         | **TypeScript**    | 5.x     | Type safety & better developer experience     |
| State Management | **Vuex**          | 4.x     | Per requirements - proven enterprise solution |
| Build Tool       | **Vite**          | 7.x     | Fast HMR, modern standard                     |
| Testing          | **Vitest**        | 4.x     | Native Vite integration                       |
| Styling          | **CSS Variables** | -       | Design tokens for consistency                 |

### Atomic Design Methodology

The component structure follows Atomic Design principles for maximum reusability and maintainability:

```
components/
├── atoms/          # BaseButton, StatusBadge, HorseIcon
├── molecules/      # HorseCard, RoundResultCard, RaceControls
├── organisms/      # HorseList, RaceTrack, ProgramTable, ResultsPanel
└── templates/      # RaceLayout (CSS Grid)
```

### Vuex Store Architecture

Modular store design with clear separation of concerns:

```
store/
├── types.ts           # TypeScript interfaces
├── modules/
│   ├── horses.ts      # 20-horse pool management
│   ├── program.ts     # 6-round program generation
│   ├── race.ts        # Animation & race simulation
│   └── results.ts     # Round results tracking
└── index.ts           # Root store
```

### Performance Optimizations

1. **GPU-Accelerated Animation**: Uses `transform: translateX()` instead of `left` for smooth 60 FPS
2. **requestAnimationFrame**: Browser-sync animation loop, auto-pause when tab inactive
3. **Computed Speed Algorithm**: Condition-based (70%) + Random factor (30%) for realistic racing
4. **Efficient Rendering**: Unique `:key` values prevent unnecessary re-renders

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 22.x LTS (recommended)
- **Yarn**: 1.22+

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run tests
yarn test

# Type checking
yarn type-check
```

## 📁 Project Structure

```
horse-racing-game/
├── src/
│   ├── assets/styles/      # CSS Design Tokens
│   ├── components/         # Atomic Design components
│   ├── store/              # Vuex modules
│   ├── utils/              # Algorithms & helpers
│   ├── App.vue
│   └── main.ts
├── tests/
│   ├── unit/
│   └── e2e/
└── package.json
```

## 🎨 Design System

### Color Palette (Light Theme)

- **Primary**: `#FF6B35` (Insider Orange)
- **Secondary**: `#1A73E8` (Professional Blue)
- **Success**: `#34A853` (Winner Green)
- **Track Background**: `#F5F5F7` (Light Gray)

### Spacing System

8px grid system: `xs(8px)`, `sm(12px)`, `md(16px)`, `lg(24px)`, `xl(32px)`

## 🧮 Race Algorithm

### Speed Calculation

```typescript
speed = condition * 0.7 + random * 30;
```

- **High condition** horses have more consistent speed
- **Low condition** horses are more variance-prone
- Simulates realistic unpredictability

### Round Generation

- 6 rounds with fixed distances: [1200, 1400, 1600, 1800, 2000, 2200]m
- Fisher-Yates shuffle for random horse selection
- Each round independently selects 10 horses

## 📊 Features Implemented

### Core Requirements ✅

- [x] Vue.js 3 with TypeScript
- [x] Generate 20 unique horses
- [x] 6-round program (varying distances)
- [x] 10 random horses per round
- [x] Animated horse movement
- [x] Sequential result display
- [x] Vuex state management
- [x] Component-based architecture

### Bonus Features ✅

- [x] Finish time tracking & display
- [x] Modern, clean UI design
- [x] Responsive layout
- [x] Type-safe codebase
- [x] Production build optimization

## 🧪 Testing

Unit tests cover:

- Algorithm correctness (20 horses, unique colors, 6 rounds)
- Store mutations and actions
- Utility functions

```bash
yarn test:run  # Run all tests
yarn test:ui   # Open Vitest UI
```

## 🎯 Design Decisions & Rationale

### Why Vue 3 + Composition API?

- **Modern**: Vue 2 reached EOL (Dec 31, 2023)
- **Scalable**: Better logic reuse with composables
- **TypeScript**: Superior type inference
- **Performance**: Faster than Options API

### Why Vite over Vue CLI?

- Vue CLI is in maintenance mode
- Vite is the industry standard
- Faster development experience (instant HMR)

### Why Vuex despite Pinia being newer?

- **Requirement Compliance**: Case study specifically requested Vuex
- **Enterprise Proven**: Vuex 4.x is production-ready with Vue 3
- **Skills Demonstration**: Shows ability to work with required tools

### UI/UX Philosophy

> "Layout fidelity with modern polish"

- Maintained the 4-column grid from the example
- Enhanced with modern design tokens and micro-animations
- Prioritized accessibility (WCAG 2.1 AA contrast ratios)

## 📝 Code Quality Standards

- **Clean Code**: Self-documenting code, minimal comments
- **Type Safety**: Strict TypeScript, no `any` types
- **Naming**: Clear, descriptive variable and function names
- **DRY Principle**: Utility functions for reusable logic
- **Single Responsibility**: Each component has one clear purpose

## 🚀 Build & Deployment

```bash
# Production build
yarn build

# Output directory
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
```

Optimized bundle:

- **CSS**: ~12KB (gzipped: 2.5KB)
- **JS**: ~87KB (gzipped: 32KB)

## 📄 License

This project was created as a case study demonstration.

---

**Built with ❤️ for Insider**
