import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Constants from '../../components/Constants';
import { firebase } from '../../firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signUp = () => {
    if (email.length > 3 && password.length > 3) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          firebase.firestore().collection('users').doc(res.user.uid).set({
            id: res.user.uid,
            email: email,
          });
          AsyncStorage.setItem('token', res.user.uid);
        })
        .then((res) => {
          setMessage('User successfully created');
        })
        .catch((error) => {
          setMessage(error.message);
        });
    } else {
      setMessage('Email and Password must be greater than 3 chars.');
    }
  };

  return (
    <View style={styles.signupContainer}>
      <TextInput
        onChangeText={(val) => setEmail(val)}
        style={styles.textInput}
        placeholder='Enter Email'
        autoCapitalize='none'
      />
      <TextInput
        onChangeText={(val) => setPassword(val)}
        style={styles.textInput}
        placeholder='Enter Password'
        autoCapitalize='none'
      />
      <TouchableOpacity style={styles.searchButton} onPress={signUp}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
        }}
        onPress={() => props.navigation.navigate('SelectCuisineScreen')}
      >
        <Text>Skip Log In</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.error}>{message}</Text> : null}
    </View>
  );
};

export default Signup;

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
