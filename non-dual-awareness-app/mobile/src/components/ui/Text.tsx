/**
 * Text Component
 * Base text component with design system typography
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';

export type TextVariant =
  | 'displayLarge'
  | 'display'
  | 'titleLarge'
  | 'title'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'caption';

export type TextFamily = 'display' | 'body' | 'ui';

interface TextComponentProps extends RNTextProps {
  variant?: TextVariant;
  family?: TextFamily;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'custom';
  customColor?: string;
  semibold?: boolean;
  center?: boolean;
  children: React.ReactNode;
}

export const Text: React.FC<TextComponentProps> = ({
  variant = 'body',
  family = 'body',
  color = 'primary',
  customColor,
  semibold = false,
  center = false,
  style,
  children,
  ...props
}) => {
  const { theme, fontSize: userFontSize } = usePreferences();
  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  // Font size multiplier based on user preference
  const fontSizeMultipliers = {
    small: 0.875,
    medium: 1,
    large: 1.125,
    'extra-large': 1.25,
  };
  const multiplier = fontSizeMultipliers[userFontSize];

  // Get font family
  const getFontFamily = () => {
    if (family === 'display') {
      return semibold ? Typography.fonts.display : Typography.fonts.displayRegular;
    } else if (family === 'ui') {
      return Typography.fonts.uiRegular;
    } else {
      return semibold ? Typography.fonts.bodySemibold : Typography.fonts.body;
    }
  };

  // Get text color
  const getTextColor = () => {
    if (customColor) return customColor;
    switch (color) {
      case 'primary':
        return colors.primaryText;
      case 'secondary':
        return colors.secondaryText;
      case 'tertiary':
        return colors.tertiaryText;
      case 'accent':
        return colors.primaryAccent;
      default:
        return colors.primaryText;
    }
  };

  const textStyles = [
    styles.base,
    {
      fontFamily: getFontFamily(),
      fontSize: Typography.sizes[variant] * multiplier,
      lineHeight: Typography.lineHeights[variant] * multiplier,
      color: getTextColor(),
      textAlign: center ? 'center' : 'left',
    },
    style,
  ];

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    letterSpacing: Typography.letterSpacing.normal,
  },
});
