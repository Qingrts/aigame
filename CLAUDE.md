# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the design repository for "群星降临" (Falling Stars), a sci-fi themed reincarnation idle/simulation game with the core mechanic of "reincarnation" where players progress through multiple lives while permanently accumulating upgrades. The project is currently in the design phase with the specification document as the primary source of truth.

## Project Status

- **Current Phase**: Design / Planning
- **Primary Document**: `game.spec.md` - Complete game design specification v1.0.0
- **Implementation**: Not yet started - awaiting development team decision to begin coding

## Game Architecture

### Core Game Loop

```
[开局] → [工作赚钱] → [研究升级] → [战斗防御] → [生活消费] → [轮回结算] → [永久成长]
```

**Key Features:**
- **Reincarnation System**: End life, keep permanent upgrades (tech tree, transmigrators, particles), reset progress
- **Time Allocation**: Daily time split between work (earning), research (gaining XP), sleep, and life activities
- **Multi-Life Progression**: Each life gets stronger than the previous
- **Idle + Active**: Combination of passive resource generation and active management

### Core Systems

1. **Attributes (6 stats)**: Mindset, Health, IQ, EQ, Creativity, Luck
2. **Career System**: 5 industries with tiered career paths (AI, Entertainment, Starfleet, Research, Transport)
3. **Research System**: Unlock skills, increase efficiency, reduce requirements
4. **Life System**: Food, housing, transportation, hired help
5. **Combat System**: Orbital defense turrets, monster waves, equipment upgrades
6. **Tech Tree (Reincarnation Memory)**: Permanent upgrades using time crystals, high-dimensional cores, life crystals
7. **Transmigrator System**: Permanent character upgrades using quantum fragments
8. **Quantum Particles**: Passive stat boosts purchasable with quantum currency
9. **Orbital Buildings**: Power plants, weapons, radar, spaceport
10. **Starship System**: Ships with upgrade paths and blueprints
11. **Sacred Timeline**: Branch timeline management with resource export

### Tech Stack (Planned)

```
Frontend: React 18+ / Vue 3+ with TypeScript
State Management: Zustand / Redux Toolkit
UI: Ant Design / Tailwind CSS
Game Loop: requestAnimationFrame + setInterval
Storage: IndexedDB (localForage) + localStorage
Backend (optional): Node.js + Express / NestJS, PostgreSQL, Redis, WebSocket
```

## Key Design Principles

### "只要比上次有进步，哪怕只有50或100级，也不要花几倍的时间去升200级。"

This is the core design philosophy - incremental progress is valued over massive jumps. This influences:
- Reincarnation cost balancing
- Research/experience curve design
- Time allocation optimization

### Attribute Computation

Attributes only apply bonuses for values > 100 (base is 10):
- Mindset: +0.5%精力
- Health: +0.01基础精力
- IQ: +1%研究经验
- EQ: +1%工作收入
- Creativity: -0.1%研究所需经验
- Luck: +1w初始资金/+0.1%掉率

## Development Process

### Version Phases

Based on the spec document:

- **v1.0** (4 weeks): Core reincarnation + work/research/life systems
- **v1.1** (2 weeks): Combat + defense turrets
- **v1.2** (2 weeks): Transmigrator + tech tree
- **v1.3** (3 weeks): Starship + orbital buildings
- **v1.4** (2 weeks): Sacred timeline
- **v1.5** (3 weeks): Seasons + event systems

### Implementation Strategy

When implementing this game:

1. **Start with v1.0** - Core gameplay loop must work before adding complex systems
2. **Save System**: IndexedDB with localForage, auto-save every 30s + manual save
3. **Game Loop**: Use requestAnimationFrame for smooth UI updates, setInterval for logic ticks
4. **State Management**: Keep persistent state (permanent upgrades) separate from transient state (current life)
5. **Reincarnation Logic**: Must clearly separate what resets vs. what persists

### Core Data Structures

```typescript
// Current life state (resets on reincarnation)
interface PlayerState {
  age: number;
  money: number;
  career: Career;
  researches: Research[];
  timeAllocation: TimeAllocation;
  attributes: Attributes;
  buildings: OrbitalBuilding[];
}

// Permanent state (carries through reincarnations)
interface PermanentState {
  techTree: TechTree;
  transmigrators: Transmigrator[];
  quantumParticles: QuantumParticle[];
  sacredTimeline: SacredTimeline;
  globalStats: GlobalStats;
}
```

## Working with game.spec.md

The specification document (`game.spec.md`) is the single source of truth. When implementing:

1. **Always reference the spec** for numbers, formulas, and mechanics
2. **Maintain the document**: Update it when design decisions change
3. **Specific sections to reference**:
   - Section 4: Time allocation strategies and formulas
   - Section 6: Research experience calculation
   - Section 8: Reincarnation mechanics and resource calculation
   - Section 10: Transmigrator progression costs
   - Section 21: Technical architecture recommendations

## When Implementation Begins

Once you start coding, the following setup will be needed:

1. **Package Manager**: Install dependencies (React/Vue + UI library + state management)
2. **Build System**: Configure build for Web/H5/Android target
3. **Testing**: Set up unit tests for core calculation functions
4. **Linting**: Configure ESLint + Prettier
5. **Development Scripts**: Create scripts for dev, build, lint, test

## Common Commands (After Setup)

```
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run test         # Run tests
npm run test:watch   # Watch mode for tests
```

## Important Notes

- The game has complex interconnected systems (time allocation affects everything)
- Performance optimization is critical (game loops, large state objects)
- Save data integrity is paramount (corrupted saves = lost progress)
- Balance tuning will be iterative - the spec provides baseline values
- Monster scaling must be balanced against player progression
