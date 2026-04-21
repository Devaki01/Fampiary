import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Hexagon, Search, Radio, User } from 'lucide-react-native';

import HiveScreen from '../screens/HiveScreen';
import SearchScreen from '../screens/SearchScreen';
import SwarmScreen from '../screens/SwarmScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#D97706', // honey-600
          tabBarInactiveTintColor: '#A1A1AA', // zinc-400
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#FEF3C7', // honey-100
            borderTopWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tab.Screen 
          name="Hive" 
          component={HiveScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <Hexagon color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <Search color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Swarm" 
          component={SwarmScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <Radio color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
