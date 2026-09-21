import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order, formatCurrency } from '~/data/mockData';
import { Badge } from './Badge';
import { Colors } from '~/constants/Colors';

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
  onStatusChange?: (id: string, status: Order['status']) => void;
}

const statusLabel: Record<Order['status'], string> = {
  pending: 'Chờ xử lý',
  preparing: 'Đang chuẩn bị',
  completed: 'Hoàn thành',
  cancelled: 'Đã huỷ',
};

const statusVariant: Record<Order['status'], 'warning' | 'primary' | 'success' | 'danger'> = {
  pending: 'warning',
  preparing: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

const paymentIcon: Record<Order['paymentMethod'], keyof typeof Ionicons.glyphMap> = {
  cash: 'cash',
  card: 'card',
  transfer: 'phone-portrait',
};

export function OrderCard({ order, onPress }: OrderCardProps) {
  const time = new Date(order.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.orderId}>#{order.id}</Text>
          <View style={styles.tableTag}>
            <Ionicons name="restaurant" size={11} color={Colors.primary} />
            <Text style={styles.tableText}>Bàn {order.tableNumber}</Text>
          </View>
        </View>
        <Badge label={statusLabel[order.status]} variant={statusVariant[order.status]} />
      </View>

      {order.customerName ? (
        <Text style={styles.customerName}>{order.customerName}</Text>
      ) : null}

      <View style={styles.itemsList}>
        {order.items.slice(0, 2).map((item, i) => (
          <Text key={i} style={styles.itemText}>
            {item.quantity}× {item.name}
          </Text>
        ))}
        {order.items.length > 2 ? (
          <Text style={styles.moreItems}>+{order.items.length - 2} món khác</Text>
        ) : null}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Ionicons name={paymentIcon[order.paymentMethod]} size={13} color={Colors.textSecondary} />
          <Text style={styles.footerText}>{time}</Text>
        </View>
        <Text style={styles.total}>{formatCurrency(order.total)}</Text>
      </View>

      {order.note ? (
        <View style={styles.noteRow}>
          <Ionicons name="chatbubble-ellipses" size={12} color={Colors.textSecondary} />
          <Text style={styles.noteText} numberOfLines={1}>{order.note}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  tableTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },
  tableText: {
    fontSize: 11,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  customerName: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  itemsList: {
    gap: 3,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 13,
    color: Colors.text,
  },
  moreItems: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  total: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
    backgroundColor: Colors.gray100,
    padding: 8,
    borderRadius: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});
