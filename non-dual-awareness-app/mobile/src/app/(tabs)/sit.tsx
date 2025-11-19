/**
 * Sit and Be Screen
 * Core meditation timer screen
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { Colors, Spacing } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';
import { useTimer } from '../../store/useTimer';
import AppConfig from '../../constants/config';

export default function SitScreen() {
  const { theme, defaultTimerDuration } = usePreferences();
  const {
    duration,
    remaining,
    state,
    start,
    pause,
    resume,
    stop,
    tick,
    setDuration,
  } = useTimer();

  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  const [selectedDuration, setSelectedDuration] = useState(defaultTimerDuration);

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === 'running') {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDurationSelect = (mins: number) => {
    if (state === 'idle') {
      setSelectedDuration(mins);
      setDuration(mins);
    }
  };

  const handleStart = () => {
    start(selectedDuration);
  };

  const handlePauseResume = () => {
    if (state === 'running') {
      pause();
    } else if (state === 'paused') {
      resume();
    }
  };

  const handleStop = () => {
    stop();
    setDuration(selectedDuration);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <Text
            variant="displayLarge"
            family="display"
            semibold
            center
            style={styles.timerText}
          >
            {formatTime(remaining)}
          </Text>

          {state === 'idle' && (
            <Text variant="bodyLarge" center color="secondary" style={styles.subtitle}>
              Set your duration and begin
            </Text>
          )}

          {state === 'running' && (
            <Text variant="body" center color="secondary" style={styles.subtitle}>
              Simply sit and be aware
            </Text>
          )}

          {state === 'paused' && (
            <Text variant="body" center color="secondary" style={styles.subtitle}>
              Paused
            </Text>
          )}

          {state === 'completed' && (
            <Text variant="bodyLarge" center color="accent" style={styles.subtitle}>
              Session complete
            </Text>
          )}
        </View>

        {/* Control Buttons */}
        <View style={styles.controls}>
          {state === 'idle' && (
            <Button
              variant="primary"
              size="large"
              onPress={handleStart}
              fullWidth
            >
              Begin
            </Button>
          )}

          {(state === 'running' || state === 'paused') && (
            <View style={styles.activeControls}>
              <Button
                variant="secondary"
                size="large"
                onPress={handlePauseResume}
                style={styles.controlButton}
              >
                {state === 'running' ? 'Pause' : 'Resume'}
              </Button>
              <Button
                variant="text"
                size="large"
                onPress={handleStop}
                style={styles.controlButton}
              >
                Stop
              </Button>
            </View>
          )}

          {state === 'completed' && (
            <Button
              variant="primary"
              size="large"
              onPress={handleStop}
              fullWidth
            >
              Return
            </Button>
          )}
        </View>

        {/* Duration Selection (only when idle) */}
        {state === 'idle' && (
          <View style={styles.durationContainer}>
            <Text variant="label" color="secondary" center style={styles.label}>
              Duration
            </Text>
            <View style={styles.durationButtons}>
              {AppConfig.timer.durations.map((mins) => (
                <Button
                  key={mins}
                  variant={selectedDuration === mins ? 'primary' : 'secondary'}
                  size="small"
                  onPress={() => handleDurationSelect(mins)}
                  style={styles.durationButton}
                >
                  {mins}
                </Button>
              ))}
            </View>
          </View>
        )}

        {/* Optional Inquiry Prompt (when running) */}
        {state === 'running' && (
          <View style={styles.inquiryContainer}>
            <Text variant="bodyLarge" center color="secondary" style={styles.inquiry}>
              "Am I aware?"
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.screenPaddingMobile,
    justifyContent: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: Spacing[12],
  },
  timerText: {
    marginBottom: Spacing[4],
  },
  subtitle: {
    marginTop: Spacing[2],
  },
  controls: {
    marginBottom: Spacing[8],
  },
  activeControls: {
    flexDirection: 'row',
    gap: Spacing[4],
  },
  controlButton: {
    flex: 1,
  },
  durationContainer: {
    marginBottom: Spacing[8],
  },
  label: {
    marginBottom: Spacing[3],
  },
  durationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
    justifyContent: 'center',
  },
  durationButton: {
    minWidth: 60,
  },
  inquiryContainer: {
    marginTop: Spacing[12],
    paddingHorizontal: Spacing[6],
  },
  inquiry: {
    fontStyle: 'italic',
  },
});
