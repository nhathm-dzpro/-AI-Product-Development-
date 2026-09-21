import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  style?: ViewStyle;
}

export function StatCard({
  title,
  value,
  change,
  changePositive = true,
  icon,
  iconColor = Colors.primary,
  iconBg = Colors.primaryLight,
  style,
}: StatCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.top}>
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        {change ? (
          <View style={[styles.changePill, { backgroundColor: changePositive ? Colors.successLight : Colors.dangerLight }]}>
            <Ionicons
              name={changePositive ? 'arrow-up' : 'arrow-down'}
              size={10}
              color={changePositive ? Colors.success : Colors.danger}
            />
            <Text style={[styles.changeText, { color: changePositive ? Colors.success : Colors.danger }]}>{change}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 2,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
