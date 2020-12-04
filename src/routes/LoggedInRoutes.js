import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import Constants from '../components/Constants';

const Stack = createStackNavigator();
const LoggedInRoutes = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Constants.primaryColor,
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: 'Home',
        }}
        name='home'
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default LoggedInRoutes;
