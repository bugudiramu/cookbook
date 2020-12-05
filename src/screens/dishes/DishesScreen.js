import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import DishCard from '../../components/DishCard';
import CustomLoader from '../../components/CustomLoader';
import Constants from '../../components/Constants';
import useCurrentUser from '../../components/useCurrentUser';
import { firebase } from '../../firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DishesScreen = (props) => {
  const { cuisineName } = props.route.params;
  console.log(cuisineName);
  const [dishes, setDishes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState({});

  const [loading, setLoading] = useState(true);
  const { user } = useCurrentUser();
  console.log('Heyyyy', searchResults.length);
  const db = firebase.firestore().collection('users');
  useEffect(() => {
    // .collection('recipes')
    AsyncStorage.getItem('token').then((val) => {
      db.doc(val)
        .collection('recipes')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log('data', doc.data());
            setSearchResults((prev) => [...prev, doc.data()]);
          });
        });
    });
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisineName}&apiKey=3dd185ecafe14970a624f3c1fba88d52`
      )
      .then((response) => {
        console.log(response.data.results);
        setDishes(response.data.results);
        setSearchResults(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const getSpecificRecipe = () => {
    AsyncStorage.getItem('token').then((val) => {
      db.doc(val)
        .collection('recipes')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log('data', doc.data());
            setSearchResults((prev) => [...prev, doc.data()]);
          });
        });
    });
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisineName}&query=${searchTerm}&apiKey=3dd185ecafe14970a624f3c1fba88d52`
      )
      .then((response) => {
        console.log(response.data.results);
        setSearchResults(response.data.results);

        setLoading(false);
      })

      .catch((error) => {
        console.log(error.message);
      });
    setSearchTerm('');
  };
  if (loading) {
    return <CustomLoader />;
  }

  return (
    <ScrollView>
      <TextInput
        placeholder='Search Recipes'
        style={styles.textInput}
        onChangeText={(val) => {
          if (val.length >= 3) {
            setSearchTerm(val.toString().toLocaleLowerCase());
            setMessage('');
          } else {
            setMessage('Required min 3 chars.');
          }
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={getSpecificRecipe}
        >
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => props.navigation.navigate('AddDish')}
        >
          <Text style={styles.btnText}>Add Dish</Text>
        </TouchableOpacity>
      </View>
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <View style={styles.dishesContainer}>
        {searchResults &&
          searchResults.map((dish, index) => {
            return <DishCard dish={dish} key={index} />;
          })}
      </View>
      {searchResults.length <= 0 ? (
        <Text style={styles.error}>No Items matched to - {searchTerm}</Text>
      ) : null}
    </ScrollView>
  );
};

export default DishesScreen;

const styles = StyleSheet.create({
  dishesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    margin: 10,
    width: '40%',
    paddingVertical: 10,
    backgroundColor: Constants.primaryColor,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
