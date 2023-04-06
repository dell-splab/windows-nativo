/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  NativeModules,
} from 'react-native';
const App = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const styles = StyleSheet.create({
    dark: {
      color: '#fff',
      backgroundColor: '#000',
    },
    light: {
      color: '#000',
      backgroundColor: '#fff',
    },
    formItem: {
      marginBottom: 6,
    },
  });

  const showFullName = () => {
    NativeModules.Notifications.raise(`Hello ${firstName} ${lastName}`);
  };
  return (
    <SafeAreaView style={styles.dark}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.dark}>
        <View style={{padding: 12}}>
          <Text style={styles.dark}>First name</Text>
          <TextInput
            style={styles.formItem}
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text style={styles.dark}>Last name</Text>
          <TextInput
            style={styles.formItem}
            value={lastName}
            onChangeText={setLastName}
          />
          <Button
            style={styles.formItem}
            title="OK"
            onPress={showFullName}
            disabled={!firstName || !lastName}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
