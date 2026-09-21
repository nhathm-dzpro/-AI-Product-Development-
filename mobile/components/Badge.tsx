import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '~/constants/Colors';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'primary' | 'default' | 'ai';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: Colors.successLight, text: Colors.success },
  warning: { bg: Colors.warningLight, text: Colors.warning },
  danger: { bg: Colors.dangerLight, text: Colors.danger },
  primary: { bg: Colors.primaryLight, text: Colors.primaryDark },
  ai: { bg: Colors.aiLight, text: Colors.ai },
  default: { bg: Colors.gray100, text: Colors.gray600 },
};

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const { bg, text } = variantStyles[variant];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
