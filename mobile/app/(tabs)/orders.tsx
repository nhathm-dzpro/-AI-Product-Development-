import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '~/components/Header';
import { SearchBar } from '~/components/SearchBar';
import { OrderCard } from '~/components/OrderCard';
import { Badge } from '~/components/Badge';
import { Button } from '../../components/ui/Button';
import { Colors } from '~/constants/Colors';
import { orders, Order, formatCurrency } from '~/data/mockData';

const STATUS_TABS: { label: string; value: Order['status'] | 'all' }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Chờ', value: 'pending' },
  { label: 'Đang làm', value: 'preparing' },
  { label: 'Xong', value: 'completed' },
  { label: 'Huỷ', value: 'cancelled' },
];

const statusColor: Record<string, string> = {
  all: Colors.text,
  pending: Colors.warning,
  preparing: Colors.primary,
  completed: Colors.success,
  cancelled: Colors.danger,
};

export default function OrdersScreen() {
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState<Order['status'] | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderList, setOrderList] = useState(orders);

  const pendingCount = orderList.filter((o) => o.status === 'pending').length;

  const filtered = useMemo(() => {
    return orderList.filter((o) => {
      const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
        (o.customerName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        o.tableNumber.toString().includes(search);
      const matchStatus = activeStatus === 'all' || o.status === activeStatus;
      return matchSearch && matchStatus;
    });
  }, [orderList, search, activeStatus]);

  const todayRevenue = orderList
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  const handleStatusChange = (id: string, status: Order['status']) => {
    setOrderList((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    setSelectedOrder(null);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Đơn hàng"
        subtitle={`${pendingCount} đơn đang chờ`}
        rightAction={{ icon: 'add', onPress: () => {}, badge: pendingCount }}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Revenue summary */}
        <View style={styles.revRow}>
          <View style={styles.revItem}>
            <Text style={styles.revValue}>{formatCurrency(todayRevenue)}</Text>
            <Text style={styles.revLabel}>Doanh thu hôm nay</Text>
          </View>
          <View style={styles.revDivider} />
          <View style={styles.revItem}>
            <Text style={styles.revValue}>{orderList.filter(o => o.status === 'completed').length}</Text>
            <Text style={styles.revLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.revDivider} />
          <View style={styles.revItem}>
            <Text style={[styles.revValue, { color: Colors.warning }]}>{pendingCount}</Text>
            <Text style={styles.revLabel}>Đơn chờ xử lý</Text>
          </View>
        </View>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Tìm mã đơn, bàn, khách hàng..." />

        {/* Status tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabs}>
            {STATUS_TABS.map((tab) => {
              const count = tab.value === 'all' ? orderList.length : orderList.filter(o => o.status === tab.value).length;
              const isActive = activeStatus === tab.value;
              return (
                <TouchableOpacity
                  key={tab.value}
                  onPress={() => setActiveStatus(tab.value)}
                  style={[styles.tab, isActive && { borderBottomColor: statusColor[tab.value], borderBottomWidth: 2 }]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabText, isActive && { color: statusColor[tab.value] }]}>{tab.label}</Text>
                  <View style={[styles.tabBadge, { backgroundColor: isActive ? statusColor[tab.value] + '20' : Colors.gray100 }]}>
                    <Text style={[styles.tabBadgeText, { color: isActive ? statusColor[tab.value] : Colors.textSecondary }]}>{count}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyTitle}>Không có đơn hàng</Text>
            <Text style={styles.emptySubtitle}>Chưa có đơn nào phù hợp với bộ lọc này</Text>
          </View>
        ) : (
          filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={() => setSelectedOrder(order)}
            />
          ))
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Order Detail Modal */}
      <Modal
        visible={!!selectedOrder}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedOrder(null)}
      >
        {selectedOrder ? (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusChange={handleStatusChange}
          />
        ) : null}
      </Modal>
    </View>
  );
}

function OrderDetailModal({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order;
  onClose: () => void;
  onStatusChange: (id: string, status: Order['status']) => void;
}) {
  const statusLabel: Record<Order['status'], string> = {
    pending: 'Chờ xử lý',
    preparing: 'Đang chuẩn bị',
    completed: 'Hoàn thành',
    cancelled: 'Đã huỷ',
  };

  const paymentLabel: Record<Order['paymentMethod'], string> = {
    cash: 'Tiền mặt',
    card: 'Thẻ ngân hàng',
    transfer: 'Chuyển khoản',
  };

  const nextActions: { label: string; status: Order['status']; variant: 'primary' | 'success' | 'danger' }[] = order.status === 'pending'
    ? [
        { label: 'Bắt đầu chuẩn bị', status: 'preparing', variant: 'primary' },
        { label: 'Huỷ đơn', status: 'cancelled', variant: 'danger' },
      ]
    : order.status === 'preparing'
    ? [{ label: 'Đánh dấu hoàn thành', status: 'completed', variant: 'success' }]
    : [];

  return (
    <View style={detailStyles.container}>
      <View style={detailStyles.handle} />
      <View style={detailStyles.header}>
        <View>
          <Text style={detailStyles.orderId}>Đơn #{order.id}</Text>
          <Text style={detailStyles.orderTime}>
            {new Date(order.createdAt).toLocaleString('vi-VN')}
          </Text>
        </View>
        <Badge label={statusLabel[order.status]} variant={
          order.status === 'completed' ? 'success' :
          order.status === 'cancelled' ? 'danger' :
          order.status === 'preparing' ? 'primary' : 'warning'
        } />
      </View>

      <ScrollView contentContainerStyle={detailStyles.body} showsVerticalScrollIndicator={false}>
        <View style={detailStyles.infoGrid}>
          <View style={detailStyles.infoItem}>
            <Ionicons name="restaurant" size={16} color={Colors.primary} />
            <View>
              <Text style={detailStyles.infoLabel}>Bàn số</Text>
              <Text style={detailStyles.infoValue}>{order.tableNumber}</Text>
            </View>
          </View>
          <View style={detailStyles.infoItem}>
            <Ionicons name="person" size={16} color={Colors.primary} />
            <View>
              <Text style={detailStyles.infoLabel}>Khách hàng</Text>
              <Text style={detailStyles.infoValue}>{order.customerName ?? 'Khách vãng lai'}</Text>
            </View>
          </View>
          <View style={detailStyles.infoItem}>
            <Ionicons name="cash" size={16} color={Colors.primary} />
            <View>
              <Text style={detailStyles.infoLabel}>Thanh toán</Text>
              <Text style={detailStyles.infoValue}>{paymentLabel[order.paymentMethod]}</Text>
            </View>
          </View>
        </View>

        <Text style={detailStyles.sectionTitle}>Danh sách món</Text>
        {order.items.map((item, i) => (
          <View key={i} style={detailStyles.itemRow}>
            <View style={detailStyles.itemQty}>
              <Text style={detailStyles.itemQtyText}>{item.quantity}</Text>
            </View>
            <Text style={detailStyles.itemName}>{item.name}</Text>
            <Text style={detailStyles.itemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
          </View>
        ))}

        <View style={detailStyles.totalRow}>
          <Text style={detailStyles.totalLabel}>Tổng cộng</Text>
          <Text style={detailStyles.totalValue}>{formatCurrency(order.total)}</Text>
        </View>

        {order.note ? (
          <View style={detailStyles.noteBox}>
            <Ionicons name="chatbubble-ellipses" size={14} color={Colors.textSecondary} />
            <Text style={detailStyles.noteText}>{order.note}</Text>
          </View>
        ) : null}

        {nextActions.length > 0 ? (
          <View style={detailStyles.actions}>
            {nextActions.map((action, i) => (
              <Button
                key={i}
                label={action.label}
                onPress={() => onStatusChange(order.id, action.status)}
                variant={action.variant}
                fullWidth
              />
            ))}
          </View>
        ) : null}

        <Button label="Đóng" onPress={onClose} variant="secondary" fullWidth style={{ marginTop: 8 }} />
      </ScrollView>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20, paddingTop: 12 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  orderId: { fontSize: 20, fontWeight: '800', color: Colors.text },
  orderTime: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  body: { gap: 16 },
  infoGrid: { flexDirection: 'row', gap: 8 },
  infoItem: {
    flex: 1, flexDirection: 'row', gap: 8, alignItems: 'flex-start',
    backgroundColor: Colors.gray100, padding: 12, borderRadius: 12,
  },
  infoLabel: { fontSize: 11, color: Colors.textSecondary },
  infoValue: { fontSize: 13, fontWeight: '700', color: Colors.text, marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
  itemRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  itemQty: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  itemQtyText: { fontSize: 13, fontWeight: '800', color: Colors.primaryDark },
  itemName: { flex: 1, fontSize: 14, color: Colors.text },
  itemPrice: { fontSize: 14, fontWeight: '700', color: Colors.text },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 12, borderTopWidth: 2, borderTopColor: Colors.border,
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.text },
  totalValue: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  noteBox: {
    flexDirection: 'row', gap: 8, backgroundColor: Colors.gray100,
    padding: 12, borderRadius: 12, alignItems: 'flex-start',
  },
  noteText: { flex: 1, fontSize: 13, color: Colors.textSecondary, fontStyle: 'italic' },
  actions: { gap: 10 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, gap: 12 },
  revRow: {
    flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 16,
    padding: 16, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, shadowRadius: 8, elevation: 3,
  },
  revItem: { flex: 1, alignItems: 'center' },
  revValue: { fontSize: 16, fontWeight: '800', color: Colors.text },
  revLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, textAlign: 'center' },
  revDivider: { width: 1, backgroundColor: Colors.border, marginVertical: 4 },
  tabs: { flexDirection: 'row', gap: 4, paddingRight: 16 },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  tabBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  tabBadgeText: { fontSize: 11, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
  emptySubtitle: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', paddingHorizontal: 40 },
});
