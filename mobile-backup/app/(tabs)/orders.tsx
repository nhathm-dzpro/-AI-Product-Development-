import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Chip, Searchbar } from 'react-native-paper';
import { Header } from '../../components/layout/Header';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { EmptyState } from '../../components/common/EmptyState';
import { Card } from '../../components/ui/Card';
import { ORDER_FILTERS } from '../../constants';
import { MOCK_ORDERS } from '../../constants/mock';
import { colors } from '../../constants/theme';

export default function Orders() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<(typeof ORDER_FILTERS)[number]>('All');

  const data = MOCK_ORDERS.filter((o) => {
    const matchQ = q ? o.code.toLowerCase().includes(q.toLowerCase()) : true;
    const matchF = filter === 'All' ? true : o.status === filter.toUpperCase();
    return matchQ && matchF;
  });

  return (
    <ScreenContainer>
      <Header title="Orders" subtitle="Search, filter, list (mock)" />
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        <Searchbar placeholder="Search orders" value={q} onChangeText={setQ} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {ORDER_FILTERS.map((f) => (
            <Chip key={f} selected={filter === f} onPress={() => setFilter(f)}>
              {f}
            </Chip>
          ))}
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={data}
        keyExtractor={(o) => o.id}
        ListEmptyComponent={<EmptyState title="No orders yet" message="Orders will appear here." />}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: '700', color: colors.text }}>{item.code}</Text>
            <Text style={{ color: colors.muted }}>{item.status}</Text>
          </Card>
        )}
      />
    </ScreenContainer>
  );
}
