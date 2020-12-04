import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from './Constants';
import { useNavigation } from '@react-navigation/native';

const DishCard = (props) => {
  const navigation = useNavigation();
  const {
    dish: { image, title, id },
  } = props;

  return (
    <TouchableOpacity
      style={styles.dishContainer}
      onPress={() =>
        navigation.navigate('DishDetailScreen', {
          headerTitle: `${title.substring(0, 20)}...`,
          id: id,
        })
      }
    >
      <Image style={styles.dishContainerImage} source={{ uri: image }} />
      <Text style={styles.dishContainerTitle}>
        {title.length > 30 ? `${title.substring(0, 30)}...` : title}
      </Text>
    </TouchableOpacity>
  );
};

export default DishCard;

const styles = StyleSheet.create({
  dishContainer: {
    width: Constants.width / 2.2,
    height: 250,
    backgroundColor: Constants.primaryColor,
    margin: 8,
    borderRadius: 8,
  },
  dishContainerImage: {
    height: 180,
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dishContainerTitle: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
});
