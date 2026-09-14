import { router } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { Header } from '../../components/layout/Header';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';

const ITEMS = ['Profile', 'Restaurant', 'Notifications', 'Security'];

export default function Settings() {
  const { user, signOut } = useAuth();

  const logout = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  return (
    <ScreenContainer>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Card>
          <Avatar.Text size={48} label={(user?.name ?? 'A').slice(0, 1).toUpperCase()} />
          <Text style={{ fontWeight: '700', marginTop: 8 }}>{user?.name ?? 'Guest'}</Text>
          <Text>{user?.email ?? ''}</Text>
        </Card>
        <Card>
          {ITEMS.map((t) => (
            <List.Item key={t} title={t} right={(p) => <List.Icon {...p} icon="chevron-right" />} />
          ))}
          <List.Item title="Logout" onPress={logout} />
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
