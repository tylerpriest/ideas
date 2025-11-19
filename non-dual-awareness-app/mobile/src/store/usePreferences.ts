/**
 * Preferences Store
 * Manages user preferences and settings using Zustand
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark' | 'auto';
export type FontSize = 'small' | 'medium' | 'large' | 'extra-large';
export type TimerSound = 'bell' | 'chime' | 'silence';

export interface Preferences {
  // Appearance
  theme: Theme;
  fontSize: FontSize;
  reducedMotion: boolean;

  // Practice
  defaultTimerDuration: number; // minutes
  timerSound: TimerSound;
  hapticFeedback: boolean;

  // Reminders
  dailyReminderEnabled: boolean;
  dailyReminderTime: string; // HH:mm format
  dailyReminderFrequency: 'once' | 'twice' | 'three';

  // Content
  lastDailyPointerIndex: number;
  lastDailyPointerDate: string; // ISO date string

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

interface PreferencesState extends Preferences {
  // Actions
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
  setReducedMotion: (enabled: boolean) => void;
  setDefaultTimerDuration: (duration: number) => void;
  setTimerSound: (sound: TimerSound) => void;
  setHapticFeedback: (enabled: boolean) => void;
  setDailyReminder: (enabled: boolean, time?: string, frequency?: 'once' | 'twice' | 'three') => void;
  updateDailyPointer: (index: number) => void;
  loadPreferences: () => Promise<void>;
  savePreferences: () => Promise<void>;
  resetPreferences: () => Promise<void>;
}

const STORAGE_KEY = '@awareness:preferences';

const defaultPreferences: Preferences = {
  theme: 'auto',
  fontSize: 'medium',
  reducedMotion: false,
  defaultTimerDuration: 15,
  timerSound: 'bell',
  hapticFeedback: true,
  dailyReminderEnabled: false,
  dailyReminderTime: '07:00',
  dailyReminderFrequency: 'once',
  lastDailyPointerIndex: 0,
  lastDailyPointerDate: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const usePreferences = create<PreferencesState>((set, get) => ({
  ...defaultPreferences,

  setTheme: (theme) => {
    set({ theme, updatedAt: new Date().toISOString() });
    get().savePreferences();
  },

  setFontSize: (fontSize) => {
    set({ fontSize, updatedAt: new Date().toISOString() });
    get().savePreferences();
  },

  setReducedMotion: (reducedMotion) => {
    set({ reducedMotion, updatedAt: new Date().toISOString() });
    get().savePreferences();
  },

  setDefaultTimerDuration: (defaultTimerDuration) => {
    set({ defaultTimerDuration, updatedAt: new Date().toISOString() });
    get().savePreferences();
  },

  setTimerSound: (timerSound) => {
    set({ timerSound, updatedAt: new Date().toISOString() });
    get().savePreferences();
  },

  setHapticFeedback: (hapticFeedback) => {
    set({ hapticFeedback, updatedAt: new Date().toISOString() });
    get().savePreferences();
  },

  setDailyReminder: (enabled, time, frequency) => {
    set({
      dailyReminderEnabled: enabled,
      ...(time && { dailyReminderTime: time }),
      ...(frequency && { dailyReminderFrequency: frequency }),
      updatedAt: new Date().toISOString(),
    });
    get().savePreferences();
  },

  updateDailyPointer: (index) => {
    set({
      lastDailyPointerIndex: index,
      lastDailyPointerDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString(),
    });
    get().savePreferences();
  },

  loadPreferences: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        set(parsed);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  },

  savePreferences: async () => {
    try {
      const state = get();
      const { loadPreferences, savePreferences, resetPreferences, ...preferences } = state;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  resetPreferences: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({
        ...defaultPreferences,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to reset preferences:', error);
    }
  },
}));
