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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('Starting app initialization...');

      // Load preferences (safe to fail)
      try {
        await loadPreferences();
        console.log('✓ Preferences loaded');
      } catch (err) {
        console.warn('Preferences failed to load, using defaults:', err);
      }

      // Initialize database (safe to fail)
      try {
        await initDatabase();
        console.log('✓ Database initialized');
      } catch (err) {
        console.warn('Database failed to initialize:', err);
      }

      // Mark as ready regardless
      setIsReady(true);
      console.log('✓ App ready!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Fatal error during init:', errorMessage, err);
      setError(errorMessage);
      setIsReady(true);
    }
  };

  const isDark = theme === 'dark';

  // Show error screen if fatal error occurred
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F7', padding: 20 }}>
        <Text style={{ fontSize: 20, color: '#CC3333', marginBottom: 16, fontWeight: 'bold' }}>
          Initialization Error
        </Text>
        <Text style={{ color: '#6B6662', textAlign: 'center', lineHeight: 20 }}>
          {error}
        </Text>
      </View>
    );
  }

  // Loading screen
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F7' }}>
        <ActivityIndicator size="large" color="#8B7355" />
        <Text style={{ marginTop: 16, color: '#6B6662' }}>
          Preparing...
        </Text>
      </View>
    );
  }

  // Main app
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabLayout />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
