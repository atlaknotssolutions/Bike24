import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { bikes } from "../data/dummyData";

const { width } = Dimensions.get("window");

const ExploreScreen = () => {
  const navigation = useNavigation();

  const renderBike = ({ item }) => (
    <TouchableOpacity
      style={styles.bikeCard}
      onPress={() => navigation.navigate("CarDetail", { car: item })}
    >
      <Image source={{ uri: item.image }} style={styles.bikeImage} />
      <View style={styles.details}>
        <Text style={styles.bikeTitle}>{item.title}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>

        <View style={styles.bidRow}>
          <View>
            <Text style={styles.label}>Current Bid</Text>
            <Text style={styles.currentBid}>{item.currentBid}</Text>
          </View>
          {item.yourBid ? (
            <View>
              <Text style={styles.label}>Your Bid</Text>
              <Text style={styles.yourBid}>{item.yourBid}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeLeft}>⏰ {item.timeLeft} left</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Live Auctions • Bikes</Text>
      <FlatList
        data={bikes}
        renderItem={renderBike}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  list: { padding: 15 },
  bikeCard: {
    backgroundColor: "#fff",
    marginBottom: 18,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 4,
  },
  bikeImage: { width: "100%", height: 200 },
  details: { padding: 16 },
  bikeTitle: { fontSize: 17, fontWeight: "600", marginBottom: 4 },
  location: { color: "#666", fontSize: 14, marginBottom: 12 },
  bidRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { fontSize: 12, color: "#888" },
  currentBid: { fontSize: 18, fontWeight: "bold", color: "#E30613" },
  yourBid: { fontSize: 16, fontWeight: "600", color: "#28a745" },
  timeContainer: { borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 12 },
  timeLeft: { color: "#E30613", fontWeight: "bold", fontSize: 15 },
});

export default ExploreScreen;
