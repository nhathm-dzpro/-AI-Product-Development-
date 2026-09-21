import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors';

interface AIInsightCardProps {
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  compact?: boolean;
}

export function AIInsightCard({
  title,
  description,
  action,
  onAction,
  icon = 'sparkles',
  color = Colors.ai,
  compact = false,
}: AIInsightCardProps) {
  const bgColor = color + '15';

  return (
    <View style={[styles.card, { borderLeftColor: color, borderLeftWidth: 3 }]}>
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <Ionicons name={icon as any} size={16} color={color} />
        </View>
        <View style={styles.aiTag}>
          <Ionicons name="sparkles" size={10} color={Colors.ai} />
          <Text style={styles.aiLabel}>AI Insight</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      {!compact ? <Text style={styles.description}>{description}</Text> : null}
      {action && onAction ? (
        <TouchableOpacity onPress={onAction} style={[styles.actionBtn, { borderColor: color }]} activeOpacity={0.7}>
          <Text style={[styles.actionText, { color }]}>{action}</Text>
          <Ionicons name="arrow-forward" size={12} color={color} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    gap: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.aiLight,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  aiLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.ai,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
