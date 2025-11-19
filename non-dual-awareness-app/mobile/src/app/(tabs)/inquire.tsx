/**
 * Inquire Screen
 * Self-inquiry sequences
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Colors, Spacing } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';
import { contentLoader, InquirySequence } from '../../lib/content/loader';

type FilterLevel = 'all' | 'foundational' | 'intermediate' | 'advanced';

export default function InquireScreen() {
  const { theme } = usePreferences();
  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  const [sequences, setSequences] = useState<InquirySequence[]>([]);
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('all');

  useEffect(() => {
    loadSequences();
  }, [filterLevel]);

  const loadSequences = () => {
    if (filterLevel === 'all') {
      setSequences(contentLoader.getAllSequences());
    } else {
      setSequences(contentLoader.getSequencesByLevel(filterLevel));
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'foundational':
        return colors.success;
      case 'intermediate':
        return colors.secondaryAccent;
      case 'advanced':
        return colors.primaryAccent;
      default:
        return colors.secondaryText;
    }
  };

  const renderSequenceCard = ({ item }: { item: InquirySequence }) => (
    <Card style={styles.sequenceCard}>
      <Text variant="titleLarge" family="display" semibold>
        {item.title}
      </Text>

      <View style={styles.meta}>
        <View
          style={[
            styles.levelBadge,
            { backgroundColor: getLevelColor(item.level) + '20' },
          ]}
        >
          <Text
            variant="caption"
            customColor={getLevelColor(item.level)}
            style={styles.levelText}
          >
            {item.level}
          </Text>
        </View>
        <Text variant="caption" color="secondary">
          {item.estimated_duration}
        </Text>
      </View>

      <Text variant="body" color="secondary" style={styles.description}>
        {item.description}
      </Text>

      <Text variant="caption" color="tertiary" style={styles.steps}>
        {item.steps.length} steps
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <View style={styles.content}>
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <Text variant="label" color="secondary" style={styles.filterLabel}>
            Level
          </Text>
          <View style={styles.filterButtons}>
            <Button
              variant={filterLevel === 'all' ? 'primary' : 'secondary'}
              size="small"
              onPress={() => setFilterLevel('all')}
              style={styles.filterButton}
            >
              All
            </Button>
            <Button
              variant={filterLevel === 'foundational' ? 'primary' : 'secondary'}
              size="small"
              onPress={() => setFilterLevel('foundational')}
              style={styles.filterButton}
            >
              Foundational
            </Button>
            <Button
              variant={filterLevel === 'intermediate' ? 'primary' : 'secondary'}
              size="small"
              onPress={() => setFilterLevel('intermediate')}
              style={styles.filterButton}
            >
              Intermediate
            </Button>
            <Button
              variant={filterLevel === 'advanced' ? 'primary' : 'secondary'}
              size="small"
              onPress={() => setFilterLevel('advanced')}
              style={styles.filterButton}
            >
              Advanced
            </Button>
          </View>
        </View>

        {/* Sequences List */}
        <FlatList
          data={sequences}
          keyExtractor={(item) => item.id}
          renderItem={renderSequenceCard}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text variant="body" color="secondary" center>
                No sequences found for this level
              </Text>
            </View>
          }
        />
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
  filterContainer: {
    padding: Spacing.screenPaddingMobile,
    paddingBottom: 0,
  },
  filterLabel: {
    marginBottom: Spacing[2],
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    marginBottom: Spacing[4],
  },
  filterButton: {
    flex: 1,
    minWidth: 70,
  },
  listContent: {
    padding: Spacing.screenPaddingMobile,
  },
  sequenceCard: {
    marginBottom: Spacing.cardGap,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    marginTop: Spacing[2],
    marginBottom: Spacing[3],
  },
  levelBadge: {
    paddingHorizontal: Spacing[2],
    paddingVertical: Spacing[1],
    borderRadius: 4,
  },
  levelText: {
    textTransform: 'capitalize',
  },
  description: {
    marginBottom: Spacing[2],
  },
  steps: {
    marginTop: Spacing[1],
  },
  emptyState: {
    padding: Spacing[10],
  },
});
