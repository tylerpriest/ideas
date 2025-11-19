/**
 * Main App Entry Point
 * Non-Dual Awareness App - Serving the recognition of Awareness
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { usePreferences } from './src/store/usePreferences';
import { initDatabase } from './src/lib/storage/database';
import TabLayout from './src/app/(tabs)/_layout';

export default function App() {
  const { theme, loadPreferences } = usePreferences();
  const [isReady, setIsReady] = useState(false);

  // Initialize app on startup
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Load user preferences
      await loadPreferences();

      // Initialize database
      await initDatabase();

      // Mark app as ready
      setIsReady(true);
    } catch (error) {
      console.error('Error initializing app:', error);
      // Still mark as ready to prevent blocking
      setIsReady(true);
    }
  };

  const isDark = theme === 'dark';

  // Show loading screen while initializing
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F7' }}>
        <ActivityIndicator size="large" color="#8B7355" />
        <Text style={{ marginTop: 16, color: '#6B6662', fontFamily: 'System' }}>
          Preparing...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabLayout />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
