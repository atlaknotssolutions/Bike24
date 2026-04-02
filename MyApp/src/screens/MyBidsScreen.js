import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MyBidsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Bids</Text>
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have no active bids right now</Text>
        <Text style={styles.emptySub}>Browse auctions in Explore tab</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, color: '#666' },
  emptySub: { fontSize: 14, color: '#999', marginTop: 10 },
});

export default MyBidsScreen;