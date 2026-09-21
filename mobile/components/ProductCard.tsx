import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem, formatCurrency } from '~/data/mockData';
import { Colors } from '~/constants/Colors';

interface ProductCardProps {
  item: MenuItem;
  onEdit?: () => void;
  onToggleAvailable?: (id: string, available: boolean) => void;
}

export function ProductCard({ item, onEdit, onToggleAvailable }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={onEdit} style={styles.editBtn} activeOpacity={0.7}>
            <Ionicons name="pencil" size={13} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>

        <View style={styles.footer}>
          <View style={styles.priceBlock}>
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            <View style={styles.soldRow}>
              <Ionicons name="flame" size={11} color={Colors.warning} />
              <Text style={styles.soldText}>{item.soldToday} hôm nay</Text>
            </View>
          </View>
          <View style={styles.switchRow}>
            <Text style={[styles.availableLabel, { color: item.available ? Colors.success : Colors.textSecondary }]}>
              {item.available ? 'Còn' : 'Hết'}
            </Text>
            <Switch
              value={item.available}
              onValueChange={(v) => onToggleAvailable?.(item.id, v)}
              trackColor={{ false: Colors.gray200, true: Colors.primaryLight }}
              thumbColor={item.available ? Colors.primary : Colors.gray400}
              style={styles.switch}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 110,
    backgroundColor: Colors.gray100,
  },
  body: {
    flex: 1,
    padding: 12,
    gap: 3,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginRight: 6,
  },
  editBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  priceBlock: {
    gap: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  soldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  soldText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  availableLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
