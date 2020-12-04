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

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const login = () => {
    if (email.length > 3 && password.length > 3) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          AsyncStorage.setItem('token', res.user.uid);
        })
        .then((res) => {
          setMessage('User successfully loggedin');
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
      <TouchableOpacity style={styles.searchButton} onPress={login}>
        <Text style={styles.btnText}>Login Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate('signup')}>
        <Text>Don't have an account? Signup</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.error}>{message}</Text> : null}
    </View>
  );
};

export default Login;

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
