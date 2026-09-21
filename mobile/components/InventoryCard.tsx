import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InventoryItem, formatCurrency } from '~/data/mockData';
import { Badge } from './Badge';
import { Colors } from '~/constants/Colors';

interface InventoryCardProps {
  item: InventoryItem;
  onEdit?: () => void;
}

const statusLabel: Record<InventoryItem['status'], string> = {
  in_stock: 'Còn hàng',
  low_stock: 'Sắp hết',
  out_of_stock: 'Hết hàng',
};

const statusVariant: Record<InventoryItem['status'], 'success' | 'warning' | 'danger'> = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'danger',
};

export function InventoryCard({ item, onEdit }: InventoryCardProps) {
  const stockPercent = Math.min((item.quantity / (item.minStock * 2)) * 100, 100);
  const barColor =
    item.status === 'out_of_stock' ? Colors.danger :
    item.status === 'low_stock' ? Colors.warning : Colors.success;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <View style={styles.headerRight}>
          <Badge label={statusLabel[item.status]} variant={statusVariant[item.status]} />
          <TouchableOpacity onPress={onEdit} style={styles.editBtn} activeOpacity={0.7}>
            <Ionicons name="pencil" size={14} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.stockRow}>
        <View style={styles.stockInfo}>
          <Text style={styles.stockValue}>{item.quantity} {item.unit}</Text>
          <Text style={styles.stockLabel}>Tồn kho</Text>
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockValue}>{item.minStock} {item.unit}</Text>
          <Text style={styles.stockLabel}>Tối thiểu</Text>
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockValue}>{formatCurrency(item.price)}</Text>
          <Text style={styles.stockLabel}>/{item.unit}</Text>
        </View>
      </View>

      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${stockPercent}%`, backgroundColor: barColor }]} />
      </View>

      <View style={styles.footer}>
        <Ionicons name="business" size={12} color={Colors.textSecondary} />
        <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  category: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stockInfo: {
    flex: 1,
  },
  stockValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  stockLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  barBg: {
    height: 5,
    backgroundColor: Colors.gray100,
    borderRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  supplier: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
