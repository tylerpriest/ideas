/**
 * Timer Store
 * Manages meditation timer state
 */

import { create } from 'zustand';

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

interface TimerStore {
  duration: number; // Total duration in seconds
  remaining: number; // Remaining time in seconds
  state: TimerState;
  startTime: number | null; // Timestamp when started
  pausedAt: number | null; // Timestamp when paused

  // Actions
  start: (duration: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  tick: () => void;
  setDuration: (duration: number) => void;
  complete: () => void;
  reset: () => void;
}

export const useTimer = create<TimerStore>((set, get) => ({
  duration: 900, // 15 minutes default
  remaining: 900,
  state: 'idle',
  startTime: null,
  pausedAt: null,

  start: (duration) => {
    const durationInSeconds = duration * 60;
    set({
      duration: durationInSeconds,
      remaining: durationInSeconds,
      state: 'running',
      startTime: Date.now(),
      pausedAt: null,
    });
  },

  pause: () => {
    const state = get();
    if (state.state === 'running') {
      set({
        state: 'paused',
        pausedAt: Date.now(),
      });
    }
  },

  resume: () => {
    const state = get();
    if (state.state === 'paused' && state.pausedAt && state.startTime) {
      const pausedDuration = Date.now() - state.pausedAt;
      set({
        state: 'running',
        startTime: state.startTime + pausedDuration,
        pausedAt: null,
      });
    }
  },

  stop: () => {
    set({
      state: 'idle',
      remaining: get().duration,
      startTime: null,
      pausedAt: null,
    });
  },

  tick: () => {
    const state = get();
    if (state.state === 'running' && state.startTime) {
      const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      const remaining = Math.max(0, state.duration - elapsed);

      if (remaining === 0) {
        state.complete();
      } else {
        set({ remaining });
      }
    }
  },

  setDuration: (duration) => {
    const durationInSeconds = duration * 60;
    set({
      duration: durationInSeconds,
      remaining: durationInSeconds,
    });
  },

  complete: () => {
    set({
      state: 'completed',
      remaining: 0,
    });
  },

  reset: () => {
    set({
      duration: 900,
      remaining: 900,
      state: 'idle',
      startTime: null,
      pausedAt: null,
    });
  },
}));
