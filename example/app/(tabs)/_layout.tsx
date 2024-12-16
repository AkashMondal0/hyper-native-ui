import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from 'hyper-native-ui';

export default function TabLayout() {
  const { currentTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.foreground,
        tabBarStyle: {
          backgroundColor: currentTheme.background,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
