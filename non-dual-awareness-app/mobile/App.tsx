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

  // Initialize app on startup
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('Starting app initialization...');

      // Load user preferences
      console.log('Loading preferences...');
      await loadPreferences();
      console.log('Preferences loaded');

      // Initialize database
      console.log('Initializing database...');
      await initDatabase();
      console.log('Database initialized');

      // Mark app as ready
      setIsReady(true);
      console.log('App ready!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error initializing app:', errorMessage, err);
      setError(errorMessage);
      // Still mark as ready to show error screen
      setIsReady(true);
    }
  };

  const isDark = theme === 'dark';

  // Show error screen if initialization failed
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F7', padding: 20 }}>
        <Text style={{ fontSize: 20, color: '#8B7355', marginBottom: 16, fontWeight: 'bold' }}>
          Initialization Error
        </Text>
        <Text style={{ color: '#6B6662', textAlign: 'center', lineHeight: 20 }}>
          {error}
        </Text>
        <Text style={{ marginTop: 20, color: '#999', fontSize: 12, textAlign: 'center' }}>
          Check Expo Go logs for details
        </Text>
      </View>
    );
  }

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
