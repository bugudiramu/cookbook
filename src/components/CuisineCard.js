import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Constants from './Constants';
import { useNavigation } from '@react-navigation/native';

const CuisineCard = ({ name }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cuisineCardContainer}
      onPress={
        () =>
          navigation.navigate('DishesScreen', {
            headerTitle: name,
            cuisineName: name,
          })
        // navigation.navigate('AddDish')
      }
    >
      <Text style={styles.cuisineName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CuisineCard;

const styles = StyleSheet.create({
  cuisineCardContainer: {
    width: Constants.width / 2.2,
    height: 200,
    backgroundColor: Constants.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
  },
  cuisineName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
