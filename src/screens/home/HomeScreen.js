import React from 'react';
import { Text, View } from 'react-native';
import SelectCuisineScreen from '../cuisine/SelectCuisineScreen';
import AddDish from '../dishes/AddDish';

const HomeScreen = () => {
  return (
    <View>
      <SelectCuisineScreen />
    </View>
  );
};

export default HomeScreen;
