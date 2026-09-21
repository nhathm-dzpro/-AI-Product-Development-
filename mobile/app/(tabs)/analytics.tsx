import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from '~/components/Header';
import { StatCard } from '../../components/dashboard/StatCard';
import { Card } from '../../components/ui/Card';
import { BarChart } from '~/components/charts/BarChart';
import { LineChart } from '~/components/charts/LineChart';
import { Colors } from '~/constants/Colors';
import { revenueData, topProducts, formatCompactCurrency, formatCurrency } from '~/data/mockData';

const FILTERS = ['7 ngày', '30 ngày', '3 tháng', '1 năm'];

const weekRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);
const weekExpenses = revenueData.reduce((a, b) => a + b.expenses, 0);
const weekProfit = weekRevenue - weekExpenses;
const weekOrders = revenueData.reduce((a, b) => a + b.orders, 0);

export default function AnalyticsScreen() {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <View style={styles.container}>
      <Header title="Phân tích" subtitle="Hiệu suất kinh doanh" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Date filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <View style={styles.filters}>
            {FILTERS.map((f, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setActiveFilter(i)}
                style={[styles.filterBtn, activeFilter === i && styles.filterActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.filterText, activeFilter === i && styles.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Summary stats */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Doanh thu"
            value={formatCompactCurrency(weekRevenue)}
            change="18%"
            changePositive
            icon="cash"
            iconColor={Colors.success}
            iconBg={Colors.successLight}
            style={styles.statHalf}
          />
          <StatCard
            title="Chi phí"
            value={formatCompactCurrency(weekExpenses)}
            change="5%"
            changePositive={false}
            icon="trending-down"
            iconColor={Colors.danger}
            iconBg={Colors.dangerLight}
            style={styles.statHalf}
          />
        </View>
        <View style={styles.statsGrid}>
          <StatCard
            title="Lợi nhuận"
            value={formatCompactCurrency(weekProfit)}
            change="24%"
            changePositive
            icon="trending-up"
            iconColor={Colors.ai}
            iconBg={Colors.aiLight}
            style={styles.statHalf}
          />
          <StatCard
            title="Tổng đơn"
            value={`${weekOrders}`}
            change="11%"
            changePositive
            icon="receipt"
            iconColor={Colors.primary}
            iconBg={Colors.primaryLight}
            style={styles.statHalf}
          />
        </View>

        {/* Revenue vs Expenses Bar Chart */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Doanh thu & Chi phí</Text>
          <Text style={styles.cardSubtitle}>7 ngày gần nhất</Text>
          <View style={{ marginTop: 16 }}>
            <BarChart
              data={revenueData.map((d) => ({ label: d.day, value: d.revenue, color: Colors.primary }))}
              height={140}
              showValues={false}
              activeIndex={6}
            />
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
              <Text style={styles.legendText}>Doanh thu</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.danger }]} />
              <Text style={styles.legendText}>Chi phí</Text>
            </View>
          </View>
        </Card>

        {/* Profit Line Chart */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Lợi nhuận theo ngày</Text>
          <Text style={styles.cardSubtitle}>Xu hướng 7 ngày</Text>
          <View style={{ marginTop: 8 }}>
            <LineChart
              data={revenueData.map((d) => ({ label: d.day, value: d.revenue - d.expenses }))}
              color={Colors.success}
              height={140}
            />
          </View>
        </Card>

        {/* Order trend */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Số đơn hàng</Text>
          <Text style={styles.cardSubtitle}>Theo từng ngày</Text>
          <View style={{ marginTop: 16 }}>
            <BarChart
              data={revenueData.map((d) => ({ label: d.day, value: d.orders }))}
              height={120}
            />
          </View>
        </Card>

        {/* Top Products */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Top sản phẩm</Text>
          <Text style={styles.cardSubtitle}>Doanh thu cao nhất</Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            {topProducts.map((p, i) => {
              const maxRev = topProducts[0].revenue;
              const pct = (p.revenue / maxRev) * 100;
              return (
                <View key={i}>
                  <View style={styles.productRow}>
                    <View style={styles.productRank}>
                      <Text style={styles.rankText}>#{i + 1}</Text>
                    </View>
                    <Text style={styles.productName} numberOfLines={1}>{p.name}</Text>
                    <Text style={styles.productRevenue}>{formatCompactCurrency(p.revenue)}</Text>
                  </View>
                  <View style={styles.progressBg}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${pct}%`,
                          backgroundColor: i === 0 ? Colors.primary : i === 1 ? Colors.primaryLight : Colors.gray200,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.productOrders}>{p.orders} đơn hàng</Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Profit margin */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Biên lợi nhuận</Text>
          <View style={styles.marginRow}>
            <View style={styles.marginCircle}>
              <Text style={styles.marginPct}>{Math.round((weekProfit / weekRevenue) * 100)}%</Text>
              <Text style={styles.marginLabel}>Lợi nhuận</Text>
            </View>
            <View style={styles.marginDetails}>
              <View style={styles.marginItem}>
                <View style={[styles.marginDot, { backgroundColor: Colors.success }]} />
                <Text style={styles.marginItemLabel}>Doanh thu</Text>
                <Text style={styles.marginItemValue}>{formatCompactCurrency(weekRevenue)}</Text>
              </View>
              <View style={styles.marginItem}>
                <View style={[styles.marginDot, { backgroundColor: Colors.danger }]} />
                <Text style={styles.marginItemLabel}>Chi phí</Text>
                <Text style={styles.marginItemValue}>{formatCompactCurrency(weekExpenses)}</Text>
              </View>
              <View style={[styles.marginItem, { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 8, marginTop: 4 }]}>
                <View style={[styles.marginDot, { backgroundColor: Colors.primary }]} />
                <Text style={[styles.marginItemLabel, { fontWeight: '700' }]}>Lợi nhuận</Text>
                <Text style={[styles.marginItemValue, { color: Colors.success, fontWeight: '800' }]}>{formatCompactCurrency(weekProfit)}</Text>
              </View>
            </View>
          </View>
        </Card>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, gap: 14 },
  filterScroll: { marginBottom: 2 },
  filters: { flexDirection: 'row', gap: 8, paddingRight: 16 },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  filterTextActive: { color: Colors.white },
  statsGrid: { flexDirection: 'row', gap: 12 },
  statHalf: { flex: 1 },
  card: {},
  cardTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  cardSubtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  legend: { flexDirection: 'row', gap: 16, marginTop: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: Colors.textSecondary },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  productRank: {
    width: 24, height: 24, borderRadius: 8,
    backgroundColor: Colors.gray100,
    alignItems: 'center', justifyContent: 'center',
  },
  rankText: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  productName: { flex: 1, fontSize: 13, fontWeight: '600', color: Colors.text },
  productRevenue: { fontSize: 13, fontWeight: '700', color: Colors.text },
  progressBg: { height: 5, backgroundColor: Colors.gray100, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  productOrders: { fontSize: 11, color: Colors.textSecondary, marginTop: 3 },
  marginRow: { flexDirection: 'row', gap: 16, marginTop: 12, alignItems: 'center' },
  marginCircle: {
    width: 90, height: 90, borderRadius: 45,
    borderWidth: 6, borderColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  marginPct: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  marginLabel: { fontSize: 10, color: Colors.textSecondary },
  marginDetails: { flex: 1, gap: 8 },
  marginItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  marginDot: { width: 8, height: 8, borderRadius: 4 },
  marginItemLabel: { flex: 1, fontSize: 13, color: Colors.text },
  marginItemValue: { fontSize: 13, fontWeight: '600', color: Colors.text },
});
