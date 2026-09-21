import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '~/components/Header';
import { StatCard } from '../../components/dashboard/StatCard';
import { Card } from '../../components/ui/Card';
import { OrderCard } from '~/components/OrderCard';
import { AIInsightCard } from '~/components/AIInsightCard';
import { BarChart } from '~/components/charts/BarChart';
import { Badge } from '~/components/Badge';
import { Colors } from '~/constants/Colors';
import { orders, revenueData, aiInsights, inventoryItems, formatCompactCurrency } from '~/data/mockData';

const todayRevenue = revenueData[revenueData.length - 1].revenue;
const todayOrders = revenueData[revenueData.length - 1].orders;
const todayProfit = todayRevenue - revenueData[revenueData.length - 1].expenses;
const lowStockItems = inventoryItems.filter((i) => i.status !== 'in_stock');

const quickActions = [
  { label: 'Thêm đơn', icon: 'add-circle' as const, color: Colors.primary, bg: Colors.primaryLight },
  { label: 'Kho hàng', icon: 'cube' as const, color: Colors.warning, bg: Colors.warningLight, route: '/(tabs)/inventory' },
  { label: 'Menu', icon: 'restaurant' as const, color: Colors.success, bg: Colors.successLight, route: '/(tabs)/menu' },
  { label: 'AI Copilot', icon: 'sparkles' as const, color: Colors.ai, bg: Colors.aiLight, route: '/ai-copilot' },
];

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeBarIndex, setActiveBarIndex] = useState(6);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const recentOrders = orders.slice(0, 4);

  return (
    <View style={styles.container}>
      <Header
        title="Tổng Quan"
        subtitle="Nhà hàng ALN - Hôm nay"
        rightAction={{
          icon: 'notifications',
          onPress: () => {},
          badge: 3,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Chào buổi sáng, Quản lý! 👋</Text>
          <Text style={styles.greetingDate}>Chủ nhật, 15 tháng 1, 2024</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Doanh thu"
            value={formatCompactCurrency(todayRevenue)}
            change="23%"
            changePositive={true}
            icon="cash"
            iconColor={Colors.success}
            iconBg={Colors.successLight}
            style={styles.statHalf}
          />
          <StatCard
            title="Đơn hàng"
            value={`${todayOrders}`}
            change="8%"
            changePositive={true}
            icon="receipt"
            iconColor={Colors.primary}
            iconBg={Colors.primaryLight}
            style={styles.statHalf}
          />
        </View>
        <View style={styles.statsGrid}>
          <StatCard
            title="Lợi nhuận"
            value={formatCompactCurrency(todayProfit)}
            change="15%"
            changePositive={true}
            icon="trending-up"
            iconColor={Colors.ai}
            iconBg={Colors.aiLight}
            style={styles.statHalf}
          />
          <StatCard
            title="Hài lòng KH"
            value="4.8 ★"
            change="0.2"
            changePositive={true}
            icon="star"
            iconColor={Colors.warning}
            iconBg={Colors.warningLight}
            style={styles.statHalf}
          />
        </View>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
          <View style={styles.actionsRow}>
            {quickActions.map((action, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => action.route ? router.push(action.route as any) : null}
                style={styles.actionItem}
                activeOpacity={0.75}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.bg }]}>
                  <Ionicons name={action.icon} size={22} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Revenue Chart */}
        <Card style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Doanh thu 7 ngày</Text>
            <Text style={styles.sectionTotal}>{formatCompactCurrency(revenueData.reduce((a, b) => a + b.revenue, 0))}</Text>
          </View>
          <BarChart
            data={revenueData.map((d, i) => ({
              label: d.day,
              value: d.revenue,
            }))}
            height={130}
            activeIndex={activeBarIndex}
          />
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.legendText}>Doanh thu</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primaryLight }]} />
              <Text style={styles.legendText}>Trung bình</Text>
            </View>
          </View>
        </Card>

        {/* Low Stock Alerts */}
        {lowStockItems.length > 0 ? (
          <Card style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>⚠️ Cảnh báo tồn kho</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/inventory')} activeOpacity={0.7}>
                <Text style={styles.seeAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            {lowStockItems.map((item) => (
              <View key={item.id} style={styles.alertRow}>
                <View style={[styles.alertDot, { backgroundColor: item.status === 'out_of_stock' ? Colors.danger : Colors.warning }]} />
                <Text style={styles.alertName}>{item.name}</Text>
                <View style={styles.alertRight}>
                  <Badge
                    label={item.status === 'out_of_stock' ? 'Hết hàng' : `${item.quantity} ${item.unit}`}
                    variant={item.status === 'out_of_stock' ? 'danger' : 'warning'}
                  />
                </View>
              </View>
            ))}
          </Card>
        ) : null}

        {/* Recent Orders */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} activeOpacity={0.7}>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {recentOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        {/* AI Insight */}
        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>AI Insights</Text>
        {aiInsights.map((insight) => (
          <AIInsightCard
            key={insight.id}
            title={insight.title}
            description={insight.description}
            action={insight.action}
            onAction={() => {
              if (insight.actionType === 'analytics') router.push('/(tabs)/analytics');
              else if (insight.actionType === 'inventory') router.push('/(tabs)/inventory');
              else if (insight.actionType === 'menu') router.push('/(tabs)/menu');
            }}
            icon={insight.icon as any}
            color={insight.color}
          />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, gap: 14 },
  greeting: { marginBottom: 2 },
  greetingText: { fontSize: 17, fontWeight: '700', color: Colors.text },
  greetingDate: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  statsGrid: { flexDirection: 'row', gap: 12 },
  statHalf: { flex: 1 },
  card: { marginBottom: 0 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  sectionTotal: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  seeAll: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionItem: { alignItems: 'center', gap: 7, flex: 1 },
  actionIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 11, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  chartLegend: { flexDirection: 'row', gap: 16, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: Colors.textSecondary },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  alertDot: { width: 8, height: 8, borderRadius: 4 },
  alertName: { flex: 1, fontSize: 14, color: Colors.text, fontWeight: '500' },
  alertRight: { alignItems: 'flex-end' },
});
