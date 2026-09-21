import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '~/components/Header';
import { SearchBar } from '~/components/SearchBar';
import { InventoryCard } from '~/components/InventoryCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '~/components/Badge';
import { Colors } from '~/constants/Colors';
import { inventoryItems, InventoryItem } from '~/data/mockData';

const CATEGORIES = ['Tất cả', 'Thịt & Hải sản', 'Rau củ', 'Bột & Tinh bột', 'Gia vị'];
const STATUS_FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Còn hàng', value: 'in_stock' },
  { label: 'Sắp hết', value: 'low_stock' },
  { label: 'Hết hàng', value: 'out_of_stock' },
];

export default function InventoryScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activeStatus, setActiveStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [items, setItems] = useState(inventoryItems);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.supplier.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === 'Tất cả' || item.category === activeCategory;
      const matchStatus = activeStatus === 'all' || item.status === activeStatus;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [items, search, activeCategory, activeStatus]);

  const lowCount = items.filter((i) => i.status === 'low_stock').length;
  const outCount = items.filter((i) => i.status === 'out_of_stock').length;

  return (
    <View style={styles.container}>
      <Header
        title="Kho hàng"
        subtitle={`${items.length} nguyên liệu`}
        rightAction={{ icon: 'add', onPress: () => setShowAddModal(true) }}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: Colors.successLight }]}>
            <Text style={[styles.summaryNum, { color: Colors.success }]}>{items.filter(i => i.status === 'in_stock').length}</Text>
            <Text style={[styles.summaryLabel, { color: Colors.success }]}>Còn hàng</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: Colors.warningLight }]}>
            <Text style={[styles.summaryNum, { color: Colors.warning }]}>{lowCount}</Text>
            <Text style={[styles.summaryLabel, { color: Colors.warning }]}>Sắp hết</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: Colors.dangerLight }]}>
            <Text style={[styles.summaryNum, { color: Colors.danger }]}>{outCount}</Text>
            <Text style={[styles.summaryLabel, { color: Colors.danger }]}>Hết hàng</Text>
          </View>
        </View>

        {/* Search */}
        <SearchBar value={search} onChangeText={setSearch} placeholder="Tìm nguyên liệu, nhà cung cấp..." />

        {/* Category filter */}
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

        {/* Status filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.pills}>
            {STATUS_FILTERS.map((sf) => (
              <TouchableOpacity
                key={sf.value}
                onPress={() => setActiveStatus(sf.value)}
                style={[styles.statusPill, activeStatus === sf.value && styles.statusPillActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, activeStatus === sf.value && styles.pillTextActive]}>{sf.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* List */}
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyTitle}>Không tìm thấy</Text>
            <Text style={styles.emptySubtitle}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</Text>
          </View>
        ) : (
          filtered.map((item) => (
            <InventoryCard
              key={item.id}
              item={item}
              onEdit={() => setEditItem(item)}
            />
          ))
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Add Modal */}
      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowAddModal(false)}>
        <AddEditItemModal onClose={() => setShowAddModal(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal visible={!!editItem} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setEditItem(null)}>
        {editItem ? <AddEditItemModal item={editItem} onClose={() => setEditItem(null)} /> : null}
      </Modal>
    </View>
  );
}

function AddEditItemModal({ item, onClose }: { item?: InventoryItem; onClose: () => void }) {
  const [name, setName] = useState(item?.name ?? '');
  const [quantity, setQuantity] = useState(item?.quantity?.toString() ?? '');
  const [minStock, setMinStock] = useState(item?.minStock?.toString() ?? '');
  const [supplier, setSupplier] = useState(item?.supplier ?? '');

  return (
    <View style={modalStyles.container}>
      <View style={modalStyles.handle} />
      <Text style={modalStyles.title}>{item ? 'Chỉnh sửa' : 'Thêm nguyên liệu'}</Text>

      <ScrollView contentContainerStyle={modalStyles.body} showsVerticalScrollIndicator={false}>
        <Input label="Tên nguyên liệu" value={name} onChangeText={setName} placeholder="Vd: Thịt bò" icon="cube" />
        <Input label="Số lượng hiện tại" value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="0" icon="layers" />
        <Input label="Tồn kho tối thiểu" value={minStock} onChangeText={setMinStock} keyboardType="numeric" placeholder="0" icon="alert-circle" />
        <Input label="Nhà cung cấp" value={supplier} onChangeText={setSupplier} placeholder="Tên công ty" icon="business" />

        <View style={modalStyles.actions}>
          <Button label="Huỷ" onPress={onClose} variant="secondary" fullWidth />
          <Button
            label={item ? 'Lưu thay đổi' : 'Thêm mới'}
            onPress={onClose}
            variant="primary"
            fullWidth
          />
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
  summaryCard: {
    flex: 1, borderRadius: 14, padding: 12, alignItems: 'center', gap: 4,
  },
  summaryNum: { fontSize: 22, fontWeight: '800' },
  summaryLabel: { fontSize: 11, fontWeight: '600' },
  pills: { flexDirection: 'row', gap: 8, paddingRight: 16 },
  pill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
  },
  pillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statusPill: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
  },
  statusPillActive: { backgroundColor: Colors.text, borderColor: Colors.text },
  pillText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  pillTextActive: { color: Colors.white },
  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
  emptySubtitle: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', paddingHorizontal: 40 },
});
