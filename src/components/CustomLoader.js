import React from 'react';
import { ActivityIndicator } from 'react-native';
import Constants from './Constants';

const CustomLoader = () => {
  return (
    <ActivityIndicator
      size='large'
      color='red'
      style={{
        height: Constants.height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default CustomLoader;
