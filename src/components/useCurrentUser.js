import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/Config';

const useCurrentUser = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then((val) => {
      //   console.log('TOKEN', val);
      firebase
        .firestore()
        .collection('users')
        .doc(val)
        .get()
        .then((doc) => {
          // console.log('USER', doc.data());
          setUser(doc.data());
        });
    });
  }, []);
  return { user };
};

export default useCurrentUser;
