# Design System
## Non-Dual Awareness App

> "Peace is revealed in simplicity. Let the design point to spaciousness."

---

## Design Philosophy

This app serves **Awareness recognizing itself**. Every design choice should:

1. **Create spaciousness** - Generous white space, room to breathe
2. **Invite stillness** - Calm, peaceful, never jarring or demanding
3. **Support clarity** - Simple, clear, easy to understand
4. **Honor accessibility** - Available to all, regardless of ability
5. **Avoid manipulation** - No dark patterns, no engagement hacking
6. **Be distinctive** - Unique aesthetic that serves the teaching

### What This App Is Not

- ❌ Not gamified (no streaks, badges, levels)
- ❌ Not stimulating (no bright colors, rapid motion)
- ❌ Not complex (no hidden features, deep menus)
- ❌ Not generic (no cookie-cutter UI kit aesthetics)

### What This App Is

- ✅ Peaceful support for recognition
- ✅ Beautiful in service of the teaching
- ✅ Simple and immediately usable
- ✅ Distinctive and memorable
- ✅ Accessible to everyone

---

## Visual Direction

### Aesthetic: "Contemplative Minimalism"

A refined, distinctive minimalism that creates space for awareness:

**Characteristics:**
- Generous negative space (more than typical apps)
- Warm, natural color palette (not cold tech)
- Distinctive serif typography (not generic sans)
- Subtle, organic shapes (soft rounded corners)
- Gentle motion (smooth, never jarring)
- High contrast for accessibility
- Material feel (paper-like, not glass-like)

**Inspiration Sources:**
- Japanese ma (negative space)
- Scandinavian simplicity with warmth
- Book design (contemplative reading)
- Natural materials and textures
- Sacred geometry (subtle, not overt)

**Not:**
- Clinical tech minimalism
- Stark brutalism
- Busy maximalism
- Playful toy-like
- Luxury gold/gradients

---

## Color Palette

### Light Theme: "Warm Clarity"

**Primary Colors:**
```
Background:     #FAF9F7  (warm off-white, like aged paper)
Surface:        #FFFFFF  (pure white for cards)
Primary Text:   #2C2A27  (deep warm gray, almost black)
Secondary Text: #6B6662  (warm medium gray)
Tertiary Text:  #9C9893  (light warm gray)
```

**Accent Colors:**
```
Primary Accent:   #8B7355  (warm earth - ochre/clay)
Secondary Accent: #A8956D  (sage/olive - natural)
Gentle Alert:     #C17D5D  (terracotta - warm, not alarming)
Success/Growth:   #7D9C8B  (soft sage green)
```

**Interactive States:**
```
Focus Ring:       #8B7355  (primary accent)
Hover Background: #F5F3F0  (slightly darker than bg)
Pressed:          #EBE8E3  (more pronounced)
Disabled Text:    #C5C0BA  (very light gray)
```

**Rationale:**
- Warm, natural, grounded (connects to earth, body)
- High contrast for readability
- No harsh whites or blacks (gentle on eyes)
- Accent colors are muted, organic
- Feels like quality paper, not digital screen

### Dark Theme: "Peaceful Darkness"

**Primary Colors:**
```
Background:     #1C1A18  (deep warm dark, not pure black)
Surface:        #28251F  (slightly lighter for cards)
Primary Text:   #F0EDEA  (soft off-white)
Secondary Text: #A8A39D  (warm medium gray)
Tertiary Text:  #6B6662  (darker gray)
```

**Accent Colors:**
```
Primary Accent:   #B89968  (lighter warm earth for contrast)
Secondary Accent: #9FA887  (muted sage)
Gentle Alert:     #C9876B  (soft terracotta)
Success/Growth:   #8EAD9A  (gentle sage)
```

**Interactive States:**
```
Focus Ring:       #B89968  (primary accent)
Hover Background: #2F2C26  (slightly lighter)
Pressed:          #35312A  (more pronounced)
Disabled Text:    #4A4540  (dark gray)
```

**Rationale:**
- True OLED black avoided (warm dark feels more peaceful)
- Still high contrast for accessibility
- Warm undertones prevent coldness
- Gentle on eyes in low light
- Feels like peaceful evening, not harsh night mode

### Color Usage Guidelines

**Backgrounds:**
- Use primary background for main screen
- Use surface for cards, modals
- Never pure white/black

**Text:**
- Primary text for headings, body content
- Secondary for metadata, labels
- Tertiary for disabled or de-emphasized

**Accents:**
- Primary accent for CTAs, focus, active states
- Secondary accent for supporting elements
- Gentle alert for non-critical notices
- Success/growth sparingly (completed sessions, etc.)

**Accessibility:**
- All text combinations meet WCAG AA (4.5:1 minimum)
- Interactive elements meet 3:1 minimum
- Test with color blindness simulators
- Never rely on color alone for meaning

---

## Typography

### Font Selection

**Display Font: Crimson Text** (Serif)
- Warm, classical, contemplative
- Excellent readability at large sizes
- Free, open source (Google Fonts)
- Weights: 400 (Regular), 600 (Semibold)
- Use for: Timer display, screen headings, daily pointers

**Body Font: Source Serif Pro** (Serif)
- Designed for screen reading
- Warm, approachable, clear
- Free, open source (Adobe Fonts/Google Fonts)
- Weights: 400 (Regular), 600 (Semibold)
- Use for: Body text, teachings, journal

**UI Font: Inter** (Sans-serif)
- Only for UI labels, buttons, navigation
- Clean, neutral, high legibility
- Variable font (efficient)
- Weights: 400, 500, 600

**Why Serif for Content:**
- Serif fonts slow down reading (good for contemplation)
- Feel more "book-like" (supports reflective reading)
- Distinctive from typical apps
- Warm, human quality
- Crimson Text + Source Serif pair beautifully

**Fallbacks:**
```css
font-family: 'Crimson Text', 'Georgia', 'Times New Roman', serif;
font-family: 'Source Serif Pro', 'Georgia', serif;
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

```
Display Large:  40px / 48px line-height (1.2)   - Timer, hero text
Display:        32px / 40px line-height (1.25)  - Screen titles
Title Large:    28px / 36px line-height (1.3)   - Card titles
Title:          24px / 32px line-height (1.35)  - Section headings
Body Large:     20px / 34px line-height (1.7)   - Daily pointers, important content
Body:           18px / 30px line-height (1.7)   - Main content, teachings
Body Small:     16px / 26px line-height (1.6)   - Smaller body text
Label:          14px / 20px line-height (1.4)   - UI labels, metadata
Caption:        12px / 16px line-height (1.35)  - Very small text, captions
```

**Line Height Philosophy:**
- Body text uses 1.6-1.7 (generous for contemplation)
- Headings use tighter line-height (1.2-1.35)
- Never less than 1.2 anywhere

### Font Weights

```
Regular: 400  - Body text, default
Medium:  500  - UI elements (Inter only)
Semibold: 600 - Headings, emphasis, buttons
```

**No Bold (700+):**
- Too strong, too loud
- Semibold (600) provides enough emphasis
- Keeps aesthetic refined, not shouty

### Typography Utilities

**Headings:**
```
h1: Display (32px Crimson Text Semibold)
h2: Title Large (28px Crimson Text Semibold)
h3: Title (24px Crimson Text Semibold)
h4: Body Large (20px Source Serif Semibold)
```

**Body:**
```
Default: 18px Source Serif Regular
Large: 20px Source Serif Regular (for pointers, key teachings)
Small: 16px Source Serif Regular
```

**UI:**
```
Button: 16px Inter Medium
Label: 14px Inter Regular
Tab Label: 14px Inter Medium
```

**Special:**
```
Timer: 40-60px Crimson Text Semibold (depends on screen size)
Daily Pointer: 20-24px Source Serif Regular, center-aligned
```

### Text Styling

**Paragraph Spacing:**
- Space between paragraphs: 1em (matches font size)
- First paragraph: no indent
- Subsequent paragraphs: optional 1.5em indent OR additional spacing

**Letter Spacing:**
- Body text: 0 (default)
- Headings: -0.01em (slightly tighter)
- UI labels: 0.01em (slightly looser for clarity)
- ALL CAPS: 0.05em (if ever used, which should be rare)

**Text Alignment:**
- Body content: Left-aligned (never justified - ragged right easier to read)
- Pointers/quotes: Can be centered for emphasis
- Headings: Left-aligned usually, centered for special cases
- Never right-aligned except for specific design reasons

---

## Spacing System

### Base Unit: 4px

All spacing uses multiples of 4px for consistency and rhythm:

```
0:    0px      - No spacing
1:    4px      - Tight spacing, micro-adjustments
2:    8px      - Small spacing
3:    12px     - Medium-small
4:    16px     - Medium (base unit for most UI)
5:    20px     - Medium-large
6:    24px     - Large
8:    32px     - Extra large
10:   40px     - 2X large
12:   48px     - 3X large
16:   64px     - 4X large
20:   80px     - 5X large
24:   96px     - 6X large (rare, major sections)
```

### Component Spacing

**Buttons:**
- Padding: 16px horizontal, 12px vertical (medium button)
- Padding Large: 24px horizontal, 16px vertical
- Gap between buttons: 12px

**Cards:**
- Internal padding: 24px all sides
- Between cards: 16px
- Card to screen edge: 20px

**Screen Padding:**
- Mobile: 20px horizontal
- Tablet: 32px horizontal
- Top/bottom: 24px minimum

**Text Spacing:**
- Heading to body: 12px
- Paragraph to paragraph: 16px (1em at 16px)
- Section to section: 32-48px

**Form Elements:**
- Label to input: 8px
- Input to input: 16px
- Field group spacing: 24px

### Generous Spacing Philosophy

This app uses **more space** than typical apps:

- Screens feel uncramped, breathable
- Content has room to exist peacefully
- User doesn't feel rushed or overwhelmed
- Supports contemplation, not rapid interaction

**Comparison:**
- Typical app card padding: 12-16px
- This app: 24px minimum
- Typical between-element spacing: 8-12px
- This app: 16-24px

---

## Layout & Grid

### Screen Layouts

**Mobile (< 768px):**
- Single column
- Full-width content with side padding
- Stack all elements vertically

**Tablet (768px - 1024px):**
- Can use two-column layouts sparingly
- Mostly centered single column (max 600px wide)
- More generous side padding

**Large Screens (> 1024px - web future):**
- Centered layout, max 680px content width
- Very generous side margins
- Consider sidebar for navigation

### Modals & Overlays

**Modal Sizing:**
- Mobile: Full screen or slide-up sheet
- Tablet/Desktop: Centered, max 500px wide
- Never edge-to-edge (leave margins)

**Modal Padding:**
- Internal: 24px all sides minimum
- From screen edges: 20px minimum

### Safe Areas (Mobile)

- Respect iOS safe area insets
- Android navigation/status bars
- Account for notches, camera cutouts
- Never place interactive elements in unsafe zones

---

## Components

### Buttons

**Primary Button:**
```
Background: Primary Accent (#8B7355)
Text: White or off-white (#FAF9F7)
Padding: 16px horizontal, 12px vertical
Border Radius: 12px
Font: 16px Inter Medium
Shadow: Subtle (0 2px 8px rgba(0,0,0,0.1))

Hover: Slightly darker background
Pressed: More pronounced shadow, slight scale (0.98)
Disabled: Reduced opacity (0.4), no interaction
```

**Secondary Button:**
```
Background: Transparent
Text: Primary Accent
Border: 2px solid Primary Accent
Padding: 14px horizontal, 10px vertical (account for border)
Border Radius: 12px
Font: 16px Inter Medium

Hover: Light background (primary accent at 10% opacity)
Pressed: Slightly darker background
```

**Text Button:**
```
Background: None
Text: Primary Accent
Padding: 8px horizontal, 8px vertical
Font: 16px Inter Medium
Underline: None (only on hover if at all)

Hover: Slight background
Pressed: More background
```

**Icon Button:**
```
Size: 44x44px minimum (accessibility)
Icon size: 24px
Border Radius: 50% (circular) or 12px (rounded square)
Background: Transparent or surface color

Hover: Light background
Pressed: Darker background
```

### Cards

**Standard Card:**
```
Background: Surface color (#FFFFFF in light, #28251F in dark)
Border Radius: 16px
Padding: 24px
Shadow: 0 2px 12px rgba(0,0,0,0.08)
Border: Optional 1px subtle border for definition

Content spacing: 16px between elements
```

**Interactive Card (tappable):**
```
Same as standard +
Hover/Press states
Ripple effect on press (native)
Active state: slight scale or shadow change
```

**Pointer Card (Daily Pointer):**
```
Larger padding: 32px
Centered text
Background: Subtle gradient or texture (very subtle)
Special typography (20-24px)
Quote marks optional (typographic)
```

### Inputs

**Text Input:**
```
Background: Surface or slightly darker
Border: 2px solid tertiary text color
Border Radius: 12px
Padding: 16px
Font: 16px Source Serif Regular
Min Height: 48px (accessibility)

Focus: Border color changes to primary accent, thicker (2px -> 2px accent)
Error: Border red/alert color
Disabled: Reduced opacity, no interaction
```

**Text Area (Journal):**
```
Same as text input +
Min height: 200px
Resize: Vertical only (mobile) or auto-grow
Generous padding for writing comfort
```

### Navigation

**Tab Bar (Bottom):**
```
Height: 64px + safe area inset
Background: Surface color
Top border: 1px subtle border
Icons: 24px, centered above labels
Labels: 12px Inter Medium
Active color: Primary accent
Inactive color: Secondary text

States:
- Active: Full color icon + label
- Inactive: Muted icon + label
- Press: Gentle scale or opacity change
```

**Stack Navigation Header:**
```
Height: 56px + safe area inset
Background: Background color or surface
Title: 20px Crimson Text Semibold, centered or left
Back button: Left side, "<" icon + "Back" text
Actions: Right side (Settings, etc.)

Border: Optional bottom border 1px
Shadow: None or very subtle
```

### Modals

**Full Screen Modal:**
```
Background: Background color
Header: Title + close button
Content: Scrollable, padded
Footer: Actions if needed

Transition: Slide up from bottom or fade
Dismiss: Swipe down, close button, or backdrop tap
```

**Sheet Modal (bottom):**
```
Rounded top corners: 24px
Handle: Optional pill-shaped handle at top
Content: Flexible height, up to 90% screen
Backdrop: Semi-transparent dark overlay

Transition: Slide up from bottom
Dismiss: Swipe down, close button, backdrop tap
```

### Lists

**Simple List:**
```
Item height: 64px minimum (comfortable tap target)
Padding: 16px horizontal
Dividers: 1px, very subtle
Icon: Optional, 24px, left-aligned
Text: 16px, left-aligned
Meta: 14px, right-aligned or below
```

**Card List (Contemplations, Sequences):**
```
Each item is a card (see Card component)
Spacing between: 16px
Can show preview text, metadata
Tap/press states
```

### Timer Display

**Large Timer:**
```
Font: 48-60px Crimson Text Semibold
Color: Primary text
Centered on screen
Monospace or tabular numbers for stability
Format: MM:SS or HH:MM:SS

Progress indicator: Optional circular or linear
Subtle, not distracting
```

---

## Iconography

### Icon Style

**Approach: Outlined, Minimal**
- Line weight: 2px (matches aesthetic refinement)
- Rounded caps and joins
- Minimal detail, essential only
- 24x24px default size
- Scales to 20px, 28px, 32px as needed

**Icon Source:**
- Lucide Icons (open source, beautiful, consistent)
- Or custom designed to match
- No emoji, no filled icons (except active states)

### Icon Usage

**Navigation Tabs:**
- Home/Sit: Circle or lotus icon
- Contemplate: Book or leaf icon
- Inquire: Question mark or spiral icon
- Journal: Pen or journal icon
- Settings: Gear or sliders icon

**UI Elements:**
- Back: Chevron left
- Close: X
- Add: Plus
- More: Three dots
- Search: Magnifying glass
- Bookmark: Bookmark outline (filled when active)
- Play/Pause: Triangle/bars
- Settings: Gear

**Semantic:**
- Success: Checkmark (use sparingly)
- Alert: Exclamation (use sparingly)
- Info: "i" in circle

### Icon Colors

- Default: Secondary text color
- Active/Selected: Primary accent
- Disabled: Tertiary text (very light)
- Never multiple colors in one icon

---

## Motion & Animation

### Animation Principles

1. **Purpose**: Every animation serves a function (feedback, orientation, delight)
2. **Subtlety**: Gentle, never jarring or attention-seeking
3. **Performance**: 60fps minimum, optimized for mobile
4. **Accessibility**: Respects reduced-motion preferences

### Timing

**Duration:**
- Micro (hover, press): 100-150ms
- Normal (transitions): 250-350ms
- Large (page changes): 400-500ms
- Never longer than 500ms

**Easing:**
- Ease-out: Elements entering screen (decelerating)
- Ease-in: Elements leaving screen (accelerating)
- Ease-in-out: Elements moving within screen
- **No bounce, elastic, or playful easing** - only smooth, natural curves

### Specific Animations

**Screen Transitions:**
- Fade + slight slide (50px)
- Duration: 300ms
- Easing: Ease-in-out
- Feels like gentle page turn

**Modal Appearance:**
- Slide up from bottom
- Backdrop fades in
- Duration: 350ms
- Easing: Ease-out

**Button Press:**
- Scale: 0.96 (subtle)
- Duration: 100ms
- Easing: Ease-out
- Haptic feedback on press

**Card Hover (web):**
- Lift: Shadow increases
- Duration: 200ms
- Easing: Ease-out

**Timer Start/Stop:**
- Gentle scale pulse (1.0 -> 1.02 -> 1.0)
- Duration: 600ms
- Easing: Ease-in-out
- One-time, not looping

**Content Reveal (Daily Pointer):**
- Fade in + subtle scale (0.98 -> 1.0)
- Duration: 500ms
- Easing: Ease-out
- Staggered if multiple elements (100ms delay between)

### Reduced Motion

When user enables reduced motion:
- No scale, slide, or fade animations
- Instant transitions (0ms or very fast 50ms)
- Only essential state changes
- No decorative motion
- Timer still functions, just no fancy transitions

---

## Sound Design

### Audio Purpose

Sound is **optional support**, never required:
- Gentle notification of timer completion
- Optional bell for starting practice
- No background music, no constant sounds
- User can choose silence

### Sound Characteristics

**Timer End Bell:**
- Single chime, not repeating
- 1-3 seconds duration
- Warm, peaceful tone (singing bowl, bell, chime)
- Not alarming or startling
- Medium volume, user can adjust

**Timer Start (optional):**
- Briefer sound, if any
- Gentle notification of beginning

### Sound Options

**Provided Sounds:**
1. **Tibetan Singing Bowl**: Warm, resonant, peaceful
2. **Simple Bell**: Clear, gentle chime
3. **Wood Block**: Subtle, natural
4. **Silence**: No sound (default for many users)

**Volume:**
- Respects device volume
- App-level volume control (optional)
- Never overrides user's mute settings

**File Format:**
- MP3 or AAC (widely supported)
- High quality (256kbps)
- Small file size (< 100KB each)

---

## Haptic Feedback

### When to Use

- Button presses (optional, user can disable)
- Timer start/stop
- Completing a practice session
- Saving journal entry
- Delicate, supporting interactions

### Haptic Types (iOS)

- **Light**: Subtle tap (most UI interactions)
- **Medium**: Noticeable tap (important actions)
- **Heavy**: Firm tap (rarely used)
- **Success**: Gentle pattern (completing session)

### Haptic Guidelines

- User can disable entirely in settings
- Never continuous or repeating
- Supports action, doesn't distract
- Follows platform conventions

---

## Accessibility

### Color & Contrast

✅ All text meets WCAG AA (4.5:1 minimum)
✅ Large text meets 3:1 minimum
✅ UI components meet 3:1 minimum
✅ Focus indicators clearly visible (2px accent color)
✅ Never rely on color alone for information

### Typography & Readability

✅ Minimum 16px body text (18px default)
✅ Generous line height (1.6-1.8)
✅ User can increase font size (settings)
✅ Layout doesn't break at 200% zoom
✅ High contrast text/background
✅ No justified text (harder to read)

### Touch Targets

✅ Minimum 44x44px (iOS guideline)
✅ Spacing between targets (8px minimum)
✅ Large touch areas for key interactions
✅ Forgiving hit areas (extends beyond visual)

### Screen Readers

✅ All interactive elements labeled
✅ Semantic structure (headings, lists)
✅ Proper reading order
✅ Dynamic content announced
✅ Images have alt text (if any)
✅ Focus management in modals

### Motion & Timing

✅ Respect prefers-reduced-motion
✅ In-app reduced motion toggle
✅ No auto-advancing content
✅ No time limits on reading
✅ User controls pace entirely
✅ Pause/resume all timed activities

### Keyboard & Alternative Input

✅ All features keyboard accessible (web/tablet)
✅ Visible focus indicators
✅ Logical tab order
✅ Keyboard shortcuts documented (web)
✅ Voice control compatible

### Cognitive Accessibility

✅ Simple, clear language
✅ Consistent navigation
✅ One task per screen
✅ Clear calls to action
✅ No flashing or rapid changes (seizure risk)
✅ User can review/undo important actions

---

## Platform-Specific Considerations

### iOS

- Use SF Symbols where appropriate (native icons)
- Respect safe area insets (notch, home indicator)
- Support dark mode (automatic)
- Haptic feedback (Taptic Engine)
- Native gestures (swipe back, pull to refresh if applicable)

### Android

- Material Design influences (where appropriate, not strictly)
- Respect navigation bars and notches
- Back button behavior
- Haptic feedback (where supported)
- Adaptive icons

### Responsive Design

**Mobile (320px - 767px):**
- Single column layouts
- Full-width elements with padding
- Stack all content vertically
- Prioritize essential content

**Tablet (768px - 1024px):**
- Wider max-width (600-800px)
- More generous margins
- Potentially two-column where it makes sense
- Larger typography

**Desktop/Web (1024px+):**
- Centered content, max 680px wide
- Sidebar navigation (optional)
- Hover states
- Keyboard navigation
- Consider two-panel layouts

---

## Design Checklist

Before shipping any screen:

**Visual:**
- [ ] Matches color palette (no random colors)
- [ ] Typography scale followed
- [ ] Spacing system used (multiples of 4px)
- [ ] Generous white space present
- [ ] No harsh contrast (warm, gentle colors)
- [ ] Distinctive, not generic

**Interaction:**
- [ ] All interactive elements 44x44px minimum
- [ ] Clear hover/press states
- [ ] Smooth animations (300ms or less)
- [ ] Haptic feedback where appropriate
- [ ] Loading states handled

**Accessibility:**
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader labels present
- [ ] Keyboard navigable (web)
- [ ] Reduced motion supported
- [ ] Font size can increase
- [ ] Focus indicators visible

**Content:**
- [ ] Clear, simple language
- [ ] Serves recognition of awareness
- [ ] No engagement manipulation
- [ ] Helpful, not demanding
- [ ] Points to what's already present

**Performance:**
- [ ] Fast loading
- [ ] Smooth 60fps
- [ ] No jank or lag
- [ ] Works offline
- [ ] Efficient battery use

---

## Resources

**Fonts:**
- Crimson Text: https://fonts.google.com/specimen/Crimson+Text
- Source Serif Pro: https://fonts.google.com/specimen/Source+Serif+Pro
- Inter: https://rsms.me/inter/

**Icons:**
- Lucide: https://lucide.dev

**Accessibility:**
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- iOS Accessibility: https://developer.apple.com/accessibility/
- Android Accessibility: https://developer.android.com/guide/topics/ui/accessibility

**Color Tools:**
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- Color Blind Simulator: https://www.color-blindness.com/coblis-color-blindness-simulator/

---

*"Let the design serve awareness. Every pixel, every interaction, every moment should point to the peace that is already present."*

*Last updated: November 19, 2025*
