import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '~/components/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Colors } from '~/constants/Colors';

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBg?: string;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  destructive?: boolean;
}

function SettingRow({ icon, iconColor = Colors.primary, iconBg = Colors.primaryLight, label, value, onPress, rightElement, destructive }: SettingRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.row}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !rightElement}
    >
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={[styles.rowLabel, destructive && { color: Colors.danger }]}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      {rightElement ?? null}
      {onPress && !rightElement ? <Ionicons name="chevron-forward" size={16} color={Colors.gray300} /> : null}
    </TouchableOpacity>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [pushNotif, setPushNotif] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất khỏi tài khoản?',
      [
        { text: 'Huỷ', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: () => {} },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Cài đặt" />

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <TouchableOpacity onPress={() => setShowProfileModal(true)} activeOpacity={0.8} style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AN</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Nguyễn Văn Anh</Text>
            <Text style={styles.profileRole}>Quản lý nhà hàng</Text>
            <Text style={styles.profileEmail}>vananh@alnrestaurant.vn</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray300} />
        </TouchableOpacity>

        {/* Restaurant Info */}
        <SectionHeader title="Thông tin nhà hàng" />
        <Card padding={0} style={styles.section}>
          <SettingRow
            icon="storefront"
            label="Tên nhà hàng"
            value="Nhà hàng ALN"
            onPress={() => setShowProfileModal(true)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="location"
            iconColor={Colors.danger}
            iconBg={Colors.dangerLight}
            label="Địa chỉ"
            value="12 Lê Lợi, Q.1, TP.HCM"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="call"
            iconColor={Colors.success}
            iconBg={Colors.successLight}
            label="Số điện thoại"
            value="028 3821 5566"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="time"
            iconColor={Colors.warning}
            iconBg={Colors.warningLight}
            label="Giờ hoạt động"
            value="7:00 - 22:00"
            onPress={() => {}}
          />
        </Card>

        {/* Account */}
        <SectionHeader title="Tài khoản quản lý" />
        <Card padding={0} style={styles.section}>
          <SettingRow
            icon="person"
            label="Thông tin cá nhân"
            onPress={() => setShowProfileModal(true)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="people"
            iconColor={Colors.ai}
            iconBg={Colors.aiLight}
            label="Nhân viên"
            value="12 người"
            onPress={() => {}}
          />
        </Card>

        {/* Notifications */}
        <SectionHeader title="Thông báo" />
        <Card padding={0} style={styles.section}>
          <SettingRow
            icon="notifications"
            label="Thông báo đẩy"
            rightElement={
              <Switch
                value={pushNotif}
                onValueChange={setPushNotif}
                trackColor={{ false: Colors.gray200, true: Colors.primaryLight }}
                thumbColor={pushNotif ? Colors.primary : Colors.gray400}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="receipt"
            iconColor={Colors.warning}
            iconBg={Colors.warningLight}
            label="Cảnh báo đơn hàng"
            rightElement={
              <Switch
                value={orderAlerts}
                onValueChange={setOrderAlerts}
                trackColor={{ false: Colors.gray200, true: Colors.primaryLight }}
                thumbColor={orderAlerts ? Colors.primary : Colors.gray400}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="cube"
            iconColor={Colors.danger}
            iconBg={Colors.dangerLight}
            label="Cảnh báo tồn kho"
            rightElement={
              <Switch
                value={stockAlerts}
                onValueChange={setStockAlerts}
                trackColor={{ false: Colors.gray200, true: Colors.primaryLight }}
                thumbColor={stockAlerts ? Colors.primary : Colors.gray400}
              />
            }
          />
        </Card>

        {/* Security */}
        <SectionHeader title="Bảo mật" />
        <Card padding={0} style={styles.section}>
          <SettingRow
            icon="lock-closed"
            iconColor={Colors.ai}
            iconBg={Colors.aiLight}
            label="Đổi mật khẩu"
            onPress={() => setShowSecurityModal(true)}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="finger-print"
            iconColor={Colors.success}
            iconBg={Colors.successLight}
            label="Xác thực sinh trắc học"
            rightElement={
              <Switch
                value={true}
                trackColor={{ false: Colors.gray200, true: Colors.successLight }}
                thumbColor={Colors.success}
              />
            }
          />
        </Card>

        {/* Theme */}
        <SectionHeader title="Giao diện" />
        <Card padding={0} style={styles.section}>
          <SettingRow
            icon="moon"
            iconColor={Colors.ai}
            iconBg={Colors.aiLight}
            label="Chế độ tối"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: Colors.gray200, true: Colors.aiLight }}
                thumbColor={darkMode ? Colors.ai : Colors.gray400}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="language"
            label="Ngôn ngữ"
            value="Tiếng Việt"
            onPress={() => {}}
          />
        </Card>

        {/* AI Copilot */}
        <SectionHeader title="AI Copilot" />
        <Card padding={0} style={styles.section}>
          <SettingRow
            icon="sparkles"
            iconColor={Colors.ai}
            iconBg={Colors.aiLight}
            label="AI Restaurant Copilot"
            value="Đang bật"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="bar-chart"
            iconColor={Colors.ai}
            iconBg={Colors.aiLight}
            label="Phân tích AI nâng cao"
            rightElement={
              <Switch
                value={true}
                trackColor={{ false: Colors.gray200, true: Colors.aiLight }}
                thumbColor={Colors.ai}
              />
            }
          />
        </Card>

        {/* App Info */}
        <SectionHeader title="Thông tin ứng dụng" />
        <Card padding={0} style={styles.section}>
          <SettingRow
            icon="information-circle"
            iconColor={Colors.textSecondary}
            iconBg={Colors.gray100}
            label="Phiên bản"
            value="1.0.0"
          />
          <View style={styles.divider} />
          <SettingRow
            icon="document-text"
            iconColor={Colors.textSecondary}
            iconBg={Colors.gray100}
            label="Điều khoản dịch vụ"
            onPress={() => {}}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="shield-checkmark"
            iconColor={Colors.textSecondary}
            iconBg={Colors.gray100}
            label="Chính sách bảo mật"
            onPress={() => {}}
          />
        </Card>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn} activeOpacity={0.8}>
          <Ionicons name="log-out" size={18} color={Colors.danger} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Profile Modal */}
      <Modal visible={showProfileModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowProfileModal(false)}>
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      </Modal>

      {/* Security Modal */}
      <Modal visible={showSecurityModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowSecurityModal(false)}>
        <SecurityModal onClose={() => setShowSecurityModal(false)} />
      </Modal>
    </View>
  );
}

function ProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <View style={modalStyles.container}>
      <View style={modalStyles.handle} />
      <Text style={modalStyles.title}>Thông tin cá nhân</Text>
      <ScrollView contentContainerStyle={modalStyles.body}>
        <Input label="Họ và tên" defaultValue="Nguyễn Văn Anh" icon="person" />
        <Input label="Email" defaultValue="vananh@alnrestaurant.vn" icon="mail" keyboardType="email-address" />
        <Input label="Số điện thoại" defaultValue="0901 234 567" icon="call" keyboardType="phone-pad" />
        <Input label="Chức vụ" defaultValue="Quản lý nhà hàng" icon="briefcase" />
        <View style={modalStyles.actions}>
          <Button label="Huỷ" onPress={onClose} variant="secondary" fullWidth />
          <Button label="Lưu thay đổi" onPress={onClose} variant="primary" fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}

function SecurityModal({ onClose }: { onClose: () => void }) {
  return (
    <View style={modalStyles.container}>
      <View style={modalStyles.handle} />
      <Text style={modalStyles.title}>Đổi mật khẩu</Text>
      <ScrollView contentContainerStyle={modalStyles.body}>
        <Input label="Mật khẩu hiện tại" secureTextEntry icon="lock-closed" placeholder="••••••••" />
        <Input label="Mật khẩu mới" secureTextEntry icon="lock-open" placeholder="••••••••" />
        <Input label="Xác nhận mật khẩu mới" secureTextEntry icon="checkmark-circle" placeholder="••••••••" />
        <View style={modalStyles.actions}>
          <Button label="Huỷ" onPress={onClose} variant="secondary" fullWidth />
          <Button label="Đổi mật khẩu" onPress={onClose} variant="primary" fullWidth />
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
  scroll: { padding: 16, gap: 6 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.white, borderRadius: 16, padding: 16,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, shadowRadius: 8, elevation: 3, marginBottom: 8,
  },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: Colors.white },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '700', color: Colors.text },
  profileRole: { fontSize: 13, color: Colors.primary, fontWeight: '600', marginTop: 1 },
  profileEmail: { fontSize: 12, color: Colors.textSecondary, marginTop: 1 },
  sectionHeader: {
    fontSize: 12, fontWeight: '700', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.8, paddingLeft: 4,
    marginTop: 14, marginBottom: 6,
  },
  section: {
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1, shadowRadius: 8, elevation: 3,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 13,
  },
  rowIcon: {
    width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: Colors.text },
  rowValue: { fontSize: 13, color: Colors.textSecondary, marginRight: 4 },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 62 },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, backgroundColor: Colors.dangerLight, borderRadius: 14,
    padding: 16, marginTop: 12,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: Colors.danger },
});
