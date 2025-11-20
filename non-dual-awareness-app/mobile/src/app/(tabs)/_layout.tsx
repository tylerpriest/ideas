/**
 * Tab Navigation Layout
 * Main tab-based navigation for the app
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../../constants/theme';
import { usePreferences } from '../../store/usePreferences';

// Import screens (we'll create these next)
import SitScreen from './sit';
import ContemplateScreen from './contemplate';
import InquireScreen from './inquire';
import JournalScreen from './journal';
import SettingsScreen from './settings';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const { theme } = usePreferences();
  const isDark = theme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primaryAccent,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomColor: colors.divider,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
          color: colors.primaryText,
        },
      }}
    >
      <Tab.Screen
        name="sit"
        component={SitScreen}
        options={{
          title: 'Sit',
          tabBarLabel: 'Sit',
        }}
      />
      <Tab.Screen
        name="contemplate"
        component={ContemplateScreen}
        options={{
          title: 'Contemplate',
          tabBarLabel: 'Contemplate',
        }}
      />
      <Tab.Screen
        name="inquire"
        component={InquireScreen}
        options={{
          title: 'Inquire',
          tabBarLabel: 'Inquire',
        }}
      />
      <Tab.Screen
        name="journal"
        component={JournalScreen}
        options={{
          title: 'Journal',
          tabBarLabel: 'Journal',
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
