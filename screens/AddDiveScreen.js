import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AddDive from '../components/AddDiveComponent';

export default function AddDiveScreen() {
  return (
    <ScrollView style={styles.container}>
      <AddDive />
    </ScrollView>
  );
}

AddDiveScreen.navigationOptions = {
  title: 'Add Dive',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});