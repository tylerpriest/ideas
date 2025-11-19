/**
 * Main App Entry Point
 * Non-Dual Awareness App - Serving the recognition of Awareness
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { usePreferences } from './src/store/usePreferences';
import TabLayout from './src/app/(tabs)/_layout';

export default function App() {
  const { theme, loadPreferences } = usePreferences();

  // Load preferences on app start
  useEffect(() => {
    loadPreferences();
  }, []);

  const isDark = theme === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabLayout />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
