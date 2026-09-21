import { Tabs, Redirect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ColorValue } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

function TabIcon(name: IconName) {
  function Icon({ color, size }: { color: ColorValue; size: number }) {
    return <MaterialCommunityIcons name={name} color={color as string} size={size} />;
  }
  Icon.displayName = `TabIcon(${name})`;
  return Icon;
}

export default function TabsLayout() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: TabIcon('home-outline') }} />
      <Tabs.Screen
        name="orders"
        options={{ title: 'Orders', tabBarIcon: TabIcon('receipt-text-outline') }}
      />
      <Tabs.Screen
        name="menu"
        options={{ title: 'Menu', tabBarIcon: TabIcon('food-fork-drink') }}
      />
      <Tabs.Screen
        name="inventory"
        options={{ title: 'Inventory', tabBarIcon: TabIcon('warehouse') }}
      />
      <Tabs.Screen
        name="analytics"
        options={{ title: 'Analytics', tabBarIcon: TabIcon('chart-line') }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings', tabBarIcon: TabIcon('cog-outline') }}
      />
    </Tabs>
  );
}
