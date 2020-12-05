import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Constants from '../../components/Constants';
import { Picker } from '@react-native-picker/picker';
import useCurrentUser from '../../components/useCurrentUser';
import { firebase } from '../../firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddDish = (props) => {
  const navigation = useNavigation();
  const [cuisineTypes, setCuisineTypes] = useState(null);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState('');

  const { user } = useCurrentUser();
  console.log(user.id);

  const addRecipe = () => {
    console.log('User ID', user.id);
    firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .collection('recipes')
      .add({
        name: name,
        duration: parseInt(duration),
        description: description,
        cuisine: cuisineTypes,
      })
      .then(() => {
        console.log('recipe added success');
        setMessage('Recipe Added Successful');
        setName(''), setDuration(0), setDescription('');
        navigation.navigate('DishesScreen', {
          headerTitle: 'Recipes',
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <View style={styles.signupContainer}>
      <TextInput
        onChangeText={(val) => setName(val)}
        style={styles.textInput}
        placeholder='Recipe Name'
      />
      <TextInput
        onChangeText={(val) => setDuration(val)}
        style={styles.textInput}
        placeholder='Recipe Duration'
        textContentType='telephoneNumber'
      />
      <TextInput
        onChangeText={(val) => setDescription(val)}
        style={styles.textInput}
        placeholder='Recipe Description'
      />
      <Picker
        selectedValue={cuisineTypes}
        style={{ height: 50, width: '90%' }}
        onValueChange={(itemValue, itemIndex) => setCuisineTypes(itemValue)}
      >
        <Picker.Item label='Indian' value='Indian' />
        <Picker.Item label='Chinese' value='Chinese' />
        <Picker.Item label='American' value='American' />
        <Picker.Item label='Japanese' value='Japanese' />
      </Picker>
      <TouchableOpacity style={styles.searchButton} onPress={addRecipe}>
        <Text style={styles.btnText}>Add Recipe</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.error}>{message}</Text> : null}
    </View>
  );
};

export default AddDish;

const styles = StyleSheet.create({
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.width,
    height: Constants.height / 1.5,
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '90%',
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
