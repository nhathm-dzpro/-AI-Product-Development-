import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '~/constants/Colors';
import { Platform, View, Text, StyleSheet } from 'react-native';

function TabIcon({ name, focused, label }: { name: keyof typeof Ionicons.glyphMap; focused: boolean; label: string }) {
  return (
    <View style={tabStyles.iconWrapper}>
      <Ionicons
        name={focused ? name : `${name}-outline` as any}
        size={22}
        color={focused ? Colors.primary : Colors.gray400}
      />
      <Text style={[tabStyles.label, focused && tabStyles.labelActive]}>{label}</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingTop: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.gray400,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 4,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon name="grid" focused={focused} label="Dashboard" />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ focused }) => <TabIcon name="bar-chart" focused={focused} label="Analytics" />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Kho hàng',
          tabBarIcon: ({ focused }) => <TabIcon name="cube" focused={focused} label="Kho hàng" />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => <TabIcon name="restaurant" focused={focused} label="Menu" />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({ focused }) => <TabIcon name="receipt" focused={focused} label="Đơn hàng" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ focused }) => <TabIcon name="settings" focused={focused} label="Cài đặt" />,
        }}
      />
    </Tabs>
  );
}
