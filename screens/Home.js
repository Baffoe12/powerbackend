import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const sampleData = [
  { day: 'Mon', value: 50 },
  { day: 'Tue', value: 10 },
  { day: 'Wed', value: 40 },
  { day: 'Thu', value: 95 },
  { day: 'Fri', value: 85 },
  { day: 'Sat', value: 91 },
  { day: 'Sun', value: 35 },
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInDown} style={styles.section}>
        <Text style={styles.sectionTitle}>Promotion Effectiveness Analysis</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 20 }}
          height={200}
        >
          <VictoryAxis
            tickValues={sampleData.map((d) => d.day)}
            style={{ tickLabels: { fontSize: 10, padding: 5 } }}
          />
          <VictoryAxis
            dependentAxis
            style={{ tickLabels: { fontSize: 10, padding: 5 } }}
          />
          <VictoryBar
            data={sampleData}
            x="day"
            y="value"
            style={{ data: { fill: "#007AFF" } }}
            barRatio={0.8}
          />
        </VictoryChart>
      </Animated.View>

      <Animated.View entering={FadeInUp} style={styles.section}>
        <Text style={styles.sectionTitle}>Drill-down Analysis</Text>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>Rank</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Brand</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Sales</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Quantity</Text>
          </View>
          {['Carhartt', 'Obey', 'JORDAN', 'UGG', 'NIKE'].map((brand, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{brand}</Text>
              <Text style={styles.tableCell}>400K</Text>
              <Text style={styles.tableCell}>230M</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown} style={styles.section}>
        <Text style={styles.sectionTitle}>User Analysis</Text>
        <View style={styles.userStats}>
          <View style={styles.userStatBox}>
            <Text style={styles.userStatNumber}>540</Text>
            <Text style={styles.userStatLabel}>User Segment</Text>
          </View>
          <View style={styles.userStatBox}>
            <Text style={styles.userStatNumber}>400 / 1,000</Text>
            <Text style={styles.userStatLabel}>Targeting Result</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 15,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111827',
  },
  table: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: '#d1d5db',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#374151',
  },
  headerCell: {
    fontWeight: '700',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  userStatBox: {
    alignItems: 'center',
  },
  userStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  userStatLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
});
