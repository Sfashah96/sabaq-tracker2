// src/app/(tabs)/_layout.tsx
import {IconSymbol} from '@/components/ui/IconSymbol'; // We will create this
import {Colors} from '@/constants/Colors';
import {Tabs} from 'expo-router';
import React from 'react';
import {useColorScheme} from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.tint,
        tabBarInactiveTintColor: themeColors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: themeColors.surface,
          borderTopColor: themeColors.border
        },
        headerStyle: {
          backgroundColor: themeColors.surface
        },
        headerTintColor: themeColors.text
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tracker',
          headerTitle: 'Sabaq Tracker',
          tabBarIcon: ({color}) => <IconSymbol name="person.3.fill" color={color} />
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerTitle: 'All Records',
          tabBarIcon: ({color}) => <IconSymbol name="clock.arrow.circlepath" color={color} />
        }}
      />
    </Tabs>
  );
}
