// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Alert, Modal, TextInput } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const HomeScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState('Live');
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [showSortModal, setShowSortModal] = useState(false);

//   // Filter States
//   const [selectedType, setSelectedType] = useState('Both');
//   const [minPrice, setMinPrice] = useState('0');
//   const [maxPrice, setMaxPrice] = useState('2000000');
//   const [selectedFuel, setSelectedFuel] = useState('All');
//   const [selectedOwner, setSelectedOwner] = useState('All');

//   // Sort State
//   const [sortBy, setSortBy] = useState('Ending Soon');

//   // Base Data
//   const baseLiveAuctions = [
//     { id: '1', type: 'car', title: '2018 Maruti Ertiga VDI SHVS', price: 457000, timeLeft: 1380, image: 'https://picsum.photos/id/1015/600/350', location: 'Indore', rto: 'MP09CZXXXX', fuel: 'Diesel', owner: '1st' },
//     { id: '2', type: 'bike', title: '2022 Royal Enfield Classic 350', price: 185000, timeLeft: 4320, image: 'https://picsum.photos/id/1074/600/350', location: 'Indore', rto: 'MP09AB1234', fuel: 'Petrol', owner: '1st' },
//     { id: '3', type: 'car', title: '2020 Hyundai Creta SX 1.5 Diesel', price: 925000, timeLeft: 7500, image: 'https://picsum.photos/id/106/600/350', location: 'Indore', rto: 'MP09DE5678', fuel: 'Diesel', owner: '2nd' },
//     { id: '4', type: 'bike', title: '2023 Bajaj Pulsar NS200', price: 145000, timeLeft: 3300, image: 'https://picsum.photos/id/201/600/350', location: 'Indore', rto: 'MP09FG9012', fuel: 'Petrol', owner: '1st' },
//   ];

//   const baseOCBAuctions = [
//     { id: '5', type: 'car', title: '2019 Maruti Swift Dzire VXI', price: 520000, timeLeft: 8640, image: 'https://picsum.photos/id/133/600/350', location: 'Indore', rto: 'MP09KL7890', fuel: 'Petrol', owner: '1st' },
//     { id: '6', type: 'bike', title: '2021 TVS Apache RTR 160', price: 95000, timeLeft: 2160, image: 'https://picsum.photos/id/180/600/350', location: 'Indore', rto: 'MP09MN1122', fuel: 'Petrol', owner: '2nd' },
//     { id: '7', type: 'car', title: '2022 Tata Nexon XZ+', price: 780000, timeLeft: 10800, image: 'https://picsum.photos/id/201/600/350', location: 'Indore', rto: 'MP09OP3344', fuel: 'Petrol', owner: '1st' },
//   ];

//   const baseTouchBuy = [
//     { id: '8', type: 'car', title: '2017 Honda City i-VTEC', price: 625000, timeLeft: 0, image: 'https://picsum.photos/id/1060/600/350', location: 'Indore', rto: 'MP09QR5566', fuel: 'Petrol', owner: '2nd', isTouchBuy: true },
//     { id: '9', type: 'bike', title: '2020 Hero Splendor Plus', price: 65000, timeLeft: 0, image: 'https://picsum.photos/id/1077/600/350', location: 'Indore', rto: 'MP09ST7788', fuel: 'Petrol', owner: '1st', isTouchBuy: true },
//     { id: '10', type: 'car', title: '2021 Kia Seltos GTX', price: 1050000, timeLeft: 0, image: 'https://picsum.photos/id/133/600/350', location: 'Indore', rto: 'MP09UV9900', fuel: 'Diesel', owner: '1st', isTouchBuy: true },
//   ];

//   const getBaseAuctions = () => {
//     if (activeTab === 'Live') return baseLiveAuctions;
//     if (activeTab === 'OCB') return baseOCBAuctions;
//     return baseTouchBuy;
//   };

//   const [auctions, setAuctions] = useState(getBaseAuctions());

//   // Apply Filter & Sort
//   const applyFiltersAndSort = () => {
//     let filtered = [...getBaseAuctions()];

//     // Filter by Type
//     if (selectedType !== 'Both') {
//       filtered = filtered.filter(item => item.type === selectedType.toLowerCase());
//     }

//     // Filter by Price
//     const minP = parseInt(minPrice) || 0;
//     const maxP = parseInt(maxPrice) || Infinity;
//     filtered = filtered.filter(item => item.price >= minP && item.price <= maxP);

//     // Filter by Fuel
//     if (selectedFuel !== 'All') {
//       filtered = filtered.filter(item => item.fuel === selectedFuel);
//     }

//     // Filter by Owner
//     if (selectedOwner !== 'All') {
//       filtered = filtered.filter(item => item.owner === selectedOwner);
//     }

//     // Sort
//     if (sortBy === 'Price Low to High') {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortBy === 'Price High to Low') {
//       filtered.sort((a, b) => b.price - a.price);
//     } else if (sortBy === 'Ending Soon') {
//       filtered.sort((a, b) => a.timeLeft - b.timeLeft);
//     } else if (sortBy === 'Newest First') {
//       filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
//     }

//     setAuctions(filtered);
//     setShowFilterModal(false);
//     setShowSortModal(false);
//   };

//   const resetFilters = () => {
//     setSelectedType('Both');
//     setMinPrice('0');
//     setMaxPrice('2000000');
//     setSelectedFuel('All');
//     setSelectedOwner('All');
//     setSortBy('Ending Soon');
//     setAuctions(getBaseAuctions());
//     setShowFilterModal(false);
//   };

//   // Real-time Timer (only for Live and OCB)
//   useEffect(() => {
//     if (activeTab === 'Touch & Buy') return;
//     const interval = setInterval(() => {
//       setAuctions(prev =>
//         prev.map(item => ({
//           ...item,
//           timeLeft: Math.max(0, item.timeLeft - 1),
//         }))
//       );
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [activeTab]);

//   // Update auctions when tab changes
//   useEffect(() => {
//     setAuctions(getBaseAuctions());
//   }, [activeTab]);

//   const formatTime = (seconds) => {
//     if (seconds === 0) return 'Buy Now';
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = seconds % 60;
//     return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
//   };

//   const renderAuction = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.auctionCard}
//       onPress={() => navigation.navigate('CarDetail', { car: item })}
//     >
//       <Image source={{ uri: item.image }} style={styles.auctionImage} />
      
//       <View style={styles.rtoContainer}>
//         <Text style={styles.rtoText}>{item.rto}</Text>
//         <Text style={styles.locationText}>📍 {item.location}</Text>
//       </View>

//       {item.type === 'bike' && (
//         <View style={styles.bikeTag}>
//           <Text style={styles.bikeTagText}>BIKE</Text>
//         </View>
//       )}

//       {item.isTouchBuy && (
//         <View style={styles.touchBuyTag}>
//           <Text style={styles.touchBuyText}>TOUCH & BUY</Text>
//         </View>
//       )}

//       <View style={styles.auctionInfo}>
//         <Text style={styles.auctionTitle}>{item.title}</Text>
//         <Text style={styles.auctionPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
        
//         <View style={styles.timeContainer}>
//           <Ionicons 
//             name={item.timeLeft === 0 ? "flash" : "time-outline"} 
//             size={16} 
//             color={item.timeLeft === 0 ? "#28a745" : "#E30613"} 
//           />
//           <Text style={[styles.timeLeft, item.timeLeft === 0 && { color: '#28a745' }]}>
//             {' '}{formatTime(item.timeLeft)}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <Ionicons name="location" size={22} color="#fff" />
//           <View style={{ marginLeft: 8 }}>
//             <Text style={styles.rtoTitle}>RTO</Text>
//             <Text style={styles.rtoSubtitle}>MP</Text>
//           </View>
//         </View>
//         <View style={styles.headerRight}>
//           <View style={styles.walletButton}>
//             <Text style={styles.walletText}>₹0</Text>
//           </View>
//           <TouchableOpacity style={styles.bellButton}>
//             <Ionicons name="notifications-outline" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
//           <Text style={styles.searchPlaceholder}>Search for car, make, model</Text>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'Live' && styles.activeTab]} 
//           onPress={() => setActiveTab('Live')}
//         >
//           <Text style={activeTab === 'Live' ? styles.activeTabText : styles.tabText}>Live (16)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'OCB' && styles.activeTab]} 
//           onPress={() => setActiveTab('OCB')}
//         >
//           <Text style={activeTab === 'OCB' ? styles.activeTabText : styles.tabText}>OCB (79)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'Touch & Buy' && styles.activeTab]} 
//           onPress={() => setActiveTab('Touch & Buy')}
//         >
//           <Text style={activeTab === 'Touch & Buy' ? styles.activeTabText : styles.tabText}>Touch & Buy (22)</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Filter & Sort Buttons */}
//       <View style={styles.filterSortContainer}>
//         <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
//           <Ionicons name="filter" size={18} color="#E30613" />
//           <Text style={styles.filterText}> Filter</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.filterButton} onPress={() => setShowSortModal(true)}>
//           <Ionicons name="swap-vertical" size={18} color="#E30613" />
//           <Text style={styles.filterText}> Sort: {sortBy}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Section Title */}
//       <Text style={styles.sectionTitle}>
//         {activeTab === 'Live' ? 'Live Auctions' : activeTab === 'OCB' ? 'OCB Auctions' : 'Touch & Buy'}
//       </Text>

//       {/* Auctions Horizontal List */}
//       <FlatList
//         data={auctions}
//         renderItem={renderAuction}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.horizontalList}
//       />

//       {/* Low Balance Warning */}
//       <View style={styles.warningContainer}>
//         <View style={styles.warningContent}>
//           <Ionicons name="wallet" size={28} color="#fff" />
//           <View style={{ marginLeft: 12, flex: 1 }}>
//             <Text style={styles.warningTitle}>Low Account Balance</Text>
//             <Text style={styles.warningText}>
//               Account balance is below Min. Balance Rs. 10000
//             </Text>
//           </View>
//         </View>
//         <TouchableOpacity 
//           style={styles.addNowButton}
//           onPress={() => Alert.alert('Wallet', 'Redirecting to Add Money...')}
//         >
//           <Text style={styles.addNowText}>Add now</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Quick Actions */}
//       <Text style={styles.sectionTitle}>Quick Actions</Text>
//       <View style={styles.quickActions}>
//         <TouchableOpacity style={styles.actionButton}>
//           <Ionicons name="add-circle" size={28} color="#E30613" />
//           <Text style={styles.actionText}>Post Requirement</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton}>
//           <Ionicons name="stats-chart" size={28} color="#E30613" />
//           <Text style={styles.actionText}>My Performance</Text>
//         </TouchableOpacity>
//       </View>

//       {/* ==================== FILTER MODAL ==================== */}
//       <Modal visible={showFilterModal} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Filters</Text>

//             <Text style={styles.modalLabel}>Vehicle Type</Text>
//             <View style={styles.optionRow}>
//               {['Both', 'Car', 'Bike'].map(t => (
//                 <TouchableOpacity 
//                   key={t} 
//                   style={[styles.optionBtn, selectedType === t && styles.selectedOption]} 
//                   onPress={() => setSelectedType(t)}
//                 >
//                   <Text style={selectedType === t ? styles.selectedOptionText : {}}>{t}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <Text style={styles.modalLabel}>Price Range (₹)</Text>
//             <View style={styles.priceRow}>
//               <TextInput 
//                 style={styles.priceInput} 
//                 keyboardType="numeric" 
//                 value={minPrice} 
//                 onChangeText={setMinPrice} 
//                 placeholder="Min Price" 
//               />
//               <TextInput 
//                 style={styles.priceInput} 
//                 keyboardType="numeric" 
//                 value={maxPrice} 
//                 onChangeText={setMaxPrice} 
//                 placeholder="Max Price" 
//               />
//             </View>

//             <Text style={styles.modalLabel}>Fuel Type</Text>
//             <View style={styles.optionRow}>
//               {['All', 'Petrol', 'Diesel', 'CNG'].map(f => (
//                 <TouchableOpacity 
//                   key={f} 
//                   style={[styles.optionBtn, selectedFuel === f && styles.selectedOption]} 
//                   onPress={() => setSelectedFuel(f)}
//                 >
//                   <Text style={selectedFuel === f ? styles.selectedOptionText : {}}>{f}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <Text style={styles.modalLabel}>Owner</Text>
//             <View style={styles.optionRow}>
//               {['All', '1st', '2nd'].map(o => (
//                 <TouchableOpacity 
//                   key={o} 
//                   style={[styles.optionBtn, selectedOwner === o && styles.selectedOption]} 
//                   onPress={() => setSelectedOwner(o)}
//                 >
//                   <Text style={selectedOwner === o ? styles.selectedOptionText : {}}>{o} Owner</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
//                 <Text style={styles.resetText}>Reset</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.applyBtn} onPress={applyFiltersAndSort}>
//                 <Text style={styles.applyText}>Apply Filters</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* ==================== SORT MODAL ==================== */}
//       <Modal visible={showSortModal} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Sort By</Text>
//             {['Ending Soon', 'Price Low to High', 'Price High to Low', 'Newest First'].map(s => (
//               <TouchableOpacity 
//                 key={s} 
//                 style={[styles.sortOption, sortBy === s && styles.selectedSort]} 
//                 onPress={() => setSortBy(s)}
//               >
//                 <Text style={sortBy === s ? styles.selectedOptionText : {}}>{s}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity style={styles.applyBtn} onPress={applyFiltersAndSort}>
//               <Text style={styles.applyText}>Apply Sort</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },

//   header: { 
//     backgroundColor: '#4A00E0', 
//     paddingHorizontal: 20, 
//     paddingVertical: 15, 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center',
//   },
//   headerLeft: { flexDirection: 'row', alignItems: 'center' },
//   rtoTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   rtoSubtitle: { color: '#fff', fontSize: 12, opacity: 0.9 },
//   headerRight: { flexDirection: 'row', alignItems: 'center' },
//   walletButton: { 
//     backgroundColor: 'rgba(255,255,255,0.2)', 
//     paddingHorizontal: 14, 
//     paddingVertical: 6, 
//     borderRadius: 20, 
//     marginRight: 12 
//   },
//   walletText: { color: '#fff', fontWeight: 'bold' },
//   bellButton: { padding: 5 },

//   searchContainer: { 
//     paddingHorizontal: 20, 
//     paddingTop: 10, 
//     paddingBottom: 15, 
//     backgroundColor: '#4A00E0' 
//   },
//   searchBar: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     backgroundColor: '#fff', 
//     borderRadius: 30, 
//     paddingHorizontal: 18, 
//     paddingVertical: 12 
//   },
//   searchPlaceholder: { color: '#666', fontSize: 16 },

//   tabContainer: { 
//     flexDirection: 'row', 
//     backgroundColor: '#fff', 
//     paddingVertical: 10, 
//     paddingHorizontal: 15 
//   },
//   tab: { 
//     paddingHorizontal: 18, 
//     paddingVertical: 8, 
//     marginRight: 8, 
//     borderRadius: 20 
//   },
//   activeTab: { backgroundColor: '#4A00E0' },
//   activeTabText: { color: '#fff', fontWeight: 'bold' },
//   tabText: { color: '#333' },

//   filterSortContainer: { 
//     flexDirection: 'row', 
//     paddingHorizontal: 15, 
//     paddingVertical: 10, 
//     backgroundColor: '#fff' 
//   },
//   filterButton: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     backgroundColor: '#f0f0f0', 
//     paddingHorizontal: 16, 
//     paddingVertical: 8, 
//     borderRadius: 20, 
//     marginRight: 10 
//   },
//   filterText: { color: '#333', marginLeft: 4 },

//   sectionTitle: { 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     paddingHorizontal: 20, 
//     marginTop: 15, 
//     marginBottom: 10 
//   },

//   horizontalList: { paddingLeft: 20, paddingBottom: 20 },
//   auctionCard: { 
//     width: 280, 
//     backgroundColor: '#fff', 
//     borderRadius: 12, 
//     marginRight: 15, 
//     overflow: 'hidden',
//     elevation: 4,
//   },
//   auctionImage: { width: '100%', height: 180 },
//   rtoContainer: { 
//     position: 'absolute', 
//     top: 12, 
//     left: 12, 
//     backgroundColor: 'rgba(0,0,0,0.6)', 
//     paddingHorizontal: 10, 
//     paddingVertical: 4, 
//     borderRadius: 6 
//   },
//   rtoText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
//   locationText: { color: '#fff', fontSize: 11 },
//   bikeTag: { 
//     position: 'absolute', 
//     top: 12, 
//     right: 12, 
//     backgroundColor: '#E30613', 
//     paddingHorizontal: 10, 
//     paddingVertical: 4, 
//     borderRadius: 6 
//   },
//   bikeTagText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
//   touchBuyTag: { 
//     position: 'absolute', 
//     top: 12, 
//     right: 12, 
//     backgroundColor: '#28a745', 
//     paddingHorizontal: 10, 
//     paddingVertical: 4, 
//     borderRadius: 6 
//   },
//   touchBuyText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
//   auctionInfo: { padding: 14 },
//   auctionTitle: { fontSize: 15.5, fontWeight: '600', marginBottom: 6 },
//   auctionPrice: { fontSize: 18, fontWeight: 'bold', color: '#E30613' },
//   timeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
//   timeLeft: { fontSize: 14, color: '#E30613', fontWeight: '500' },

//   warningContainer: { 
//     marginHorizontal: 20, 
//     marginVertical: 15, 
//     backgroundColor: '#FF3B30', 
//     borderRadius: 12, 
//     padding: 15, 
//     flexDirection: 'row', 
//     alignItems: 'center',
//     elevation: 3,
//   },
//   warningContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   warningTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
//   warningText: { color: '#fff', fontSize: 13, marginTop: 2 },
//   addNowButton: { 
//     backgroundColor: '#fff', 
//     paddingHorizontal: 20, 
//     paddingVertical: 10, 
//     borderRadius: 25 
//   },
//   addNowText: { color: '#FF3B30', fontWeight: 'bold' },

//   quickActions: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-around', 
//     paddingHorizontal: 20, 
//     marginBottom: 40 
//   },
//   actionButton: { 
//     alignItems: 'center', 
//     backgroundColor: '#fff', 
//     padding: 20, 
//     borderRadius: 16, 
//     width: '45%', 
//     elevation: 3 
//   },
//   actionText: { 
//     marginTop: 10, 
//     fontWeight: '600', 
//     textAlign: 'center',
//     fontSize: 14
//   },

//   // Modal Styles
//   modalContainer: { 
//     flex: 1, 
//     backgroundColor: 'rgba(0,0,0,0.6)', 
//     justifyContent: 'flex-end' 
//   },
//   modalContent: { 
//     backgroundColor: '#fff', 
//     borderTopLeftRadius: 20, 
//     borderTopRightRadius: 20, 
//     padding: 20, 
//     maxHeight: '85%' 
//   },
//   modalTitle: { 
//     fontSize: 22, 
//     fontWeight: 'bold', 
//     marginBottom: 20, 
//     textAlign: 'center' 
//   },
//   modalLabel: { 
//     fontSize: 16, 
//     fontWeight: '600', 
//     marginTop: 15, 
//     marginBottom: 8 
//   },
//   optionRow: { 
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     gap: 8 
//   },
//   optionBtn: { 
//     paddingHorizontal: 16, 
//     paddingVertical: 10, 
//     backgroundColor: '#f0f0f0', 
//     borderRadius: 20, 
//     marginBottom: 8 
//   },
//   selectedOption: { 
//     backgroundColor: '#E30613' 
//   },
//   selectedOptionText: { 
//     color: '#fff' 
//   },
//   priceRow: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between' 
//   },
//   priceInput: { 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     borderRadius: 8, 
//     padding: 12, 
//     width: '48%', 
//     fontSize: 16 
//   },
//   modalButtons: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     marginTop: 30 
//   },
//   resetBtn: { 
//     padding: 15, 
//     borderWidth: 1, 
//     borderColor: '#E30613', 
//     borderRadius: 12, 
//     width: '48%', 
//     alignItems: 'center' 
//   },
//   resetText: { 
//     color: '#E30613', 
//     fontWeight: 'bold' 
//   },
//   applyBtn: { 
//     backgroundColor: '#E30613', 
//     padding: 15, 
//     borderRadius: 12, 
//     width: '48%', 
//     alignItems: 'center' 
//   },
//   applyText: { 
//     color: '#fff', 
//     fontWeight: 'bold' 
//   },
//   sortOption: { 
//     padding: 15, 
//     borderBottomWidth: 1, 
//     borderBottomColor: '#eee' 
//   },
//   selectedSort: { 
//     backgroundColor: '#ffe6e6' 
//   },
// });

// export default HomeScreen;


import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  Alert, 
  Modal, 
  TextInput 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Live');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  // Filter States
  const [selectedType, setSelectedType] = useState('Both');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('2000000');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedOwner, setSelectedOwner] = useState('All');

  // Sort State
  const [sortBy, setSortBy] = useState('Ending Soon');

  // Base Data with Better Bike Images
  const baseLiveAuctions = [
    { 
      id: '1', 
      type: 'car', 
      title: '2018 Maruti Ertiga VDI SHVS', 
      price: 457000, 
      timeLeft: 1380, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', 
      location: 'Indore', 
      rto: 'MP09CZXXXX', 
      fuel: 'Diesel', 
      owner: '1st' 
    },
    { 
      id: '2', 
      type: 'bike', 
      title: '2022 Royal Enfield Classic 350', 
      price: 185000, 
      timeLeft: 4320, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', // Better RE image
      location: 'Indore', 
      rto: 'MP09AB1234', 
      fuel: 'Petrol', 
      owner: '1st' 
    },
    { 
      id: '3', 
      type: 'car', 
      title: '2020 Hyundai Creta SX 1.5 Diesel', 
      price: 925000, 
      timeLeft: 7500, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', 
      location: 'Indore', 
      rto: 'MP09DE5678', 
      fuel: 'Diesel', 
      owner: '2nd' 
    },
    { 
      id: '4', 
      type: 'bike', 
      title: '2023 Bajaj Pulsar NS200', 
      price: 145000, 
      timeLeft: 3300, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', // Pulsar image
      location: 'Indore', 
      rto: 'MP09FG9012', 
      fuel: 'Petrol', 
      owner: '1st' 
    },
  ];

  const baseOCBAuctions = [
    { 
      id: '5', 
      type: 'car', 
      title: '2019 Maruti Swift Dzire VXI', 
      price: 520000, 
      timeLeft: 8640, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', 
      location: 'Indore', 
      rto: 'MP09KL7890', 
      fuel: 'Petrol', 
      owner: '1st' 
    },
    { 
      id: '6', 
      type: 'bike', 
      title: '2021 TVS Apache RTR 160', 
      price: 95000, 
      timeLeft: 2160, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', 
      location: 'Indore', 
      rto: 'MP09MN1122', 
      fuel: 'Petrol', 
      owner: '2nd' 
    },
    { 
      id: '7', 
      type: 'car', 
      title: '2022 Tata Nexon XZ+', 
      price: 780000, 
      timeLeft: 10800, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', 
      location: 'Indore', 
      rto: 'MP09OP3344', 
      fuel: 'Petrol', 
      owner: '1st' 
    },
  ];

  const baseTouchBuy = [
    { 
      id: '8', 
      type: 'car', 
      title: '2017 Honda City i-VTEC', 
      price: 625000, 
      timeLeft: 0, 
      image: 'https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690_1280.jpg', 
      location: 'Indore', 
      rto: 'MP09QR5566', 
      fuel: 'Petrol', 
      owner: '2nd', 
      isTouchBuy: true 
    },
    { 
      id: '9', 
      type: 'bike', 
      title: '2020 Hero Splendor Plus', 
      price: 65000, 
      timeLeft: 0, 
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      location: 'Indore', 
      rto: 'MP09ST7788', 
      fuel: 'Petrol', 
      owner: '1st', 
      isTouchBuy: true 
    },
    { 
      id: '10', 
      type: 'bike', 
      title: '2021 Honda CB Hornet 160R', 
      price: 112000, 
      timeLeft: 0, 
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90b3JiaWtlfGVufDB8fDB8fHww', // Hornet bike image
      location: 'Indore', 
      rto: 'MP09HI3456', 
      fuel: 'Petrol', 
      owner: '1st', 
      isTouchBuy: true 
    },
  ];

  const getBaseAuctions = () => {
    if (activeTab === 'Live') return baseLiveAuctions;
    if (activeTab === 'OCB') return baseOCBAuctions;
    return baseTouchBuy;
  };

  const [auctions, setAuctions] = useState(getBaseAuctions());

  // Apply Filter & Sort
  const applyFiltersAndSort = () => {
    let filtered = [...getBaseAuctions()];

    if (selectedType !== 'Both') {
      filtered = filtered.filter(item => item.type === selectedType.toLowerCase());
    }

    const minP = parseInt(minPrice) || 0;
    const maxP = parseInt(maxPrice) || Infinity;
    filtered = filtered.filter(item => item.price >= minP && item.price <= maxP);

    if (selectedFuel !== 'All') {
      filtered = filtered.filter(item => item.fuel === selectedFuel);
    }

    if (selectedOwner !== 'All') {
      filtered = filtered.filter(item => item.owner === selectedOwner);
    }

    if (sortBy === 'Price Low to High') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price High to Low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Ending Soon') {
      filtered.sort((a, b) => a.timeLeft - b.timeLeft);
    } else if (sortBy === 'Newest First') {
      filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    setAuctions(filtered);
    setShowFilterModal(false);
    setShowSortModal(false);
  };

  const resetFilters = () => {
    setSelectedType('Both');
    setMinPrice('0');
    setMaxPrice('2000000');
    setSelectedFuel('All');
    setSelectedOwner('All');
    setSortBy('Ending Soon');
    setAuctions(getBaseAuctions());
    setShowFilterModal(false);
  };

  // Real-time Timer
  useEffect(() => {
    if (activeTab === 'Touch & Buy') return;
    const interval = setInterval(() => {
      setAuctions(prev =>
        prev.map(item => ({
          ...item,
          timeLeft: Math.max(0, item.timeLeft - 1),
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    setAuctions(getBaseAuctions());
  }, [activeTab]);

  const formatTime = (seconds) => {
    if (seconds === 0) return 'Buy Now';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const renderAuction = ({ item }) => (
    <TouchableOpacity 
      style={styles.auctionCard}
      onPress={() => navigation.navigate('CarDetail', { car: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.auctionImage} 
        resizeMode="cover"
      />
      
      <View style={styles.rtoContainer}>
        <Text style={styles.rtoText}>{item.rto}</Text>
        <Text style={styles.locationText}>📍 {item.location}</Text>
      </View>

      {item.type === 'bike' && (
        <View style={styles.bikeTag}>
          <Text style={styles.bikeTagText}>BIKE</Text>
        </View>
      )}

      {item.isTouchBuy && (
        <View style={styles.touchBuyTag}>
          <Text style={styles.touchBuyText}>TOUCH & BUY</Text>
        </View>
      )}

      <View style={styles.auctionInfo}>
        <Text style={styles.auctionTitle}>{item.title}</Text>
        <Text style={styles.auctionPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
        
        <View style={styles.timeContainer}>
          <Ionicons 
            name={item.timeLeft === 0 ? "flash" : "time-outline"} 
            size={16} 
            color={item.timeLeft === 0 ? "#28a745" : "#E30613"} 
          />
          <Text style={[styles.timeLeft, item.timeLeft === 0 && { color: '#28a745' }]}>
            {' '}{formatTime(item.timeLeft)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="location" size={22} color="#fff" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.rtoTitle}>RTO</Text>
            <Text style={styles.rtoSubtitle}>MP</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.walletButton}>
            <Text style={styles.walletText}>₹0</Text>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
          <Text style={styles.searchPlaceholder}>Search for car, make, model</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Live' && styles.activeTab]} 
          onPress={() => setActiveTab('Live')}
        >
          <Text style={activeTab === 'Live' ? styles.activeTabText : styles.tabText}>Live (16)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'OCB' && styles.activeTab]} 
          onPress={() => setActiveTab('OCB')}
        >
          <Text style={activeTab === 'OCB' ? styles.activeTabText : styles.tabText}>OCB (79)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Touch & Buy' && styles.activeTab]} 
          onPress={() => setActiveTab('Touch & Buy')}
        >
          <Text style={activeTab === 'Touch & Buy' ? styles.activeTabText : styles.tabText}>Touch & Buy (22)</Text>
        </TouchableOpacity>
      </View>

      {/* Filter & Sort */}
      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
          <Ionicons name="filter" size={18} color="#E30613" />
          <Text style={styles.filterText}> Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowSortModal(true)}>
          <Ionicons name="swap-vertical" size={18} color="#E30613" />
          <Text style={styles.filterText}> Sort: {sortBy}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        {activeTab === 'Live' ? 'Live Auctions' : activeTab === 'OCB' ? 'OCB Auctions' : 'Touch & Buy'}
      </Text>

      <FlatList
        data={auctions}
        renderItem={renderAuction}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      {/* Low Balance Warning */}
      <View style={styles.warningContainer}>
        <View style={styles.warningContent}>
          <Ionicons name="wallet" size={28} color="#fff" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.warningTitle}>Low Account Balance</Text>
            <Text style={styles.warningText}>
              Account balance is below Min. Balance Rs. 10000
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.addNowButton}
          onPress={() => Alert.alert('Wallet', 'Redirecting to Add Money...')}
        >
          <Text style={styles.addNowText}>Add now</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle" size={28} color="#E30613" />
          <Text style={styles.actionText}>Post Requirement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="stats-chart" size={28} color="#E30613" />
          <Text style={styles.actionText}>My Performance</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>

            <Text style={styles.modalLabel}>Vehicle Type</Text>
            <View style={styles.optionRow}>
              {['Both', 'Car', 'Bike'].map(t => (
                <TouchableOpacity 
                  key={t} 
                  style={[styles.optionBtn, selectedType === t && styles.selectedOption]} 
                  onPress={() => setSelectedType(t)}
                >
                  <Text style={selectedType === t ? styles.selectedOptionText : {}}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Price Range (₹)</Text>
            <View style={styles.priceRow}>
              <TextInput 
                style={styles.priceInput} 
                keyboardType="numeric" 
                value={minPrice} 
                onChangeText={setMinPrice} 
                placeholder="Min Price" 
              />
              <TextInput 
                style={styles.priceInput} 
                keyboardType="numeric" 
                value={maxPrice} 
                onChangeText={setMaxPrice} 
                placeholder="Max Price" 
              />
            </View>

            <Text style={styles.modalLabel}>Fuel Type</Text>
            <View style={styles.optionRow}>
              {['All', 'Petrol', 'Diesel', 'CNG'].map(f => (
                <TouchableOpacity 
                  key={f} 
                  style={[styles.optionBtn, selectedFuel === f && styles.selectedOption]} 
                  onPress={() => setSelectedFuel(f)}
                >
                  <Text style={selectedFuel === f ? styles.selectedOptionText : {}}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Owner</Text>
            <View style={styles.optionRow}>
              {['All', '1st', '2nd'].map(o => (
                <TouchableOpacity 
                  key={o} 
                  style={[styles.optionBtn, selectedOwner === o && styles.selectedOption]} 
                  onPress={() => setSelectedOwner(o)}
                >
                  <Text style={selectedOwner === o ? styles.selectedOptionText : {}}>{o} Owner</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={applyFiltersAndSort}>
                <Text style={styles.applyText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal visible={showSortModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            {['Ending Soon', 'Price Low to High', 'Price High to Low', 'Newest First'].map(s => (
              <TouchableOpacity 
                key={s} 
                style={[styles.sortOption, sortBy === s && styles.selectedSort]} 
                onPress={() => setSortBy(s)}
              >
                <Text style={sortBy === s ? styles.selectedOptionText : {}}>{s}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.applyBtn} onPress={applyFiltersAndSort}>
              <Text style={styles.applyText}>Apply Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  header: { 
    backgroundColor: '#4A00E0', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  rtoTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  rtoSubtitle: { color: '#fff', fontSize: 12, opacity: 0.9 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  walletButton: { 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 14, 
    paddingVertical: 6, 
    borderRadius: 20, 
    marginRight: 12 
  },
  walletText: { color: '#fff', fontWeight: 'bold' },
  bellButton: { padding: 5 },

  searchContainer: { 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 15, 
    backgroundColor: '#4A00E0' 
  },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 30, 
    paddingHorizontal: 18, 
    paddingVertical: 12 
  },
  searchPlaceholder: { color: '#666', fontSize: 16 },

  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    paddingVertical: 10, 
    paddingHorizontal: 15 
  },
  tab: { 
    paddingHorizontal: 18, 
    paddingVertical: 8, 
    marginRight: 8, 
    borderRadius: 20 
  },
  activeTab: { backgroundColor: '#4A00E0' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  tabText: { color: '#333' },

  filterSortContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    backgroundColor: '#fff' 
  },
  filterButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginRight: 10 
  },
  filterText: { color: '#333', marginLeft: 4 },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    paddingHorizontal: 20, 
    marginTop: 15, 
    marginBottom: 10 
  },

  horizontalList: { paddingLeft: 20, paddingBottom: 20 },
  auctionCard: { 
    width: 280, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginRight: 15, 
    overflow: 'hidden',
    elevation: 4,
  },
  auctionImage: { 
    width: '100%', 
    height: 190,           // Increased height for better bike visibility
  },
  rtoContainer: { 
    position: 'absolute', 
    top: 12, 
    left: 12, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  rtoText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  locationText: { color: '#fff', fontSize: 11 },
  bikeTag: { 
    position: 'absolute', 
    top: 12, 
    right: 12, 
    backgroundColor: '#E30613', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  bikeTagText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  touchBuyTag: { 
    position: 'absolute', 
    top: 12, 
    right: 12, 
    backgroundColor: '#28a745', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  touchBuyText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  auctionInfo: { padding: 14 },
  auctionTitle: { fontSize: 15.5, fontWeight: '600', marginBottom: 6 },
  auctionPrice: { fontSize: 18, fontWeight: 'bold', color: '#E30613' },
  timeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  timeLeft: { fontSize: 14, color: '#E30613', fontWeight: '500' },

  warningContainer: { 
    marginHorizontal: 20, 
    marginVertical: 15, 
    backgroundColor: '#FF3B30', 
    borderRadius: 12, 
    padding: 15, 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 3,
  },
  warningContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  warningTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  warningText: { color: '#fff', fontSize: 13, marginTop: 2 },
  addNowButton: { 
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 25 
  },
  addNowText: { color: '#FF3B30', fontWeight: 'bold' },

  quickActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingHorizontal: 20, 
    marginBottom: 40 
  },
  actionButton: { 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 16, 
    width: '45%', 
    elevation: 3 
  },
  actionText: { 
    marginTop: 10, 
    fontWeight: '600', 
    textAlign: 'center',
    fontSize: 14
  },

  modalContainer: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    padding: 20, 
    maxHeight: '85%' 
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  modalLabel: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginTop: 15, 
    marginBottom: 8 
  },
  optionRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8 
  },
  optionBtn: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 20, 
    marginBottom: 8 
  },
  selectedOption: { backgroundColor: '#E30613' },
  selectedOptionText: { color: '#fff' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  priceInput: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12, 
    width: '48%', 
    fontSize: 16 
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 30 
  },
  resetBtn: { 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#E30613', 
    borderRadius: 12, 
    width: '48%', 
    alignItems: 'center' 
  },
  resetText: { color: '#E30613', fontWeight: 'bold' },
  applyBtn: { 
    backgroundColor: '#E30613', 
    padding: 15, 
    borderRadius: 12, 
    width: '48%', 
    alignItems: 'center' 
  },
  applyText: { color: '#fff', fontWeight: 'bold' },
  sortOption: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  selectedSort: { backgroundColor: '#ffe6e6' },
});

export default HomeScreen;