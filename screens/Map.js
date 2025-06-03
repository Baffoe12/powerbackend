import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Map() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <Text>Placeholder for map view and location data.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
});
