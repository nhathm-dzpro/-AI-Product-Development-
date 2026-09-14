import { FlatList, Text } from 'react-native';
import { Header } from '../../components/layout/Header';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/dashboard/StatCard';
import { MOCK_INGREDIENTS } from '../../constants/mock';
import { colors } from '../../constants/theme';

export default function Inventory() {
  const low = MOCK_INGREDIENTS.filter((i) => i.stockQty <= i.lowStockThreshold);

  return (
    <ScreenContainer>
      <Header title="Inventory" subtitle="Mock data" />
      <FlatList
        contentContainerStyle={{ padding: 16, gap: 12 }}
        data={MOCK_INGREDIENTS}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={
          <>
            <StatCard label="Total Ingredients" value={String(MOCK_INGREDIENTS.length)} />
            <StatCard label="Low Stock" value={String(low.length)} />
          </>
        }
        renderItem={({ item }) => (
          <Card style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: '700', color: colors.text }}>{item.name}</Text>
            <Text style={{ color: colors.muted }}>
              {item.stockQty} {item.unit}
            </Text>
          </Card>
        )}
      />
    </ScreenContainer>
  );
}
