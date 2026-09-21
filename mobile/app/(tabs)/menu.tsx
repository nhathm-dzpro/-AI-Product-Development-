import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '~/components/Header';
import { SearchBar } from '~/components/SearchBar';
import { ProductCard } from '~/components/ProductCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Colors } from '~/constants/Colors';
import { menuItems, MenuItem } from '~/data/mockData';

const CATEGORIES = ['Tất cả', 'Món Chính', 'Món Khai Vị', 'Lẩu', 'Đồ Uống'];

export default function MenuScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [showOnly, setShowOnly] = useState<'all' | 'available' | 'unavailable'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [items, setItems] = useState(menuItems);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === 'Tất cả' || item.category === activeCategory;
      const matchAvail = showOnly === 'all' || (showOnly === 'available' ? item.available : !item.available);
      return matchSearch && matchCategory && matchAvail;
    });
  }, [items, search, activeCategory, showOnly]);

  const handleToggle = (id: string, available: boolean) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, available } : i));
  };

  const availableCount = items.filter((i) => i.available).length;

  return (
    <View style={styles.container}>
      <Header
        title="Thực đơn"
        subtitle={`${availableCount}/${items.length} món đang bán`}
        rightAction={{ icon: 'add', onPress: () => setShowAddModal(true) }}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.summaryRow}>
          <TouchableOpacity
            onPress={() => setShowOnly('all')}
            style={[styles.sumCard, showOnly === 'all' && styles.sumCardActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.sumNum, showOnly === 'all' && styles.sumNumActive]}>{items.length}</Text>
            <Text style={[styles.sumLabel, showOnly === 'all' && styles.sumLabelActive]}>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowOnly('available')}
            style={[styles.sumCard, styles.sumCardSuccess, showOnly === 'available' && styles.sumCardSuccessActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.sumNum, { color: Colors.success }]}>{availableCount}</Text>
            <Text style={[styles.sumLabel, { color: Colors.success }]}>Còn phục vụ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowOnly('unavailable')}
            style={[styles.sumCard, styles.sumCardDanger, showOnly === 'unavailable' && styles.sumCardDangerActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.sumNum, { color: Colors.danger }]}>{items.length - availableCount}</Text>
            <Text style={[styles.sumLabel, { color: Colors.danger }]}>Tạm ngừng</Text>
          </TouchableOpacity>
        </View>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Tìm tên món, danh mục..." />

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.pills}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[styles.pill, activeCategory === cat && styles.pillActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, activeCategory === cat && styles.pillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Results count */}
        <Text style={styles.resultCount}>{filtered.length} món</Text>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyTitle}>Không tìm thấy</Text>
            <Text style={styles.emptySubtitle}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</Text>
            <Button label="Thêm món mới" onPress={() => setShowAddModal(true)} icon="add" style={{ marginTop: 8 }} />
          </View>
        ) : (
          filtered.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onEdit={() => setEditItem(item)}
              onToggleAvailable={handleToggle}
            />
          ))
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowAddModal(false)}>
        <AddEditProductModal onClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal visible={!!editItem} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setEditItem(null)}>
        {editItem ? <AddEditProductModal item={editItem} onClose={() => setEditItem(null)} /> : null}
      </Modal>
    </View>
  );
}

function AddEditProductModal({ item, onClose }: { item?: MenuItem; onClose: () => void }) {
  const [name, setName] = useState(item?.name ?? '');
  const [price, setPrice] = useState(item?.price?.toString() ?? '');
  const [category, setCategory] = useState(item?.category ?? '');
  const [description, setDescription] = useState(item?.description ?? '');

  return (
    <View style={modalStyles.container}>
      <View style={modalStyles.handle} />
      <Text style={modalStyles.title}>{item ? 'Chỉnh sửa món' : 'Thêm món mới'}</Text>
      <ScrollView contentContainerStyle={modalStyles.body} showsVerticalScrollIndicator={false}>
        <Input label="Tên món" value={name} onChangeText={setName} placeholder="Vd: Phở Bò" icon="restaurant" />
        <Input label="Danh mục" value={category} onChangeText={setCategory} placeholder="Vd: Món Chính" icon="list" />
        <Input
          label="Giá (VND)"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="75000"
          icon="cash"
          hint="Nhập giá không có dấu phẩy"
        />
        <Input
          label="Mô tả"
          value={description}
          onChangeText={setDescription}
          placeholder="Mô tả ngắn về món ăn"
          icon="document-text"
          multiline
          numberOfLines={3}
        />
        <View style={modalStyles.actions}>
          <Button label="Huỷ" onPress={onClose} variant="secondary" fullWidth />
          <Button label={item ? 'Lưu thay đổi' : 'Thêm mới'} onPress={onClose} variant="primary" fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20, paddingTop: 12 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 20 },
  body: { gap: 16 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, gap: 12 },
  summaryRow: { flexDirection: 'row', gap: 10 },
  sumCard: {
    flex: 1, borderRadius: 14, padding: 12, alignItems: 'center', gap: 2,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
  },
  sumCardActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  sumCardSuccess: { backgroundColor: Colors.successLight, borderColor: Colors.successLight },
  sumCardSuccessActive: { borderColor: Colors.success },
  sumCardDanger: { backgroundColor: Colors.dangerLight, borderColor: Colors.dangerLight },
  sumCardDangerActive: { borderColor: Colors.danger },
  sumNum: { fontSize: 20, fontWeight: '800', color: Colors.text },
  sumNumActive: { color: Colors.white },
  sumLabel: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary },
  sumLabelActive: { color: Colors.white },
  pills: { flexDirection: 'row', gap: 8, paddingRight: 16 },
  pill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
  },
  pillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  pillText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  pillTextActive: { color: Colors.white },
  resultCount: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  emptyState: { alignItems: 'center', paddingVertical: 48, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
  emptySubtitle: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', paddingHorizontal: 40 },
});
