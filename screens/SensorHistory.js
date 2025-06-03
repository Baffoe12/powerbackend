import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SensorHistory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor History</Text>
      <Text>Placeholder for sensor history data and charts.</Text>
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
