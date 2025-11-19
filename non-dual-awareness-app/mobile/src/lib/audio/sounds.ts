/**
 * Audio Playback
 * Handles playing sounds for timer completion
 */

import { Audio } from 'expo-av';

// Sound instances
let bellSound: Audio.Sound | null = null;
let chimeSound: Audio.Sound | null = null;

/**
 * Initialize audio system
 */
export const initAudio = async (): Promise<void> => {
  try {
    // Set audio mode
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    // Preload sounds when audio files are available
    // For now, these are placeholders
    // bellSound = await Audio.Sound.createAsync(require('../../assets/sounds/bell.mp3'));
    // chimeSound = await Audio.Sound.createAsync(require('../../assets/sounds/chime.mp3'));

    console.log('Audio system initialized');
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};

/**
 * Play timer completion sound
 */
export const playTimerSound = async (soundType: 'bell' | 'chime' | 'silence'): Promise<void> => {
  if (soundType === 'silence') {
    return;
  }

  try {
    // For now, since we don't have actual sound files, just log
    console.log(`Playing ${soundType} sound`);

    // When sound files are available:
    /*
    if (soundType === 'bell' && bellSound) {
      await bellSound.replayAsync();
    } else if (soundType === 'chime' && chimeSound) {
      await chimeSound.replayAsync();
    }
    */
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

/**
 * Cleanup audio resources
 */
export const cleanupAudio = async (): Promise<void> => {
  try {
    if (bellSound) {
      await bellSound.unloadAsync();
      bellSound = null;
    }
    if (chimeSound) {
      await chimeSound.unloadAsync();
      chimeSound = null;
    }
  } catch (error) {
    console.error('Error cleaning up audio:', error);
  }
};

export default {
  initAudio,
  playTimerSound,
  cleanupAudio,
};
