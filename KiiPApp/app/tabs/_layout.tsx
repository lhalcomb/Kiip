import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#27C12D',
          tabBarStyle: { backgroundColor: '#D3D3D3' }, 
          headerShown: false,
          tabBarShowLabel: false, 
        }}
      >
        <Tabs.Screen
          name="subscriptions"
          options={{
            tabBarIcon: ({ color }) => <Ionicons size={44} name="repeat-outline" color={color} />, 
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            tabBarIcon: ({ color }) => <Ionicons size={44} name="home-outline" color={color} />, 
          }}
        />
        <Tabs.Screen
          name="metrics"
          options={{
            tabBarIcon: ({ color }) => <Ionicons size={44} name="stats-chart-outline" color={color} />, 
          }}
        />
      </Tabs>
    );
}
