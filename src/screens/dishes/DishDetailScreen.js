import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import CustomLoader from '../../components/CustomLoader';
import Constants from '../../components/Constants';
import { MaterialIcons } from '@expo/vector-icons';
import useCurrentUser from '../../components/useCurrentUser';
import { firebase } from '../../firebase/Config';

const DishDetailScreen = (props) => {
  const { user } = useCurrentUser();

  useEffect(() => {
    // firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(user.id)
    //   .collection('recipes')
    //   .doc('k52Ksb2Fi4p3ErsBJLUL')
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       setFavorite(doc.data().favorite);
    //     });
    //   });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=3dd185ecafe14970a624f3c1fba88d52`
      )
      .then((response) => {
        console.log(response.data);
        setDish(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const [favorite, setFavorite] = useState(false);
  console.log(props);
  const { id } = props.route.params;

  const [dish, setDish] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  //   summary,title,image,readyInMinutes

  const addToFavorite = () => {
    setFavorite(!favorite);
    firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .collection('recipes')
      .doc('k52Ksb2Fi4p3ErsBJLUL')
      .update({
        favorite: favorite,
      });
    if (!favorite) {
      setMessage('Added To Favorites');
    } else {
      setMessage('Removed From Favorites');
    }
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };
  if (loading) {
    return <CustomLoader />;
  }
  if (!dish) {
    return <Text>No Description</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.dishDetailContainer}>
        <Image style={styles.dishImage} source={{ uri: dish.image }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 20,
            marginHorizontal: 10,
            alignItems: 'center',
          }}
        >
          <Text style={styles.dishTitle}>{dish.title}</Text>
          <MaterialIcons
            name={favorite ? 'favorite' : 'favorite-border'}
            size={30}
            color='red'
            onPress={addToFavorite}
          />

          <Text style={styles.dishReadyInMinutes}>
            {dish.readyInMinutes} min
          </Text>
        </View>
        <Text style={styles.error}> {message}</Text>
        <Text style={styles.dishSummary}>{dish.summary}</Text>
      </View>
    </ScrollView>
  );
};

export default DishDetailScreen;

const styles = StyleSheet.create({
  dishImage: {
    width: Constants.width,
    height: 250,
    resizeMode: 'cover',
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%',
    color: Constants.primaryColor,
  },
  dishReadyInMinutes: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '30%',
    color: Constants.primaryColor,
    textAlign: 'right',
  },
  dishSummary: {
    color: '#555',
    marginHorizontal: 10,
    textAlign: 'justify',
    marginBottom: 20,
  },
  error: {
    color: Constants.primaryColor,
    textAlign: 'center',
  },
});
