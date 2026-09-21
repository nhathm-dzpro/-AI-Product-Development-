import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  hint?: string;
}

export function Input({ label, error, icon, rightIcon, onRightIconPress, hint, style, secureTextEntry, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error ? styles.error : null,
      ]}>
        {icon ? <Ionicons name={icon} size={18} color={isFocused ? Colors.primary : Colors.textSecondary} style={styles.leftIcon} /> : null}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.gray400}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.rightIconBtn}>
            <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconBtn}>
            <Ionicons name={rightIcon} size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {hint && !error ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.gray100,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  focused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  error: {
    borderColor: Colors.danger,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 12,
  },
  rightIconBtn: {
    padding: 4,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: Colors.danger,
    marginTop: 2,
  },
  hint: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
