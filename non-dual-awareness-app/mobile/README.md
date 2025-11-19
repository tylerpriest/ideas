# Awareness - Non-Dual Awareness Mobile App

> A gentle companion for recognizing your true nature as awareness itself.

## Overview

This is a React Native (Expo) mobile application built to support the recognition of awareness through the Direct Path teachings of Rupert Spira, Francis Lucille, and the Advaita Vedanta tradition.

**Core Philosophy**: Every technical decision serves Awareness — simplicity, peace, presence, accessibility. No tracking, no manipulation, no engagement hacking.

## Features

### ✅ Implemented

#### 1. Sit and Be (Meditation Timer)
- Fully functional timer with start/pause/resume/stop controls
- Duration selection: 5, 10, 15, 20, 30 minutes
- Beautiful, peaceful MM:SS display
- Optional inquiry prompts during practice ("Am I aware?")
- Session state management
- Saves to preferences

#### 2. Contemplate (Daily Pointers & Teachings)
- **Today's Pointer**: Rotates through 120 daily contemplation pointers
- **All Pointers**: Browse and search all 120 pointers
- **Core Teachings**: Access 30+ teachings across 6 categories:
  - Nature of Awareness
  - Nature of Experience
  - Nature of Peace & Happiness
  - The Pathless Path
  - Being and Love
  - Investigation and Inquiry
- Content loaded from JSON files
- Beautiful, readable layouts with generous spacing

#### 3. Inquire (Self-Inquiry Sequences)
- 10 structured self-inquiry practices
- Filter by level: Foundational, Intermediate, Advanced
- Detailed step-by-step guidance
- Duration estimates for each sequence
- Topics include:
  - "Who Am I?" (classical inquiry)
  - "What Is Aware?" (tracing experience)
  - "Investigating the Separate Self"
  - "Am I the Body?"
  - "Where Is Happiness?"
  - "Investigating Shared Being"
  - And more...

#### 4. Journal
- SQLite database integration
- Create, view, edit, delete entries
- Search functionality
- Date-organized list
- Link entries to practice sessions
- Private, local-only storage

#### 5. Settings
- **Theme**: Light / Dark / Auto
- **Font Size**: 4 levels (Small, Medium, Large, Extra Large)
- **Reduced Motion**: Accessibility toggle
- **Timer Defaults**: Set preferred duration
- **Timer Sound**: Bell / Chime / Silence
- **Haptic Feedback**: Enable/disable
- **Daily Reminders**: Configure gentle notifications
- **About**: App info and version
- **Reset**: Restore default preferences

### Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **State Management**: Zustand
- **Local Storage**: AsyncStorage (preferences) + SQLite (journal, sessions)
- **UI**: Custom components with contemplative minimalism design

### Design System

**Visual Direction**: "Contemplative Minimalism"
- Warm, natural color palette (earth tones, sage, ochre)
- Generous spacing and breathing room
- Georgia serif fonts (system fallbacks until custom fonts loaded)
- High contrast for accessibility
- Smooth, peaceful animations
- No harsh whites or blacks

**Colors**:
- Background: #FAF9F7 (warm off-white, like aged paper)
- Primary Accent: #8B7355 (warm earth/ochre)
- Success: #7D9C8B (soft sage green)

## Project Structure

```
mobile/
├── src/
│   ├── app/(tabs)/           # Main screens
│   │   ├── sit.tsx           # Meditation timer
│   │   ├── contemplate.tsx   # Daily pointers & teachings
│   │   ├── inquire.tsx       # Self-inquiry sequences
│   │   ├── journal.tsx       # Journal entries
│   │   └── settings.tsx      # App settings
│   ├── components/ui/        # Reusable UI components
│   │   ├── Text.tsx          # Typography component
│   │   ├── Button.tsx        # Button with variants
│   │   └── Card.tsx          # Card container
│   ├── lib/
│   │   ├── content/          # Content loading
│   │   │   └── loader.ts     # JSON content loader
│   │   ├── storage/          # Data persistence
│   │   │   └── database.ts   # SQLite operations
│   │   └── audio/            # Sound playback
│   │       └── sounds.ts     # Timer bells
│   ├── store/                # State management
│   │   ├── usePreferences.ts # User preferences
│   │   └── useTimer.ts       # Timer state
│   ├── constants/            # Design system constants
│   │   ├── theme.ts          # Colors, typography, spacing
│   │   └── config.ts         # App configuration
│   └── hooks/                # Custom hooks
│       └── useFonts.ts       # Font loading
├── content/                  # Contemplation content (JSON)
│   ├── daily-pointers.json       # 120 pointers
│   ├── core-teachings.json       # 30+ teachings
│   ├── self-inquiry-sequences.json # 10 sequences
│   └── external-resources.json   # Teacher resources
├── App.tsx                   # App entry point
├── app.json                  # Expo configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo Go app on your phone (for testing), OR
- iOS Simulator (Mac only), OR
- Android Emulator

### Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

**Option 1: On Your Phone (Easiest)**
1. Install Expo Go from App Store or Google Play
2. Run `npm start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

**Option 2: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option 3: Android Emulator**
```bash
npm run android
```

**Option 4: Web Browser (Limited)**
```bash
npm run web
```

## Content

All contemplative content is stored in JSON files in the `content/` directory:

- **daily-pointers.json**: 120 brief pointers for daily contemplation
- **core-teachings.json**: 30+ in-depth teachings across 6 categories
- **self-inquiry-sequences.json**: 10 structured inquiry practices
- **external-resources.json**: Links to Rupert Spira, Francis Lucille, and other teachers

Content can be updated by editing these JSON files. The app will load the updated content on restart.

## Database

The app uses SQLite for local data storage:

**Tables**:
- `journal_entries`: User's journal reflections
- `practice_sessions`: Meditation/inquiry session history
- `bookmarks`: Saved pointers, teachings, and sequences

Database is initialized on app startup and stored locally on the device. No data is ever sent to external servers.

## Configuration

Key app settings in `src/constants/config.ts`:

```typescript
{
  timer: {
    defaultDuration: 15,  // minutes
    durations: [5, 10, 15, 20, 30],
    defaultSound: 'bell',
  },
  // ... more settings
}
```

## Design Principles

Every aspect of this app serves the recognition of Awareness:

1. **Simplicity over Features**: Fewer features, deeply implemented
2. **Peace in Performance**: Fast, smooth, no jarring transitions
3. **Presence over Metrics**: No tracking, no gamification, no manipulation
4. **Accessibility as Love**: Available to all, regardless of ability
5. **Offline-First**: No dependency on external servers

## What's Next

### To Complete for V1:

1. **Custom Fonts**:
   - Add Crimson Text and Source Serif Pro font files to `assets/fonts/`
   - Update font loading in `useFonts.ts`
   - Replace Georgia fallbacks with custom fonts

2. **Sound Files**:
   - Add bell.mp3 and chime.mp3 to `assets/sounds/`
   - Update audio loading in `sounds.ts`

3. **App Icons**:
   - Design and add app icon and splash screen
   - Replace placeholders in `assets/`

4. **Testing**:
   - Test on actual iOS devices
   - Test on actual Android devices
   - Verify all features work offline
   - Test accessibility with screen readers
   - Performance testing on low-end devices

5. **Polish**:
   - Add subtle animations where appropriate
   - Refine spacing and typography
   - Add empty states and error handling
   - Test dark mode thoroughly

### Future Enhancements (V2+):

- **Inquiry Detail View**: Full step-by-step practice with timer integration
- **Teaching Detail View**: Read individual teachings with bookmarking
- **Practice History**: View past sessions, time stats
- **Export Data**: Export journal and history
- **Daily Notifications**: Gentle reminders configured in Settings
- **Audio Contemplations**: Guided meditations/contemplations
- **Community Features**: Optional anonymous sharing (privacy-first)
- **Multi-device Sync**: Optional cloud backup (end-to-end encrypted)

## Contributing

This app is built with love in service of Awareness. If you'd like to contribute:

1. Maintain the core philosophy: simplicity, peace, no manipulation
2. Follow the existing code patterns and design system
3. Test thoroughly on multiple devices
4. Keep accessibility in mind
5. Document your changes

## License

To be determined based on distribution goals.

## Acknowledgments

This app draws inspiration from the teachings of:
- **Rupert Spira** - Direct Path teacher, author
- **Francis Lucille** - Advaita teacher, "You are the happiness you seek"
- **Ramana Maharshi** - Self-inquiry tradition
- **Sri Nisargadatta Maharaj** - "I Am That"
- **The entire Advaita Vedanta tradition**

All content is created for educational purposes in service of recognizing our true nature as awareness.

---

**"You are already what you seek. This app simply points to that recognition."**

*Built with intention, in service of Awareness*
*Version 1.0.0*
