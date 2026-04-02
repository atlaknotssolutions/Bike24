// WalletContext.js
// Global wallet/balance state — wrap your App with <WalletProvider>

import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(48750); // Initial balance
  const [transactions, setTransactions] = useState([]);
  const [bids, setBids] = useState([]);

  // Add money to wallet
  const addMoney = (amount) => {
    const numAmount = parseFloat(amount);
    if (numAmount <= 0) return false;

    setBalance((prev) => prev + numAmount);
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "credit",
        amount: numAmount,
        timestamp: new Date(),
      },
      ...prev,
    ]);
    return true;
  };

  // Place a bid (deducts balance temporarily)
  const placeBid = (bikeId, bikeTitle, bidAmount) => {
    const numBid = parseFloat(bidAmount);

    if (numBid <= 0) {
      return { success: false, message: "Please enter a valid bid amount" };
    }

    if (numBid > balance) {
      return {
        success: false,
        message: `Insufficient balance! You need ₹${numBid - balance} more`,
      };
    }

    // Block the amount
    const newBid = {
      id: Date.now().toString(),
      bikeId,
      bikeTitle,
      bidAmount: numBid,
      status: "active",
      timestamp: new Date(),
    };

    setBids((prev) => [...prev, newBid]);

    // Deduct from available balance
    setBalance((prev) => prev - numBid);

    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        type: "bid",
        amount: numBid,
        bikeTitle,
        timestamp: new Date(),
      },
      ...prev,
    ]);

    return { success: true, message: `Bid placed for ₹${numBid}` };
  };

  // Cancel a bid (refund money)
  const cancelBid = (bidId) => {
    const bid = bids.find((b) => b.id === bidId);
    if (!bid) return false;

    setBids((prev) =>
      prev.map((b) => (b.id === bidId ? { ...b, status: "cancelled" } : b)),
    );

    // Refund the amount
    setBalance((prev) => prev + bid.bidAmount);
    return true;
  };

  // Get available balance (balance - active bids)
  const getAvailableBalance = () => {
    const blockedAmount = bids
      .filter((b) => b.status === "active")
      .reduce((sum, b) => sum + b.bidAmount, 0);
    return balance - blockedAmount;
  };

  // Get active bids
  const getActiveBids = () => {
    return bids.filter((b) => b.status === "active");
  };

  // Check if balance is low
  const isLowBalance = () => {
    return balance < 10000; // Low if less than 10k
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        setBalance,
        addMoney,
        placeBid,
        cancelBid,
        getAvailableBalance,
        getActiveBids,
        isLowBalance,
        transactions,
        bids,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}
