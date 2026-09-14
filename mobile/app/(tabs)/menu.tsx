import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { Header } from '../../components/layout/Header';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../constants/mock';
import { colors } from '../../constants/theme';
import { formatVND } from '../../utils/format';

export default function Menu() {
  const [cat, setCat] = useState('All');
  const cats = ['All', ...MOCK_CATEGORIES.map((c) => c.name)];
  const idOf = (name: string) => MOCK_CATEGORIES.find((c) => c.name === name)?.id;
  const data = cat === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter((p) => p.categoryId === idOf(cat));

  return (
    <ScreenContainer>
      <Header title="Menu" subtitle="Categories + products (mock)" right={<Button compact>Add Product</Button>} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, marginBottom: 8 }}>
        {cats.map((c) => (
          <Chip key={c} selected={cat === c} onPress={() => setCat(c)}>
            {c}
          </Chip>
        ))}
      </View>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={data}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Card style={{ flex: 1, marginBottom: 12 }}>
            <Text style={{ fontWeight: '700', color: colors.text }}>{item.name}</Text>
            <Text style={{ color: colors.muted }}>{formatVND(item.price)}</Text>
            <Text style={{ color: item.isAvailable ? colors.success : colors.danger, marginTop: 4 }}>
              {item.isAvailable ? 'Available' : 'Unavailable'}
            </Text>
          </Card>
        )}
      />
    </ScreenContainer>
  );
}
