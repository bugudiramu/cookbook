import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Constants from '../components/Constants';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: Constants.primaryColor,
        activeTintColor: 'white',
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
        }}
        name='HomeScreen'
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
        }}
        name='ProfileScreen'
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
