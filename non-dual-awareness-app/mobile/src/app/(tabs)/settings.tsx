/**
 * Settings Screen
 * App preferences and configuration
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Colors, Spacing } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';
import AppConfig from '../../constants/config';

export default function SettingsScreen() {
  const {
    theme,
    fontSize,
    reducedMotion,
    defaultTimerDuration,
    timerSound,
    hapticFeedback,
    dailyReminderEnabled,
    setTheme,
    setFontSize,
    setReducedMotion,
    setDefaultTimerDuration,
    setTimerSound,
    setHapticFeedback,
    setDailyReminder,
    resetPreferences,
  } = usePreferences();

  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  const SettingRow = ({
    label,
    value,
    onPress,
  }: {
    label: string;
    value: string;
    onPress?: () => void;
  }) => (
    <Card onPress={onPress} style={styles.settingRow} padding={Spacing[4]}>
      <Text variant="body" color="secondary">
        {label}
      </Text>
      <Text variant="body" semibold color="accent">
        {value}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" semibold style={styles.sectionTitle}>
            Appearance
          </Text>

          <SettingRow
            label="Theme"
            value={theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Auto'}
            onPress={() => {
              const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
              const currentIndex = themes.indexOf(theme);
              const nextTheme = themes[(currentIndex + 1) % themes.length];
              setTheme(nextTheme);
            }}
          />

          <SettingRow
            label="Font Size"
            value={
              fontSize === 'small'
                ? 'Small'
                : fontSize === 'medium'
                ? 'Medium'
                : fontSize === 'large'
                ? 'Large'
                : 'Extra Large'
            }
            onPress={() => {
              const sizes: Array<'small' | 'medium' | 'large' | 'extra-large'> = [
                'small',
                'medium',
                'large',
                'extra-large',
              ];
              const currentIndex = sizes.indexOf(fontSize);
              const nextSize = sizes[(currentIndex + 1) % sizes.length];
              setFontSize(nextSize);
            }}
          />

          <SettingRow
            label="Reduced Motion"
            value={reducedMotion ? 'On' : 'Off'}
            onPress={() => setReducedMotion(!reducedMotion)}
          />
        </View>

        {/* Practice Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" semibold style={styles.sectionTitle}>
            Practice
          </Text>

          <SettingRow
            label="Default Timer Duration"
            value={`${defaultTimerDuration} min`}
            onPress={() => {
              const durations = AppConfig.timer.durations;
              const currentIndex = durations.indexOf(defaultTimerDuration);
              const nextDuration = durations[(currentIndex + 1) % durations.length];
              setDefaultTimerDuration(nextDuration);
            }}
          />

          <SettingRow
            label="Timer End Sound"
            value={
              timerSound === 'bell'
                ? 'Bell'
                : timerSound === 'chime'
                ? 'Chime'
                : 'Silence'
            }
            onPress={() => {
              const sounds: Array<'bell' | 'chime' | 'silence'> = ['bell', 'chime', 'silence'];
              const currentIndex = sounds.indexOf(timerSound);
              const nextSound = sounds[(currentIndex + 1) % sounds.length];
              setTimerSound(nextSound);
            }}
          />

          <SettingRow
            label="Haptic Feedback"
            value={hapticFeedback ? 'On' : 'Off'}
            onPress={() => setHapticFeedback(!hapticFeedback)}
          />
        </View>

        {/* Reminders Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" semibold style={styles.sectionTitle}>
            Reminders
          </Text>

          <SettingRow
            label="Daily Reminder"
            value={dailyReminderEnabled ? 'Enabled' : 'Disabled'}
            onPress={() => setDailyReminder(!dailyReminderEnabled)}
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" semibold style={styles.sectionTitle}>
            About
          </Text>

          <Card style={styles.aboutCard}>
            <Text variant="body" center style={styles.appName}>
              {AppConfig.name}
            </Text>
            <Text variant="caption" color="secondary" center style={styles.version}>
              Version {AppConfig.version}
            </Text>
            <Text variant="bodySmall" color="secondary" center style={styles.description}>
              {AppConfig.description}
            </Text>
          </Card>
        </View>

        {/* Reset Button */}
        <View style={styles.resetSection}>
          <Button
            variant="text"
            onPress={() => {
              if (confirm('Reset all preferences to defaults?')) {
                resetPreferences();
              }
            }}
          >
            Reset All Preferences
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.screenPaddingMobile,
  },
  section: {
    marginBottom: Spacing[8],
  },
  sectionTitle: {
    marginBottom: Spacing[4],
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },
  aboutCard: {
    paddingVertical: Spacing[6],
  },
  appName: {
    marginBottom: Spacing[1],
  },
  version: {
    marginBottom: Spacing[4],
  },
  description: {
    lineHeight: 22,
    paddingHorizontal: Spacing[4],
  },
  resetSection: {
    marginTop: Spacing[8],
    marginBottom: Spacing[10],
    alignItems: 'center',
  },
});
