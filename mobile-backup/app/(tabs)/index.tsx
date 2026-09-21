import { ScrollView, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Header } from '../../components/layout/Header';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/dashboard/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_INGREDIENTS, MOCK_PRODUCTS, OVERVIEW_MOCK } from '../../constants/mock';
import { colors } from '../../constants/theme';
import { formatVND, greetingByHour } from '../../utils/format';

export default function Home() {
  const { user } = useAuth();
  const lowStock = MOCK_INGREDIENTS.filter((i) => i.stockQty <= i.lowStockThreshold);

  return (
    <ScreenContainer>
      <Header
        title="ALNrestaurant"
        subtitle={`${greetingByHour(new Date().getHours())} ${user?.name ?? ''}`}
        right={<Avatar.Text size={40} label={(user?.name ?? 'A').slice(0, 1).toUpperCase()} />}
      />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>
          Today&apos;s Overview
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <StatCard label="Revenue" value={formatVND(OVERVIEW_MOCK.revenue)} />
          <StatCard label="Orders" value={String(OVERVIEW_MOCK.orders)} />
          <StatCard label="Expenses" value={formatVND(OVERVIEW_MOCK.expenses)} />
          <StatCard label="Profit" value={formatVND(OVERVIEW_MOCK.profit)} />
        </View>

        <Card>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Top Products</Text>
          {MOCK_PRODUCTS.slice(0, 3).map((p) => (
            <Text key={p.id} style={{ color: colors.text, paddingVertical: 4 }}>
              {p.name} — {formatVND(p.price)}
            </Text>
          ))}
        </Card>

        <Card>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Inventory Alerts</Text>
          {lowStock.length === 0 ? (
            <Text style={{ color: colors.muted }}>Stock is OK</Text>
          ) : (
            lowStock.map((i) => (
              <Text key={i.id} style={{ color: colors.warning, paddingVertical: 2 }}>
                {i.name}: {i.stockQty} {i.unit} left
              </Text>
            ))
          )}
        </Card>

        <Card>
          <Text style={{ fontWeight: '700' }}>AI Restaurant Copilot</Text>
          <Text style={{ color: colors.muted, marginTop: 4 }}>Coming soon — Phase 2.</Text>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
