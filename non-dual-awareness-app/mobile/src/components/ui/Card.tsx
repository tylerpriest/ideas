/**
 * Card Component
 * Container component for content with elevation and padding
 */

import React from 'react';
import { View, ViewProps, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
  padding?: number;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  padding = Spacing.cardPadding,
  elevated = true,
  style,
  ...props
}) => {
  const { theme } = usePreferences();
  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const shadows = isDark ? Shadows.dark : Shadows.light;

  const cardStyles = [
    styles.card,
    {
      backgroundColor: colors.surface,
      padding,
      ...(elevated && shadows.small),
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [cardStyles, pressed && styles.pressed]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
});
