import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CuisineCard from '../../components/CuisineCard';

const SelectCuisineScreen = () => {
  // let data =[{
  //   id:1,name:'America',value:'America'
  // }]
  return (
    <View style={styles.cuisineContainer}>
      <CuisineCard name='Indian' />
      <CuisineCard name='American' />
      <CuisineCard name='Chinese' />
      <CuisineCard name='Japanese' />
    </View>
  );
};

export default SelectCuisineScreen;

const styles = StyleSheet.create({
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
});
