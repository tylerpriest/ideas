/**
 * Journal Screen
 * Space for noting insights and reflections
 */

import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Colors, Spacing } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';

// Placeholder journal entries (will be replaced with SQLite later)
interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
}

export default function JournalScreen() {
  const { theme } = usePreferences();
  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  // Temporary state (will be replaced with database)
  const [entries] = useState<JournalEntry[]>([
    {
      id: '1',
      content: 'Today I noticed awareness is always here, even when overlooked...',
      createdAt: new Date().toISOString(),
    },
  ]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <Card style={styles.entryCard}>
      <Text variant="caption" color="tertiary" style={styles.date}>
        {formatDate(item.createdAt)}
      </Text>
      <Text variant="body" style={styles.content}>
        {item.content}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.content}>
        {/* New Entry Button */}
        <View style={styles.header}>
          <Button
            variant="primary"
            onPress={() => {
              // TODO: Navigate to new entry screen
              console.log('New entry');
            }}
          >
            + New Entry
          </Button>
        </View>

        {/* Entries List */}
        {entries.length > 0 ? (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            renderItem={renderEntry}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text variant="body" color="secondary" center style={styles.emptyText}>
              No journal entries yet
            </Text>
            <Text variant="bodySmall" color="tertiary" center style={styles.emptySubtext}>
              Create your first entry to begin noting insights
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: Spacing.screenPaddingMobile,
    paddingBottom: 0,
  },
  listContent: {
    padding: Spacing.screenPaddingMobile,
  },
  entryCard: {
    marginBottom: Spacing.cardGap,
  },
  date: {
    marginBottom: Spacing[2],
  },
  content: {
    lineHeight: 26,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing[10],
  },
  emptyText: {
    marginBottom: Spacing[2],
  },
  emptySubtext: {
    marginTop: Spacing[1],
  },
});
