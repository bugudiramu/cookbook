import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoggedInRoutes from './src/routes/LoggedInRoutes';
import LoggedOutRoutes from './src/routes/LoggedOutRoutes';

import { firebase } from './src/firebase/Config';
import CustomLoader from './src/components/CustomLoader';

const App = (props) => {
  const Stack = createStackNavigator();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('USER ID', user.uid);
        setAuthenticated(true);
        setLoading(false);
      } else {
        console.log('User not yet found');
        setAuthenticated(false);
      }
    });
  }, []);
  if (loading) {
    return <CustomLoader />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* props.userToken !== null */}
        {!authenticated ? (
          <Stack.Screen name='UnAuth' component={LoggedInRoutes} />
        ) : (
          <Stack.Screen name='Auth' component={LoggedOutRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
