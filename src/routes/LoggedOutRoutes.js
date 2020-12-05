import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/signup/Signup';
import Constants from '../components/Constants';
import SelectCuisineScreen from '../screens/cuisine/SelectCuisineScreen';
import DishesScreen from '../screens/dishes/DishesScreen';
import DishDetailScreen from '../screens/dishes/DishDetailScreen';
import Login from '../screens/login/Login';

const Stack = createStackNavigator();
const LoggedOutRoutes = () => {
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
          headerTitle: 'Log In',
        }}
        name='login'
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Sign Up',
        }}
        name='signup'
        component={Signup}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Select Cuisine',
        }}
        name='SelectCuisineScreen'
        component={SelectCuisineScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: route.params.headerTitle,
        })}
        name='DishesScreen'
        component={DishesScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: route.params.headerTitle,
        })}
        name='DishDetailScreen'
        component={DishDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default LoggedOutRoutes;
