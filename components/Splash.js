import React from 'react';
import {Button, Text, StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default function Splash() {
  return (
    <View style={styles.mainView}>
      <Text style={styles.viewItem}>Welcome!</Text>
      <Button
        title="Proceed"
        style={styles.viewItem}
        onPress={() => {
          Actions.posts();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  viewItem: {
    margin: 10,
  },
});
