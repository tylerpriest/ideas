/**
 * Font Loading Hook
 * Loads custom fonts for the app
 */

import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<Error | null>(null);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      // For now, we're using system fonts as placeholders
      // When custom fonts are added to assets/fonts/, uncomment and configure:

      /*
      await Font.loadAsync({
        'CrimsonText-Regular': require('../assets/fonts/CrimsonText-Regular.ttf'),
        'CrimsonText-Semibold': require('../assets/fonts/CrimsonText-Semibold.ttf'),
        'SourceSerifPro-Regular': require('../assets/fonts/SourceSerifPro-Regular.ttf'),
        'SourceSerifPro-Semibold': require('../assets/fonts/SourceSerifPro-Semibold.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
      });
      */

      // For development, mark fonts as loaded immediately with system fallbacks
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts:', error);
      setFontError(error as Error);
      // Still mark as loaded to use system fonts
      setFontsLoaded(true);
    }
  };

  return { fontsLoaded, fontError };
};
