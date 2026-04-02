import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balance}>₹48,750.00</Text>
        <Text style={styles.withdrawable}>₹42,000 withdrawable</Text>
      </View>

      <Text style={styles.section}>Recent Transactions</Text>
      <View style={styles.transaction}>
        <Ionicons name="arrow-down" size={24} color="green" />
        <View style={{flex:1, marginLeft:12}}>
          <Text>Bid Refund - Swift Dzire</Text>
          <Text style={{color:'#666'}}>Today, 10:30 AM</Text>
        </View>
        <Text style={{color:'green', fontWeight:'bold'}}>+₹5,000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  balanceCard: { 
    backgroundColor: '#E30613', 
    padding: 30, 
    borderRadius: 20, 
    alignItems: 'center',
    marginBottom: 30 
  },
  balanceLabel: { color: '#fff', fontSize: 16 },
  balance: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginVertical: 8 },
  withdrawable: { color: '#ffdddd', fontSize: 15 },
  section: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  transaction: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 12 
  },
});

export default WalletScreen;