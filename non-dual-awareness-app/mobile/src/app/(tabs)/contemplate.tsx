/**
 * Contemplate Screen
 * Daily pointers and core teachings library
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Colors, Spacing } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';
import { contentLoader, DailyPointer, TeachingCategory } from '../../lib/content/loader';

type ViewMode = 'daily' | 'pointers' | 'teachings';

export default function ContemplateScreen() {
  const { theme, lastDailyPointerIndex, updateDailyPointer } = usePreferences();
  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [dailyPointer, setDailyPointer] = useState<DailyPointer | null>(null);
  const [allPointers, setAllPointers] = useState<DailyPointer[]>([]);
  const [categories, setCategories] = useState<TeachingCategory[]>([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = () => {
    try {
      // Load daily pointer
      const { pointer, index } = contentLoader.getTodayPointer(lastDailyPointerIndex);
      setDailyPointer(pointer);

      // Load all pointers
      setAllPointers(contentLoader.getAllPointers());

      // Load teaching categories
      setCategories(contentLoader.getAllTeachingCategories());
    } catch (error) {
      console.error('Error loading content:', error);
      // Set empty fallbacks
      setDailyPointer({
        id: 0,
        text: 'Welcome to the Non-Dual Awareness app. Content is loading...',
        theme: 'awareness'
      });
    }
  };

  const refreshDailyPointer = () => {
    const { pointer, index } = contentLoader.getTodayPointer(lastDailyPointerIndex);
    setDailyPointer(pointer);
    updateDailyPointer(index);
  };

  const renderDailyView = () => (
    <View style={styles.dailyContainer}>
      <Text variant="title" semibold center style={styles.sectionTitle}>
        Today's Pointer
      </Text>

      {dailyPointer && (
        <Card style={styles.dailyCard} padding={Spacing[8]}>
          <Text variant="bodyLarge" center style={styles.dailyText}>
            {dailyPointer.text}
          </Text>

          {dailyPointer.attribution && (
            <Text variant="body" center color="secondary" style={styles.attribution}>
              — {dailyPointer.attribution}
            </Text>
          )}
        </Card>
      )}

      <Button
        variant="text"
        onPress={refreshDailyPointer}
        style={styles.refreshButton}
      >
        Show Next Pointer
      </Button>

      <View style={styles.browseButtons}>
        <Text variant="label" color="secondary" center style={styles.browseLabel}>
          Browse
        </Text>
        <View style={styles.buttonRow}>
          <Button
            variant="secondary"
            size="small"
            onPress={() => setViewMode('pointers')}
            style={styles.browseButton}
          >
            All Pointers
          </Button>
          <Button
            variant="secondary"
            size="small"
            onPress={() => setViewMode('teachings')}
            style={styles.browseButton}
          >
            Core Teachings
          </Button>
        </View>
      </View>
    </View>
  );

  const renderPointersView = () => (
    <View style={styles.listContainer}>
      <View style={styles.header}>
        <Button variant="text" onPress={() => setViewMode('daily')}>
          ← Back
        </Button>
        <Text variant="title" semibold>
          All Pointers
        </Text>
      </View>

      <FlatList
        data={allPointers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.pointerCard}>
            <Text variant="body" style={styles.pointerText}>
              {item.text}
            </Text>
            {item.attribution && (
              <Text variant="bodySmall" color="secondary" style={styles.smallAttribution}>
                — {item.attribution}
              </Text>
            )}
            <Text variant="caption" color="tertiary" style={styles.theme}>
              {item.theme}
            </Text>
          </Card>
        )}
      />
    </View>
  );

  const renderTeachingsView = () => (
    <View style={styles.listContainer}>
      <View style={styles.header}>
        <Button variant="text" onPress={() => setViewMode('daily')}>
          ← Back
        </Button>
        <Text variant="title" semibold>
          Core Teachings
        </Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.categoryCard}>
            <Text variant="titleLarge" family="display" semibold>
              {item.title}
            </Text>
            <Text variant="body" color="secondary" style={styles.categoryDesc}>
              {item.description}
            </Text>
            <Text variant="caption" color="tertiary">
              {item.teachings.length} teachings
            </Text>
          </Card>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      {viewMode === 'daily' && renderDailyView()}
      {viewMode === 'pointers' && renderPointersView()}
      {viewMode === 'teachings' && renderTeachingsView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dailyContainer: {
    flex: 1,
    padding: Spacing.screenPaddingMobile,
    justifyContent: 'center',
  },
  sectionTitle: {
    marginBottom: Spacing[6],
  },
  dailyCard: {
    marginBottom: Spacing[6],
  },
  dailyText: {
    lineHeight: 34,
  },
  attribution: {
    marginTop: Spacing[4],
    fontStyle: 'italic',
  },
  refreshButton: {
    alignSelf: 'center',
    marginBottom: Spacing[10],
  },
  browseButtons: {
    marginTop: Spacing[8],
  },
  browseLabel: {
    marginBottom: Spacing[3],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    justifyContent: 'center',
  },
  browseButton: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.screenPaddingMobile,
    gap: Spacing[3],
  },
  listContent: {
    padding: Spacing.screenPaddingMobile,
    paddingTop: 0,
  },
  pointerCard: {
    marginBottom: Spacing.cardGap,
  },
  pointerText: {
    marginBottom: Spacing[2],
  },
  smallAttribution: {
    marginTop: Spacing[2],
    fontStyle: 'italic',
  },
  theme: {
    marginTop: Spacing[2],
  },
  categoryCard: {
    marginBottom: Spacing.cardGap,
  },
  categoryDesc: {
    marginTop: Spacing[2],
    marginBottom: Spacing[2],
  },
});
