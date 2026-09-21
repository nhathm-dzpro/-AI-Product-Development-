import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  fullWidth = false,
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variantStyle.textColor} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={sizeStyle.iconSize} color={variantStyle.textColor} style={styles.icon} /> : null}
          <Text style={[styles.label, variantStyle.text, sizeStyle.text]}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const variantStyles = {
  primary: {
    container: { backgroundColor: Colors.primary },
    text: { color: Colors.white },
    textColor: Colors.white,
  },
  secondary: {
    container: { backgroundColor: Colors.gray100 },
    text: { color: Colors.text },
    textColor: Colors.text,
  },
  outline: {
    container: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primary },
    text: { color: Colors.primary },
    textColor: Colors.primary,
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: Colors.primary },
    textColor: Colors.primary,
  },
  danger: {
    container: { backgroundColor: Colors.danger },
    text: { color: Colors.white },
    textColor: Colors.white,
  },
  success: {
  container: { backgroundColor: Colors.success },
  text: { color: Colors.white },
  textColor: Colors.white,
},
};

const sizeStyles = {
  sm: {
    container: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
    text: { fontSize: 13 },
    iconSize: 14,
  },
  md: {
    container: { paddingHorizontal: 16, paddingVertical: 11, borderRadius: 12 },
    text: { fontSize: 14 },
    iconSize: 16,
  },
  lg: {
    container: { paddingHorizontal: 20, paddingVertical: 14, borderRadius: 14 },
    text: { fontSize: 16 },
    iconSize: 18,
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: '600',
  },
  icon: {
    marginRight: 6,
  },
});
