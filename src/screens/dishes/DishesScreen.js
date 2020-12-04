import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import DishCard from '../../components/DishCard';
import CustomLoader from '../../components/CustomLoader';
import Constants from '../../components/Constants';

const DishesScreen = (props) => {
  const { cuisineName } = props.route.params;
  console.log(cuisineName);
  const [dishes, setDishes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState({});

  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

      <TouchableOpacity style={styles.searchButton} onPress={getSpecificRecipe}>
        <Text style={styles.btnText}>Search</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <View style={styles.dishesContainer}>
        {searchResults &&
          searchResults.map((dish, index) => {
            return <DishCard dish={dish} key={index} />;
          })}
      </View>
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
    width: '90%',
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
