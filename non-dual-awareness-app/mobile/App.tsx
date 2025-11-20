/**
 * Main App Entry Point
 * Non-Dual Awareness App - Serving the recognition of Awareness
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// MINIMAL TEST VERSION - bypassing all complex initialization
export default function App() {
  const [phase, setPhase] = useState('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('=== APP STARTING ===');
    console.log('Phase: Loading');

    // Simple timeout to test rendering
    const timer = setTimeout(() => {
      console.log('Phase: Attempting to load full app');
      loadFullApp();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadFullApp = async () => {
    try {
      console.log('Step 1: Importing dependencies...');

      // Dynamically import to catch errors
      const { NavigationContainer } = await import('@react-navigation/native');
      const { SafeAreaProvider } = await import('react-native-safe-area-context');
      console.log('Step 2: Navigation imports successful');

      const { usePreferences } = await import('./src/store/usePreferences');
      console.log('Step 3: Store imports successful');

      const { initDatabase } = await import('./src/lib/storage/database');
      console.log('Step 4: Database imports successful');

      // Try to initialize
      console.log('Step 5: Loading preferences...');
      // Skip for now - just test rendering

      console.log('Step 6: All imports successful!');
      setPhase('ready');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('=== ERROR DURING LOAD ===', errorMessage, err);
      setError(errorMessage);
      setPhase('error');
    }
  };

  // Error state
  if (phase === 'error') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>App Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.hint}>Check console for details</Text>
      </View>
    );
  }

  // Loading state
  if (phase === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B7355" />
        <Text style={styles.loadingText}>Starting App...</Text>
        <Text style={styles.version}>v1.0.1-debug</Text>
      </View>
    );
  }

  // Ready state - show simple success screen first
  return (
    <View style={styles.container}>
      <Text style={styles.successTitle}>✓ App Loaded Successfully!</Text>
      <Text style={styles.successText}>Basic rendering works</Text>
      <Text style={styles.hint}>Full app coming soon...</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F7',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    color: '#CC3333',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#6B6662',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
  },
  loadingText: {
    marginTop: 16,
    color: '#6B6662',
    fontSize: 18,
  },
  successTitle: {
    fontSize: 28,
    color: '#8B7355',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  successText: {
    color: '#6B6662',
    fontSize: 18,
    marginBottom: 8,
  },
  hint: {
    marginTop: 20,
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  version: {
    marginTop: 8,
    color: '#CCC',
    fontSize: 12,
  },
});
