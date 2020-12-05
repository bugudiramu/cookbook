import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import Constants from '../components/Constants';
import TabNavigation from './TabNavigation';
import SelectCuisineScreen from '../screens/cuisine/SelectCuisineScreen';
import DishesScreen from '../screens/dishes/DishesScreen';
import DishDetailScreen from '../screens/dishes/DishDetailScreen';
import AddDish from '../screens/dishes/AddDish';

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
        component={TabNavigation}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Select Cuisine',
        }}
        name='SelectCuisineScreen'
        component={SelectCuisineScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Add Recipe',
        }}
        name='AddDish'
        component={AddDish}
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

export default LoggedInRoutes;
