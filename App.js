/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {StatusBar, Text, View, useColorScheme} from 'react-native';
import store, {persistor} from './redux/store';
import {Provider} from 'react-redux';

import Splash from './components/Splash';
import PostList from './components/PostList';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Router>
        <Stack key="root">
          <Scene
            key="splash"
            component={Splash}
            hideNavBar={true}
            initial={true}
          />
          <Scene
            key="posts"
            component={PostList}
            title="Posts"
            hideNavBar={true}
          />
        </Stack>
      </Router>
    </Provider>
  );
};

export default App;
