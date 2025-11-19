# Technical Architecture
## Non-Dual Awareness App

> "The app should point to what is already present, not create dependency or complexity."

## Core Philosophy in Technical Decisions

Every technical choice serves the recognition of Awareness:

1. **Simplicity over Features** - Fewer features, deeply implemented
2. **Peace in Performance** - Fast, smooth, no jarring transitions
3. **Presence over Metrics** - No tracking, no gamification, no manipulation
4. **Accessibility as Love** - Available to all, regardless of ability
5. **Offline-First as Self-Sufficiency** - Not dependent on external servers

---

## Technology Stack

### Mobile Application (Phase 1)

**Framework: React Native (Expo)**
- Cross-platform (iOS + Android) with single codebase
- Native performance and feel
- Large ecosystem for meditation/mindfulness apps
- Expo provides easy development and deployment
- Strong accessibility support

**Why React Native over Flutter:**
- JavaScript/TypeScript familiarity for wider contribution
- Larger community for contemplative app development
- Easier web port later (React Native Web)
- Better integration with web-based content management

**State Management: Zustand**
- Minimal, simple API (aligns with simplicity principle)
- No boilerplate (React Context would add complexity)
- Easy to understand and debug
- Lightweight (small bundle size)

**Local Storage: AsyncStorage + SQLite**
- AsyncStorage for app preferences and settings
- SQLite for structured data (journal entries, practice history)
- Fully offline, no network dependency
- Fast, reliable, well-tested

**Navigation: React Navigation**
- Standard for React Native apps
- Supports stack, tab, and drawer navigation
- Smooth, native-feeling transitions
- Highly customizable for peaceful UX

**UI Component Library: Custom (No UI Kit)**
- Purpose-built components aligned with app philosophy
- No bloat from unused components
- Full control over aesthetics and behavior
- Tamagui or NativeWind for styling approach

**Styling: NativeWind (Tailwind for React Native)**
- Utility-first approach (fast development)
- Consistent design system
- Easy dark mode support
- Small runtime footprint

**Fonts: Custom, Carefully Chosen**
- Display font: Something warm, peaceful, distinctive
- Body font: Highly readable, gentle on eyes
- No generic system fonts (Inter, Roboto, SF Pro)
- Consider: Crimson Text, Lora, Source Serif, EB Garamond for body
- Consider: Cormorant, Spectral, Playfair Display for headings

**Audio: Expo AV**
- Play gentle bells/chimes for timers
- Simple, reliable audio playback
- Pre-bundled audio files (no network needed)

**Notifications: Expo Notifications**
- Local notifications only (no push, no server)
- Gentle reminders for daily practice
- User has full control (frequency, timing, content)

### Backend (Optional, Phase 3+)

**Backend-as-a-Service: Supabase**
- Open source (can self-host if needed)
- PostgreSQL database (robust, reliable)
- Real-time subscriptions (for community features)
- Row-level security (privacy by default)
- Simple authentication (email, magic link, OAuth)
- Edge functions for serverless logic

**Why Supabase over Firebase:**
- Open source philosophy aligns with app values
- PostgreSQL is more robust than Firestore
- Easier to export data (user sovereignty)
- No vendor lock-in
- Better for privacy-conscious users

**Alternative: No Backend Initially**
- Launch fully offline
- Add sync later if users request it
- Keeps initial version pure and simple

---

## Project Structure

```
non-dual-awareness-app/
├── mobile/                      # React Native app (Expo)
│   ├── src/
│   │   ├── app/                 # App entry and navigation
│   │   │   ├── (tabs)/          # Tab-based navigation
│   │   │   │   ├── sit.tsx      # Sit and Be screen
│   │   │   │   ├── contemplate.tsx  # Contemplations
│   │   │   │   ├── inquire.tsx  # Self-Inquiry
│   │   │   │   ├── journal.tsx  # Journal
│   │   │   │   └── settings.tsx # Settings
│   │   │   └── _layout.tsx      # Root layout
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # Base UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Text.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Timer.tsx
│   │   │   └── features/        # Feature-specific components
│   │   │       ├── MeditationTimer.tsx
│   │   │       ├── PointerCard.tsx
│   │   │       └── InquirySequence.tsx
│   │   ├── lib/                 # Core logic
│   │   │   ├── storage/         # Data persistence
│   │   │   │   ├── db.ts        # SQLite setup
│   │   │   │   ├── preferences.ts
│   │   │   │   ├── journal.ts
│   │   │   │   └── sessions.ts
│   │   │   ├── content/         # Content management
│   │   │   │   ├── pointers.ts
│   │   │   │   ├── teachings.ts
│   │   │   │   └── sequences.ts
│   │   │   └── audio/           # Audio playback
│   │   │       └── sounds.ts
│   │   ├── store/               # Zustand state management
│   │   │   ├── usePreferences.ts
│   │   │   ├── useTimer.ts
│   │   │   └── useContent.ts
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useTimer.ts
│   │   │   ├── useContent.ts
│   │   │   └── useNotifications.ts
│   │   ├── assets/              # Static assets
│   │   │   ├── fonts/           # Custom fonts
│   │   │   ├── sounds/          # Bell, chime audio files
│   │   │   └── images/          # App icons, etc.
│   │   └── constants/           # App constants
│   │       ├── theme.ts         # Colors, spacing, typography
│   │       └── config.ts        # App configuration
│   ├── app.json                 # Expo configuration
│   ├── package.json
│   └── tsconfig.json
├── content/                     # Content library (already created)
│   ├── daily-pointers.json
│   ├── core-teachings.json
│   ├── self-inquiry-sequences.json
│   └── external-resources.json
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # This file
│   ├── DESIGN_SYSTEM.md         # UI/UX design specifications
│   └── DEVELOPMENT.md           # Development guide
└── PLAN.md                      # Project plan (already created)
```

---

## Data Models

### User Preferences
```typescript
interface UserPreferences {
  id: string;
  theme: 'light' | 'dark' | 'auto';
  defaultTimerDuration: number; // minutes
  timerSound: 'bell' | 'chime' | 'silence';
  dailyReminderEnabled: boolean;
  dailyReminderTime: string; // HH:mm format
  dailyReminderFrequency: 'once' | 'twice' | 'three';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  reducedMotion: boolean; // Accessibility
  hapticFeedback: boolean;
  lastDailyPointer: number; // Index of last shown pointer
  createdAt: Date;
  updatedAt: Date;
}
```

### Practice Session
```typescript
interface PracticeSession {
  id: string;
  type: 'sit' | 'inquiry' | 'contemplation';
  startTime: Date;
  duration: number; // seconds
  sequenceId?: string; // If self-inquiry sequence
  teachingId?: string; // If contemplation
  notes?: string; // Optional reflection
  completed: boolean;
  createdAt: Date;
}
```

### Journal Entry
```typescript
interface JournalEntry {
  id: string;
  content: string;
  tags?: string[]; // Optional user tags
  sessionId?: string; // Link to practice session
  createdAt: Date;
  updatedAt: Date;
}
```

### Bookmarks
```typescript
interface Bookmark {
  id: string;
  contentType: 'pointer' | 'teaching' | 'sequence';
  contentId: string;
  note?: string; // Optional user note
  createdAt: Date;
}
```

### Daily Reminder
```typescript
interface DailyReminder {
  id: string;
  scheduledTime: Date;
  pointerId: string;
  delivered: boolean;
  deliveredAt?: Date;
}
```

---

## Screen Architecture

### Tab Navigation Structure

```
┌─────────────────────────────────────────┐
│  [Sit] [Contemplate] [Inquire] [Journal]│  ← Tab Bar
└─────────────────────────────────────────┘

Tab 1: Sit and Be
- Meditation timer
- Optional guided inquiry prompts
- Minimalist, peaceful interface

Tab 2: Contemplate
- Daily pointer (prominent)
- Browse all pointers
- Core teachings by category
- Bookmarked content

Tab 3: Inquire
- List of self-inquiry sequences
- Active sequence progress
- Completed sequences

Tab 4: Journal
- List of journal entries
- Add new entry
- Search/filter entries
- Link to practice sessions

Settings: Accessible from any tab
- Preferences
- Notifications
- About/Resources
- Data export
```

### Screen Details

#### 1. Sit and Be Screen
**Purpose:** Core meditation/awareness practice

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         [  Timer Display  ]     │  ← Large, peaceful
│         [   15:00        ]     │
│                                 │
│    [ Start / Pause Button ]    │  ← Single clear action
│                                 │
│    [Optional: Inquiry Prompt]  │  ← Can be hidden
│                                 │
│  Duration: [5] [10] [15] [20]  │  ← Quick selects
│  Sound: [Bell] [Chime] [Silent]│
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Large, calm timer display
- Simple start/stop controls
- Optional inquiry prompts that appear gently during practice
- Quick duration selection
- Choice of end sound or silence
- Saves session on completion

**Design Intention:**
- Maximum simplicity, minimal UI
- Generous white/peaceful space
- No distractions, no counts, no streaks
- Just a support for sitting and being aware

#### 2. Contemplate Screen
**Purpose:** Daily pointers and teachings library

**Layout:**
```
┌─────────────────────────────────┐
│  Today's Pointer                │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │  "Notice that you are     │ │
│  │   aware right now..."     │ │  ← Daily pointer
│  │                           │ │    (prominent)
│  └───────────────────────────┘ │
│                                 │
│  Browse                         │
│  ◎ All Pointers                │
│  ◎ Core Teachings              │
│  ◎ Bookmarks                   │
│                                 │
│  Categories                     │
│  • Nature of Awareness         │
│  • Peace & Happiness           │
│  • Self-Inquiry                │
│  ...                            │
└─────────────────────────────────┘
```

**Features:**
- Daily pointer rotates each day (or can be refreshed)
- Browse all content by type or category
- Search/filter by theme or level
- Bookmark favorite contemplations
- Clean, readable typography
- Generous spacing for contemplation

**Design Intention:**
- Invite quiet reading and reflection
- No rush, no pressure to complete
- Easy access to deeper teachings when ready
- Support for gradual deepening

#### 3. Inquire Screen
**Purpose:** Guided self-inquiry sequences

**Layout:**
```
┌─────────────────────────────────┐
│  Self-Inquiry                   │
│                                 │
│  Sequences                      │
│  ┌───────────────────────────┐ │
│  │ Who Am I?                 │ │
│  │ Foundational • 15-20 min  │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ What Is Aware?            │ │
│  │ Foundational • 10-15 min  │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ Investigating the Self    │ │
│  │ Intermediate • 15-20 min  │ │
│  └───────────────────────────┘ │
│  ...                            │
└─────────────────────────────────┘
```

**During Sequence:**
```
┌─────────────────────────────────┐
│  Who Am I?                      │
│  Step 3 of 8                    │
│                                 │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │  "Ask yourself:           │ │
│  │   Who am I?               │ │
│  │                           │ │  ← Current instruction
│  │   Don't answer with       │ │
│  │   thoughts..."            │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  [  Timer: 2:30 remaining  ]   │
│                                 │
│  [   Continue to Next Step  ]  │
│  [   Pause Sequence        ]   │
└─────────────────────────────────┘
```

**Features:**
- List of all inquiry sequences
- Filter by level (foundational/intermediate/advanced)
- Step-by-step guided practice
- Optional timer for each step
- Save progress (can resume later)
- Reflection notes after completion

**Design Intention:**
- Provide structure without rigidity
- Support investigation while allowing freedom
- Make deep inquiry accessible
- No pressure to complete

#### 4. Journal Screen
**Purpose:** Space for noting insights and reflections

**Layout:**
```
┌─────────────────────────────────┐
│  Journal                        │
│  [  + New Entry  ]              │
│                                 │
│  ┌───────────────────────────┐ │
│  │ Nov 19, 2025              │ │
│  │ "Today I noticed..."      │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ Nov 18, 2025              │ │
│  │ "The peace in deep..."    │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ Nov 15, 2025              │ │
│  │ "Recognition came..."     │ │
│  └───────────────────────────┘ │
│  ...                            │
└─────────────────────────────────┘
```

**Entry Screen:**
```
┌─────────────────────────────────┐
│  New Entry                      │
│  ← Back              [Save]     │
│                                 │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │                           │ │
│  │  (Blank space for         │ │  ← Simple text area
│  │   writing)                │ │
│  │                           │ │
│  │                           │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  Linked to: Sit & Be session   │  ← Optional link
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Simple, distraction-free writing
- Chronological list of entries
- Search by text or date
- Link entries to practice sessions
- Export all journal data
- Private by default (local only)

**Design Intention:**
- Space for noting insights without analysis
- No prompts, no requirements
- Support for clarifying recognition
- Completely optional

#### 5. Settings Screen
**Layout:**
```
┌─────────────────────────────────┐
│  Settings                       │
│                                 │
│  Appearance                     │
│  • Theme: Light / Dark / Auto  │
│  • Font Size: [  •  ]          │
│  • Reduce Motion: Off          │
│                                 │
│  Practice                       │
│  • Default Timer: 15 min       │
│  • End Sound: Bell             │
│  • Haptic Feedback: On         │
│                                 │
│  Reminders                      │
│  • Daily Reminder: On          │
│  • Time: 7:00 AM               │
│  • Frequency: Once per day     │
│                                 │
│  Data                           │
│  • Export Journal              │
│  • Export Practice History     │
│  • Clear All Data              │
│                                 │
│  About                          │
│  • Resources & Teachers        │
│  • Privacy Policy              │
│  • Version 1.0.0               │
└─────────────────────────────────┘
```

---

## Design System Principles

### Colors

**Light Theme:**
- Background: Warm off-white (#F9F8F6)
- Primary text: Deep charcoal (#2B2B2B)
- Secondary text: Warm gray (#6B6B6B)
- Accent: Earthy, grounded (terracotta, sage, ochre)
- Cards: Subtle warm white (#FFFFFF)

**Dark Theme:**
- Background: Deep, peaceful dark (#1A1A1A)
- Primary text: Soft white (#F0F0F0)
- Secondary text: Warm gray (#A0A0A0)
- Accent: Muted, gentle (dusty rose, sage, warm amber)
- Cards: Slightly lighter dark (#242424)

**Philosophy:**
- No harsh whites or blacks
- Warm, peaceful, grounded
- High contrast for accessibility
- Avoid bright, stimulating colors
- No purple gradients, no neon

### Typography

**Scale:**
- Display: 32-40px (headings, timer)
- Title: 24-28px (screen titles)
- Body: 16-18px (main content)
- Caption: 14px (metadata, labels)

**Spacing:**
- Generous line height: 1.6-1.8 for body text
- Ample paragraph spacing
- Breathing room in UI elements

**Font Choices (to be refined):**
- Display: Something warm, distinctive, peaceful
  - Consider: Cormorant Garamond, Spectral, Crimson Text
- Body: Highly readable, gentle
  - Consider: Source Serif Pro, Lora, EB Garamond

**Philosophy:**
- Readability above all
- Comfortable for extended reading
- Large enough by default (accessibility)
- Generous spacing for contemplation

### Spacing & Layout

**Padding/Margin Scale:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

**Screen Padding:**
- Mobile: 20px horizontal
- Tablet: 32px horizontal

**Card Spacing:**
- Internal padding: 20-24px
- Between cards: 16px
- Generous negative space

**Philosophy:**
- More space than feels necessary
- Room to breathe
- Not cramped or dense
- Peace in spaciousness

### Animations & Motion

**Timing:**
- Fast: 150ms (micro-interactions)
- Medium: 300ms (transitions)
- Slow: 500ms (page transitions)

**Easing:**
- Natural, organic curves
- No bouncy, playful easing
- Smooth, calm, peaceful

**When to Animate:**
- Page transitions (fade, slide)
- Modal appearances
- Timer start/stop states
- Gentle reveals for pointers
- Subtle hover states (web)

**When NOT to Animate:**
- User has reduced motion enabled
- Content loading (just appear)
- Frequent interactions (buttons)

**Philosophy:**
- Subtle, never jarring
- Support focus, not distract
- Honor accessibility preferences
- Peace in smoothness

### Component Patterns

**Buttons:**
- Clear, generous touch targets (44x44px minimum)
- Rounded corners (moderate, not extreme)
- Subtle shadows or borders
- Haptic feedback on press
- Disabled states clearly visible

**Cards:**
- Subtle elevation (shadow or border)
- Rounded corners
- Generous internal padding
- Breathable spacing

**Inputs:**
- Large, clear text
- Visible focus states
- Accessible labels
- Forgiving touch targets

**Modals:**
- Gentle backdrop blur
- Centered or slide from bottom
- Easy to dismiss
- No jarring animations

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- Text: Minimum 4.5:1 ratio
- Large text (18pt+): Minimum 3:1 ratio
- UI components: Minimum 3:1 ratio
- Test all color combinations

**Screen Reader Support:**
- All interactive elements labeled
- Semantic HTML/component structure
- Proper heading hierarchy
- Alternative text for any images/icons
- Announce dynamic content changes

**Keyboard Navigation:**
- All features accessible via keyboard (web)
- Clear focus indicators
- Logical tab order
- Skip links where appropriate

**Motor Accessibility:**
- Touch targets minimum 44x44px
- No time-dependent interactions
- Support for voice control
- Haptic feedback optional

**Cognitive Accessibility:**
- Simple, clear language
- Consistent navigation
- No flashing or rapid motion
- User controls pace (no auto-advance)

**Reduced Motion:**
- Respect prefers-reduced-motion
- Provide toggle in settings
- Essential animations can be reduced/removed
- Never required for understanding

**Text Sizing:**
- Support up to 200% zoom
- Font size setting in app
- Layout doesn't break at large sizes
- Relative units (not fixed px)

---

## Performance Targets

**Load Time:**
- App launch: < 2 seconds
- Screen transitions: < 300ms
- Content loading: Instant (local)

**Memory:**
- Idle: < 100MB
- Active use: < 150MB
- No memory leaks

**Battery:**
- Minimal background usage
- No constant location/network polling
- Efficient timer implementation
- Audio optimized for low power

**Storage:**
- Initial install: < 20MB
- With content: < 50MB
- Journal/data: Grows with use but compressed

**Offline:**
- 100% functional offline
- No network required for any core feature
- Optional sync in future phases

---

## Security & Privacy

**Data Storage:**
- All data stored locally by default
- SQLite encrypted at rest (SQLCipher)
- No analytics, no tracking
- No third-party SDKs (except essential)

**Permissions:**
- Notifications: Optional, user controls
- No location, camera, contacts, etc.
- Minimal permission surface

**Privacy Policy:**
- Clear, simple language
- No data collection
- No data sharing
- User owns their data
- Easy export and deletion

**Future Backend (if added):**
- End-to-end encryption for synced data
- Zero-knowledge architecture
- User can delete all server data
- Optional, not required

---

## Development Workflow

### Phase 1: Foundation (Week 1-2)
1. Initialize Expo project
2. Set up navigation structure
3. Implement design system (theme, components)
4. Create base UI components
5. Set up local storage (AsyncStorage + SQLite)

### Phase 2: Core Features (Week 3-6)
1. Sit and Be timer
2. Daily pointers display
3. Contemplations library
4. Settings screen
5. Content loading from JSON

### Phase 3: Advanced Features (Week 7-10)
1. Self-inquiry sequences
2. Journal functionality
3. Bookmarks
4. Daily reminders
5. Practice history

### Phase 4: Polish (Week 11-12)
1. Animations and transitions
2. Accessibility review
3. Performance optimization
4. Testing (manual + automated)
5. Icon, splash screen, app store assets

### Phase 5: Launch Prep (Week 13-14)
1. TestFlight/Beta testing
2. Bug fixes
3. App Store/Play Store submission
4. Documentation
5. Launch!

---

## Testing Strategy

**Unit Tests:**
- Core logic (content loading, storage)
- State management
- Utility functions

**Integration Tests:**
- Navigation flows
- Data persistence
- Timer functionality

**E2E Tests (Detox):**
- Critical user paths
- Sit and practice a session
- Browse and bookmark content
- Write journal entry

**Manual Testing:**
- Accessibility with screen readers
- Different screen sizes
- Different OS versions
- Performance on low-end devices

**Beta Testing:**
- Real users from non-dual community
- Feedback on UX and peace
- Bug reports and edge cases

---

## Success Metrics (Non-Traditional)

We don't measure engagement or DAU. We measure:

**Qualitative:**
- User reports of peace/recognition
- Feedback on helpfulness
- Does it serve the teachings?
- Does it point to truth?

**Technical:**
- App stability (crash-free rate > 99%)
- Performance metrics
- Accessibility compliance
- User-reported bugs

**Sustainability:**
- Can be maintained long-term
- Code quality and clarity
- Documentation completeness
- Community contributions (if open source)

---

## Open Questions to Resolve

1. **Font Selection:** Need to choose specific fonts that embody peace and clarity
2. **Color Palette:** Need to finalize specific color values
3. **Icon Design:** App icon and in-app iconography approach
4. **Sound Design:** Source or create gentle bell/chime sounds
5. **Content Updates:** How to update content library (app updates vs. remote fetch?)
6. **Community Features:** Include in v1 or save for later?
7. **Open Source:** Make the app open source? When?
8. **Monetization:** Free with donations? One-time purchase? Grants?

---

*This architecture serves the recognition of Awareness. Every technical decision should honor simplicity, peace, and the direct path to what is already present.*

*Last updated: November 19, 2025*
