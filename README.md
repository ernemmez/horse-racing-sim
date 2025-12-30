# 🐎 Horse Racing Simulator - Case Study

A responsive, feature-rich horse racing simulation game built with **Vue 3** and **TypeScript**. This project demonstrates clean architecture, state management, and modern testing practices.

## 🛠 Tech Stack

- **Framework:** Vue 3 (Composition API) + Vite
- **Language:** TypeScript
- **State Management:** Vuex 4
- **Styling:** CSS Variables, Mobile-First Responsive Design
- **Testing:**
  - **Unit:** Vitest
  - **E2E:** Cypress

## 🚀 Getting Started

1.  **Install Dependencies**

    ```bash
    yarn install
    ```

2.  **Run Development Server**
    ```bash
    yarn dev
    ```

## 🧪 Testing

### Unit Tests

Runs unit tests for components, store, and utilities.

```bash
yarn test:unit
```

### E2E Tests

Runs full system simulation using Cypress.

```bash
yarn test:e2e
```

> [!NOTE] > **E2E Test Duration:** The E2E test suite performs a full 6-round race simulation to verify the game loop and result accuracy. The final step (`should complete all 6 rounds`) intentionally takes **~1.5 - 2 minutes** to complete. Please wait for it to finish—it is not frozen! ⏳

## 🧠 Architecture & Logic

### Race Algorithm

The simulation uses a custom algorithm where outcomes are not pre-determined but calculated in real-time based on horse stats:

- **Speed Calculation:** `(Condition * Condition% * 0.8) + (Stamina * Stamina%) + RandomFactor`
- **Stamina System:** Horses lose condition after every race. The amount lost depends on the race distance and the horse's stamina stat. High stamina horses recover faster and perform better in longer/successive races.

### State Management (Vuex)

The application state is modularized for scalability:

- `horses`: Manages the roster, stats generation, and condition updates.
- `program`: Handle race scheduling and round data.
- `race`: Controls the active race loop, timer, and pause/resume logic.
- `results`: Stores and processes race outcomes for the leaderboard.

## 🧩 Key Features

- **Strategic Race Algorithm:** Realistic race simulation logic.
- **Responsive UI:** Optimized for mobile (snap-scroll lists, bottom sheets) and desktop.
- **State Management:** Centralized control for race progress, results, and horse conditions.
- **Robust Testing:** High coverage with both Unit and End-to-End tests.
