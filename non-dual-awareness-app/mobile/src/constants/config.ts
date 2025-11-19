/**
 * App Configuration
 * Core constants and settings for the Non-Dual Awareness App
 */

export const AppConfig = {
  name: 'Awareness',
  version: '1.0.0',
  description: 'A companion for recognizing your true nature as awareness',

  // Timer defaults
  timer: {
    defaultDuration: 15, // minutes
    durations: [5, 10, 15, 20, 30], // available quick selections
    defaultSound: 'bell' as 'bell' | 'chime' | 'silence',
  },

  // Daily reminders
  reminders: {
    defaultEnabled: false,
    defaultTime: '07:00',
    defaultFrequency: 'once' as 'once' | 'twice' | 'three',
  },

  // Content paths
  content: {
    dailyPointersPath: '../../content/daily-pointers.json',
    coreTeachingsPath: '../../content/core-teachings.json',
    inquirySequencesPath: '../../content/self-inquiry-sequences.json',
    externalResourcesPath: '../../content/external-resources.json',
  },

  // Accessibility
  accessibility: {
    defaultFontSize: 'medium' as 'small' | 'medium' | 'large' | 'extra-large',
    defaultReducedMotion: false,
    defaultHapticFeedback: true,
  },

  // Database
  database: {
    name: 'awareness.db',
    version: 1,
  },
};

export default AppConfig;
