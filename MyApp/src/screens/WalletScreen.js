import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "./Cartcontext/WalletContext";

const WalletScreen = () => {
  const {
    balance,
    addMoney,
    getAvailableBalance,
    getActiveBids,
    isLowBalance,
    transactions,
    cancelBid,
  } = useWallet();
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);

  const availableBalance = getAvailableBalance();
  const activeBids = getActiveBids();
  const blockedAmount = balance - availableBalance;
  const showWarning = isLowBalance();

  const handleAddMoney = () => {
    if (!addAmount || isNaN(addAmount) || parseFloat(addAmount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount");
      return;
    }

    setLoadingAdd(true);
    setTimeout(() => {
      const success = addMoney(parseFloat(addAmount));
      setLoadingAdd(false);

      if (success) {
        Alert.alert("Success", `₹${addAmount} added to your wallet!`);
        setAddAmount("");
        setShowAddMoneyModal(false);
      }
    }, 500);
  };

  const handleCancelBid = (bidId, bidAmount) => {
    Alert.alert(
      "Cancel Bid?",
      `Refund ₹${bidAmount.toLocaleString()} to your wallet?`,
      [
        { text: "No", onPress: () => {}, style: "cancel" },
        {
          text: "Yes, Cancel",
          onPress: () => {
            if (cancelBid(bidId)) {
              Alert.alert(
                "Success",
                `Bid cancelled and ₹${bidAmount} refunded`,
              );
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  const renderTransaction = ({ item }) => (
    <View
      style={[
        styles.transactionItem,
        item.type === "credit" && styles.creditItem,
      ]}
    >
      <View style={styles.transactionIcon}>
        <Ionicons
          name={item.type === "credit" ? "add-circle" : "remove-circle"}
          size={24}
          color={item.type === "credit" ? "#28a745" : "#E30613"}
        />
      </View>
      <View style={styles.transactionDetail}>
        <Text style={styles.transactionTitle}>
          {item.type === "credit" ? "Money Added" : `Bid - ${item.bikeTitle}`}
        </Text>
        <Text style={styles.transactionTime}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          item.type === "credit" && styles.creditAmount,
        ]}
      >
        {item.type === "credit" ? "+" : "-"}₹{item.amount.toLocaleString()}
      </Text>
    </View>
  );

  const renderActiveBid = ({ item }) => (
    <View style={styles.bidCard}>
      <View style={styles.bidHeader}>
        <Text style={styles.bidTitle}>{item.bikeTitle}</Text>
        <Text style={styles.bidAmount}>₹{item.bidAmount.toLocaleString()}</Text>
      </View>
      <Text style={styles.bidStatus}>Status: Active</Text>
      <TouchableOpacity
        style={styles.cancelBidButton}
        onPress={() => handleCancelBid(item.id, item.bidAmount)}
      >
        <Text style={styles.cancelBidText}>Cancel Bid</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header with Balance */}
      <View
        style={[
          styles.balanceContainer,
          showWarning && styles.lowBalanceContainer,
        ]}
      >
        {showWarning && (
          <View style={styles.warningBanner}>
            <Ionicons name="warning" size={20} color="#fff" />
            <Text style={styles.warningText}>
              Low Balance! Add funds to place bids
            </Text>
          </View>
        )}

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₹{balance.toLocaleString()}</Text>

          <View style={styles.balanceBreakdown}>
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Available</Text>
              <Text style={styles.breakdownValue}>
                ₹{availableBalance.toLocaleString()}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Blocked in Bids</Text>
              <Text style={[styles.breakdownValue, styles.blockedValue]}>
                ₹{blockedAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addMoneyButton}
          onPress={() => setShowAddMoneyModal(true)}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addMoneyText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* Active Bids Section */}
      {activeBids.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Active Bids ({activeBids.length})
          </Text>
          <FlatList
            data={activeBids}
            renderItem={renderActiveBid}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Transactions History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </View>

      {/* Add Money Modal */}
      <Modal visible={showAddMoneyModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowAddMoneyModal(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add Money</Text>
              <View style={{ width: 28 }} />
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>Enter Amount (₹)</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={addAmount}
                onChangeText={setAddAmount}
                editable={!loadingAdd}
              />

              {/* Quick Add Buttons */}
              <Text style={styles.quickAddLabel}>Quick Add</Text>
              <View style={styles.quickAddButtons}>
                {[5000, 10000, 25000, 50000].map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={styles.quickAddButton}
                    onPress={() => setAddAmount(amt.toString())}
                  >
                    <Text style={styles.quickAddButtonText}>
                      ₹{(amt / 1000).toFixed(0)}K
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  loadingAdd && styles.buttonDisabled,
                ]}
                onPress={handleAddMoney}
                disabled={loadingAdd}
              >
                <Text style={styles.confirmButtonText}>
                  {loadingAdd ? "Processing..." : "Add Money"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  balanceContainer: { backgroundColor: "#E30613", padding: 20, paddingTop: 30 },
  lowBalanceContainer: { backgroundColor: "#d41f1f" },
  warningBanner: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  warningText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 14,
  },
  balanceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  balanceLabel: { fontSize: 14, color: "#666", marginBottom: 5 },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E30613",
    marginBottom: 15,
  },
  balanceBreakdown: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  breakdownItem: { flex: 1, alignItems: "center" },
  breakdownLabel: { fontSize: 12, color: "#888", marginBottom: 4 },
  breakdownValue: { fontSize: 16, fontWeight: "bold", color: "#333" },
  blockedValue: { color: "#E30613" },
  divider: { width: 1, height: 40, backgroundColor: "#eee" },
  addMoneyButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  addMoneyText: {
    color: "#E30613",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },

  // Sections
  section: { padding: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },

  // Bids
  bidCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#E30613",
  },
  bidHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bidTitle: { fontSize: 15, fontWeight: "600", flex: 1 },
  bidAmount: { fontSize: 15, fontWeight: "bold", color: "#E30613" },
  bidStatus: {
    fontSize: 12,
    color: "#28a745",
    marginBottom: 10,
    fontWeight: "600",
  },
  cancelBidButton: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E30613",
  },
  cancelBidText: { color: "#E30613", fontWeight: "600", fontSize: 14 },

  // Transactions
  transactionItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  creditItem: { backgroundColor: "#f0f8f0" },
  transactionIcon: { marginRight: 12 },
  transactionDetail: { flex: 1 },
  transactionTitle: { fontSize: 14, fontWeight: "600", color: "#333" },
  transactionTime: { fontSize: 12, color: "#888", marginTop: 2 },
  transactionAmount: { fontSize: 15, fontWeight: "bold", color: "#E30613" },
  creditAmount: { color: "#28a745" },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  emptyText: { marginTop: 12, color: "#999", fontSize: 14 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  modalBody: { padding: 20 },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  amountInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 20,
  },
  quickAddLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  quickAddButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickAddButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E30613",
    borderRadius: 8,
    alignItems: "center",
  },
  quickAddButtonText: { color: "#E30613", fontWeight: "600", fontSize: 13 },
  confirmButton: {
    backgroundColor: "#E30613",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  buttonDisabled: { opacity: 0.6 },
});

export default WalletScreen;
