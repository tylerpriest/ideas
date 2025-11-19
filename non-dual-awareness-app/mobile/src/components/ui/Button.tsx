/**
 * Button Component
 * Base button component with design system styling
 */

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, BorderRadius, Shadows, Accessibility } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  onPress,
  children,
  ...props
}) => {
  const { theme, hapticFeedback } = usePreferences();
  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  const shadows = isDark ? Shadows.dark : Shadows.light;

  const handlePress = async (e: any) => {
    if (disabled || loading) return;

    if (hapticFeedback) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    onPress?.(e);
  };

  // Size styles
  const sizeStyles = {
    small: {
      paddingHorizontal: Spacing[3],
      paddingVertical: Spacing[2],
      minHeight: 36,
    },
    medium: {
      paddingHorizontal: Spacing.buttonPaddingHorizontal,
      paddingVertical: Spacing.buttonPaddingVertical,
      minHeight: Accessibility.minTouchTarget,
    },
    large: {
      paddingHorizontal: Spacing[6],
      paddingVertical: Spacing[4],
      minHeight: 52,
    },
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: disabled ? colors.disabled : colors.primaryAccent,
            ...shadows.small,
          },
          text: {
            color: colors.surface,
          },
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: disabled ? colors.disabled : colors.primaryAccent,
          },
          text: {
            color: disabled ? colors.disabled : colors.primaryAccent,
          },
        };
      case 'text':
        return {
          container: {
            backgroundColor: 'transparent',
          },
          text: {
            color: disabled ? colors.disabled : colors.primaryAccent,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        sizeStyles[size],
        variantStyles.container,
        fullWidth && styles.fullWidth,
        pressed && !disabled && variant !== 'text' && styles.pressed,
      ]}
      {...props}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? colors.surface : colors.primaryAccent}
          />
        ) : (
          <>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text
              family="ui"
              variant="body"
              style={[variantStyles.text, disabled && styles.disabledText]}
            >
              {children}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  icon: {
    marginRight: Spacing[2],
  },
  disabledText: {
    opacity: 0.5,
  },
});
