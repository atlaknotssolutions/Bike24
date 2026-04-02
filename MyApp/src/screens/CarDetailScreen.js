// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import dayjs from 'dayjs';

// // const CarDetailScreen = ({ route, navigation }) => {
// //   const { car } = route.params;
// //   const [bidAmount, setBidAmount] = useState('');
// //   const [timeLeft, setTimeLeft] = useState(car.timeLeft || '2h 30m');

// //   // Fake countdown
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setTimeLeft(prev => {
// //         if (prev.includes('m')) {
// //           let min = parseInt(prev);
// //           if (min > 1) return `${min-1}m left`;
// //           return 'Auction ending soon';
// //         }
// //         return prev;
// //       });
// //     }, 60000); // every minute

// //     return () => clearInterval(interval);
// //   }, []);

// //   const placeBid = () => {
// //     if (!bidAmount || parseFloat(bidAmount) < 100000) {
// //       Alert.alert('Invalid Bid', 'Please enter a valid bid amount');
// //       return;
// //     }
// //     Alert.alert('Bid Placed!', `Your bid of ₹${bidAmount} has been placed successfully.`);
// //     setBidAmount('');
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Image source={{ uri: car.image }} style={styles.carImage} />

// //       <View style={styles.infoContainer}>
// //         <Text style={styles.carTitle}>{car.title}</Text>
// //         <Text style={styles.location}>📍 {car.location} • 2021 Model</Text>

// //         <View style={styles.bidInfo}>
// //           <View>
// //             <Text style={styles.label}>Current Highest Bid</Text>
// //             <Text style={styles.currentBid}>{car.currentBid}</Text>
// //           </View>
// //           <View>
// //             <Text style={styles.label}>Time Left</Text>
// //             <Text style={styles.time}>{timeLeft}</Text>
// //           </View>
// //         </View>

// //         <View style={styles.bidInputContainer}>
// //           <Text style={styles.bidLabel}>Place your bid (₹)</Text>
// //           <View style={styles.inputRow}>
// //             <TextInput
// //               style={styles.bidInput}
// //               placeholder="Enter bid amount"
// //               keyboardType="numeric"
// //               value={bidAmount}
// //               onChangeText={setBidAmount}
// //             />
// //             <TouchableOpacity style={styles.bidButton} onPress={placeBid}>
// //               <Text style={styles.bidButtonText}>Place Bid</Text>
// //             </TouchableOpacity>
// //           </View>
// //           <Text style={styles.note}>Minimum increment: ₹10,000</Text>
// //         </View>

// //         <TouchableOpacity style={styles.buyNowButton}>
// //           <Text style={styles.buyNowText}>Buy Now at ₹11.50 Lakh</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#fff' },
// //   carImage: { width: '100%', height: 280 },
// //   infoContainer: { padding: 20 },
// //   carTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
// //   location: { color: '#666', fontSize: 15, marginBottom: 20 },
// //   bidInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
// //   label: { fontSize: 13, color: '#888' },
// //   currentBid: { fontSize: 24, fontWeight: 'bold', color: '#E30613' },
// //   time: { fontSize: 20, fontWeight: 'bold', color: '#E30613' },
// //   bidInputContainer: { marginBottom: 25 },
// //   bidLabel: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
// //   inputRow: { flexDirection: 'row', alignItems: 'center' },
// //   bidInput: { 
// //     flex: 1, 
// //     borderWidth: 1, 
// //     borderColor: '#ddd', 
// //     borderRadius: 12, 
// //     padding: 16, 
// //     fontSize: 18 
// //   },
// //   bidButton: { 
// //     backgroundColor: '#E30613', 
// //     marginLeft: 12, 
// //     paddingHorizontal: 25, 
// //     justifyContent: 'center', 
// //     borderRadius: 12 
// //   },
// //   bidButtonText: { color: '#fff', fontWeight: 'bold' },
// //   note: { color: '#666', fontSize: 13, marginTop: 8 },
// //   buyNowButton: { 
// //     backgroundColor: '#28a745', 
// //     padding: 18, 
// //     borderRadius: 12, 
// //     alignItems: 'center' 
// //   },
// //   buyNowText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
// // });

// // export default CarDetailScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const CarDetailScreen = ({ route, navigation }) => {
//   const { car } = route.params;

//   const [activeTab, setActiveTab] = useState('EXTERIOR');
//   const [timeLeft, setTimeLeft] = useState(37 * 60 + 52); // 37m 52s in seconds
//   const [bidAmount, setBidAmount] = useState('');
//   const [isBalanceLow, setIsBalanceLow] = useState(true); // Screenshot ke hisaab se low hai

//   // Real Countdown Timer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 0) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}m ${secs.toString().padStart(2, '0')}s`;
//   };

//   const placeBid = () => {
//     if (!bidAmount || parseFloat(bidAmount) < 10000) {
//       Alert.alert('Invalid Bid', 'Please enter a valid bid amount (min ₹10,000)');
//       return;
//     }
//     if (isBalanceLow) {
//       Alert.alert('Low Balance', 'Please add money to your wallet to continue bidding.');
//       return;
//     }
//     Alert.alert('Success!', `Your bid of ₹${parseFloat(bidAmount).toLocaleString('en-IN')} has been placed.`);
//     setBidAmount('');
//   };

//   const startAutoBid = () => {
//     Alert.alert('Auto Bid', 'Auto bidding feature will be activated soon.');
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-up" size={24} color="#000" />
//         </TouchableOpacity>
//         <View style={{ flex: 1, marginLeft: 12 }}>
//           <Text style={styles.carName} numberOfLines={1}>
//             MARUTI SUZUKI Ertiga - VDI SHVS [2015 - 2018]
//           </Text>
//           <Text style={styles.carPrice}>₹{car.price ? car.price.toLocaleString('en-IN') : '4,57,000'}</Text>
//         </View>
//         <TouchableOpacity>
//           <Ionicons name="share-social-outline" size={24} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity style={{ marginLeft: 16 }}>
//           <Ionicons name="heart-outline" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Car Image */}
//       <Image source={{ uri: car.image }} style={styles.carImage} />

//       {/* Inspection Report Header */}
//       <View style={styles.inspectionHeader}>
//         <Text style={styles.inspectionTitle}>Inspection report</Text>
//       </View>

//       {/* Inspection Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('CAR DOCUMENTS')}>
//           <Text style={[styles.tabText, activeTab === 'CAR DOCUMENTS' && styles.activeTabText]}>CAR DOCUMENTS</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.tabItem, activeTab === 'EXTERIOR' && styles.activeTab]} onPress={() => setActiveTab('EXTERIOR')}>
//           <Text style={[styles.tabText, activeTab === 'EXTERIOR' && styles.activeTabText]}>EXTERIOR</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>4</Text></View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('ENGINE')}>
//           <Text style={styles.tabText}>ENGINE</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>4</Text></View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('AC')}>
//           <Text style={styles.tabText}>AC</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>5</Text></View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('ELECTRIK')}>
//           <Text style={styles.tabText}>ELECTRIK</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>4.5</Text></View>
//         </TouchableOpacity>
//       </View>

//       {/* Exterior Section */}
//       {activeTab === 'EXTERIOR' && (
//         <View style={styles.exteriorSection}>
//           <View style={styles.ratingRow}>
//             <Text style={styles.sectionTitle}>Exterior</Text>
//             <View style={styles.stars}>
//               <Text>★★★★☆</Text>
//               <View style={styles.ratingBox}><Text style={styles.ratingBoxText}>4</Text></View>
//             </View>
//           </View>

//           {/* Structure */}
//           <View style={styles.detailRow}>
//             <Ionicons name="checkmark-circle" size={22} color="#28a745" />
//             <Text style={styles.detailText}>Pillar, Apron, Boot Floor, Cowl Top</Text>
//             <Image source={{ uri: 'https://picsum.photos/id/20/80/60' }} style={styles.smallImage} />
//           </View>

//           {/* Ext. Panels */}
//           <Text style={styles.subTitle}>Ext. Panels</Text>

//           <View style={styles.panelRow}>
//             <Ionicons name="checkmark-circle" size={22} color="#28a745" />
//             <Text style={styles.panelText}>Roof</Text>
//             <Image source={{ uri: 'https://picsum.photos/id/1015/80/60' }} style={styles.smallImage} />
//           </View>

//           <View style={styles.panelRow}>
//             <Ionicons name="close-circle" size={22} color="#FF3B30" />
//             <View style={{ flex: 1 }}>
//               <Text style={styles.panelText}>Bonnet/Hood</Text>
//               <Text style={styles.issueText}>Dented, Scratched</Text>
//             </View>
//             <Image source={{ uri: 'https://picsum.photos/id/106/80/60' }} style={styles.smallImage} />
//           </View>

//           <View style={styles.panelRow}>
//             <Ionicons name="close-circle" size={22} color="#FF3B30" />
//             <View style={{ flex: 1 }}>
//               <Text style={styles.panelText}>Dicky Door / Boot Door</Text>
//               <Text style={styles.issueText}>Repainted, Dented, Scratched</Text>
//             </View>
//             <Image source={{ uri: 'https://picsum.photos/id/107/80/60' }} style={styles.smallImage} />
//           </View>

//           {/* More panels can be added similarly */}
//         </View>
//       )}

//       {/* Low Balance Banner */}
//       {isBalanceLow && (
//         <View style={styles.lowBalanceBanner}>
//           <Ionicons name="car-outline" size={28} color="#fff" />
//           <View style={{ marginLeft: 12, flex: 1 }}>
//             <Text style={styles.bannerTitle}>Low Account Balance</Text>
//             <Text style={styles.bannerText}>
//               Account balance is below Min. Balance Rs. 10000. Booking limit exceeded. Deposit Rs. 10000 to continue bidding.
//             </Text>
//           </View>
//         </View>
//       )}

//       {/* Timer & Buttons */}
//       <View style={styles.bottomSection}>
//         <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={[styles.placeBidButton, isBalanceLow && styles.disabledButton]} 
//             onPress={placeBid}
//             disabled={isBalanceLow}
//           >
//             <Text style={styles.placeBidText}>Place Bid</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.autoBidButton} onPress={startAutoBid}>
//             <Text style={styles.autoBidText}>Start Auto Bid</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },

//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   carName: { fontSize: 16, fontWeight: '600' },
//   carPrice: { fontSize: 20, fontWeight: 'bold', color: '#E30613' },

//   carImage: { width: '100%', height: 240 },

//   inspectionHeader: { padding: 16, backgroundColor: '#fff' },
//   inspectionTitle: { fontSize: 18, fontWeight: 'bold' },

//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   tabItem: {
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   tabText: { fontSize: 12, color: '#666' },
//   activeTabText: { color: '#E30613', fontWeight: 'bold' },
//   activeTab: { borderBottomWidth: 3, borderBottomColor: '#E30613' },
//   ratingBadge: {
//     backgroundColor: '#28a745',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginTop: 4,
//   },
//   ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

//   exteriorSection: { padding: 16, backgroundColor: '#fff' },
//   ratingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold' },
//   stars: { flexDirection: 'row', alignItems: 'center' },
//   ratingBox: { backgroundColor: '#28a745', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginLeft: 8 },
//   ratingBoxText: { color: '#fff', fontWeight: 'bold' },

//   detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
//   detailText: { flex: 1, marginLeft: 12, fontSize: 15 },

//   subTitle: { fontSize: 16, fontWeight: '600', marginTop: 10, marginBottom: 12 },

//   panelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
//   panelText: { flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '500' },
//   issueText: { marginLeft: 12, color: '#FF3B30', fontSize: 13 },

//   smallImage: { width: 60, height: 45, borderRadius: 6 },

//   lowBalanceBanner: {
//     backgroundColor: '#FF3B30',
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginVertical: 12,
//     borderRadius: 12,
//   },
//   bannerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
//   bannerText: { color: '#fff', fontSize: 13, marginTop: 4 },

//   bottomSection: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
//   timerText: { fontSize: 22, fontWeight: 'bold', color: '#E30613', textAlign: 'center', marginBottom: 16 },

//   buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
//   placeBidButton: {
//     flex: 1,
//     backgroundColor: '#E30613',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   disabledButton: { backgroundColor: '#999' },
//   placeBidText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

//   autoBidButton: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderWidth: 1.5,
//     borderColor: '#E30613',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   autoBidText: { color: '#E30613', fontSize: 16, fontWeight: 'bold' },
// });

// export default CarDetailScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const CarDetailScreen = ({ route, navigation }) => {
//   const { car } = route.params;

//   const [activeTab, setActiveTab] = useState('EXTERIOR');
//   const [timeLeft, setTimeLeft] = useState(37 * 60 + 52); // 37 minutes 52 seconds
//   const [bidAmount, setBidAmount] = useState('');
//   const [isBalanceLow, setIsBalanceLow] = useState(true);

//   // Real Countdown Timer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 0) return 0;
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}m ${secs.toString().padStart(2, '0')}s`;
//   };

//   const placeBid = () => {
//     if (!bidAmount || parseFloat(bidAmount) < 10000) {
//       Alert.alert('Invalid Bid', 'Please enter a valid bid amount (min ₹10,000)');
//       return;
//     }
//     if (isBalanceLow) {
//       Alert.alert('Low Balance', 'Please add money to your wallet to continue bidding.');
//       return;
//     }
//     Alert.alert('Success!', `Your bid of ₹${parseFloat(bidAmount).toLocaleString('en-IN')} has been placed successfully.`);
//     setBidAmount('');
//   };

//   const startAutoBid = () => {
//     Alert.alert('Auto Bid', 'Auto bidding will be activated soon.');
//   };

//   // Dummy Data for different tabs
//   const inspectionData = {
//     EXTERIOR: {
//       rating: '4',
//       title: 'Exterior',
//       items: [
//         { status: 'good', text: 'Pillar, Apron, Boot Floor, Cowl Top' },
//         { status: 'good', text: 'Roof' },
//         { status: 'bad', text: 'Bonnet/Hood - Dented, Scratched' },
//         { status: 'bad', text: 'Dicky Door / Boot Door - Repainted, Dented, Scratched' },
//         { status: 'bad', text: 'Left Door Front - Dented, Scratched' },
//         { status: 'bad', text: 'Left Door Rear - Dented, Scratched' },
//         { status: 'bad', text: 'Right Door Front - Dented, Scratched' },
//         { status: 'bad', text: 'Right Door Rear - Repainted, Dented, Scratched' },
//       ]
//     },
//     ENGINE: {
//       rating: '4',
//       title: 'Engine',
//       items: [
//         { status: 'good', text: 'Engine Mounting' },
//         { status: 'good', text: 'Engine Sound' },
//         { status: 'good', text: 'No Oil Leakage' },
//         { status: 'bad', text: 'Minor Smoke on Cold Start' },
//         { status: 'good', text: 'Radiator Condition' },
//       ]
//     },
//     AC: {
//       rating: '5',
//       title: 'AC',
//       items: [
//         { status: 'good', text: 'Cooling Performance' },
//         { status: 'good', text: 'AC Gas Level' },
//         { status: 'good', text: 'Blower Speed' },
//         { status: 'good', text: 'No Unusual Noise' },
//       ]
//     },
//     ELECTRIK: {
//       rating: '4.5',
//       title: 'Electrical',
//       items: [
//         { status: 'good', text: 'Battery Condition' },
//         { status: 'good', text: 'Headlights & Taillights' },
//         { status: 'good', text: 'Power Windows' },
//         { status: 'bad', text: 'Infotainment System - Minor Glitch' },
//         { status: 'good', text: 'Wiring & Connectors' },
//       ]
//     }
//   };

//   const currentData = inspectionData[activeTab] || inspectionData.EXTERIOR;

//   return (
//     <ScrollView style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.topBar}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-up" size={24} color="#000" />
//         </TouchableOpacity>
//         <View style={{ flex: 1, marginLeft: 12 }}>
//           <Text style={styles.carName} numberOfLines={1}>
//             MARUTI SUZUKI Ertiga - VDI SHVS [2015 - 2018]
//           </Text>
//           <Text style={styles.carPrice}>₹{car.price ? car.price.toLocaleString('en-IN') : '4,57,000'}</Text>
//         </View>
//         <TouchableOpacity>
//           <Ionicons name="share-social-outline" size={24} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity style={{ marginLeft: 16 }}>
//           <Ionicons name="heart-outline" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Car Image */}
//       <Image source={{ uri: car.image }} style={styles.carImage} />

//       {/* Inspection Report Header */}
//       <View style={styles.inspectionHeader}>
//         <Text style={styles.inspectionTitle}>Inspection report</Text>
//       </View>

//       {/* Inspection Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('EXTERIOR')}>
//           <Text style={[styles.tabText, activeTab === 'EXTERIOR' && styles.activeTabText]}>EXTERIOR</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>4</Text></View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('ENGINE')}>
//           <Text style={[styles.tabText, activeTab === 'ENGINE' && styles.activeTabText]}>ENGINE</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>4</Text></View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('AC')}>
//           <Text style={[styles.tabText, activeTab === 'AC' && styles.activeTabText]}>AC</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>5</Text></View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('ELECTRIK')}>
//           <Text style={[styles.tabText, activeTab === 'ELECTRIK' && styles.activeTabText]}>ELECTRIK</Text>
//           <View style={styles.ratingBadge}><Text style={styles.ratingText}>4.5</Text></View>
//         </TouchableOpacity>
//       </View>

//       {/* Dynamic Content based on Tab */}
//       <View style={styles.contentContainer}>
//         <View style={styles.ratingRow}>
//           <Text style={styles.sectionTitle}>{currentData.title}</Text>
//           <View style={styles.starsContainer}>
//             <Text style={styles.stars}>★★★★☆</Text>
//             <View style={styles.ratingBox}>
//               <Text style={styles.ratingBoxText}>{currentData.rating}</Text>
//             </View>
//           </View>
//         </View>

//         {currentData.items.map((item, index) => (
//           <View key={index} style={styles.panelRow}>
//             <Ionicons 
//               name={item.status === 'good' ? "checkmark-circle" : "close-circle"} 
//               size={24} 
//               color={item.status === 'good' ? "#28a745" : "#FF3B30"} 
//             />
//             <View style={{ flex: 1, marginLeft: 12 }}>
//               <Text style={styles.panelText}>{item.text}</Text>
//             </View>
//             <Image 
//               source={{ uri: `https://picsum.photos/id/${100 + index}/80/60` }} 
//               style={styles.smallImage} 
//             />
//           </View>
//         ))}
//       </View>

//       {/* Low Account Balance Banner */}
//       {isBalanceLow && (
//         <View style={styles.lowBalanceBanner}>
//           <Ionicons name="car-outline" size={28} color="#fff" />
//           <View style={{ marginLeft: 12, flex: 1 }}>
//             <Text style={styles.bannerTitle}>Low Account Balance</Text>
//             <Text style={styles.bannerText}>
//               Account balance is below Min. Balance Rs. 10000. Booking limit exceeded. Deposit Rs. 10000 to continue bidding.
//             </Text>
//           </View>
//         </View>
//       )}

//       {/* Timer and Action Buttons */}
//       <View style={styles.bottomSection}>
//         <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={[styles.placeBidButton, isBalanceLow && styles.disabledButton]} 
//             onPress={placeBid}
//             disabled={isBalanceLow}
//           >
//             <Text style={styles.placeBidText}>Place Bid</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.autoBidButton} onPress={startAutoBid}>
//             <Text style={styles.autoBidText}>Start Auto Bid</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },

//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   carName: { fontSize: 16, fontWeight: '600' },
//   carPrice: { fontSize: 20, fontWeight: 'bold', color: '#E30613' },

//   carImage: { width: '100%', height: 240 },

//   inspectionHeader: { padding: 16, backgroundColor: '#fff' },
//   inspectionTitle: { fontSize: 18, fontWeight: 'bold' },

//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   tabItem: {
//     alignItems: 'center',
//     marginHorizontal: 6,
//   },
//   tabText: { fontSize: 13, color: '#666' },
//   activeTabText: { color: '#E30613', fontWeight: 'bold' },
//   ratingBadge: {
//     backgroundColor: '#28a745',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//     marginTop: 4,
//   },
//   ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

//   contentContainer: { padding: 16, backgroundColor: '#fff' },
//   ratingRow: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     marginBottom: 20 
//   },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold' },
//   starsContainer: { flexDirection: 'row', alignItems: 'center' },
//   stars: { fontSize: 18, marginRight: 8 },
//   ratingBox: { 
//     backgroundColor: '#28a745', 
//     paddingHorizontal: 10, 
//     paddingVertical: 4, 
//     borderRadius: 6 
//   },
//   ratingBoxText: { color: '#fff', fontWeight: 'bold' },

//   panelRow: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     marginBottom: 16 
//   },
//   panelText: { 
//     flex: 1, 
//     marginLeft: 12, 
//     fontSize: 15, 
//     fontWeight: '500' 
//   },

//   smallImage: { 
//     width: 70, 
//     height: 50, 
//     borderRadius: 6 
//   },

//   lowBalanceBanner: {
//     backgroundColor: '#FF3B30',
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginVertical: 12,
//     borderRadius: 12,
//   },
//   bannerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
//   bannerText: { color: '#fff', fontSize: 13, marginTop: 4 },

//   bottomSection: { 
//     padding: 16, 
//     backgroundColor: '#fff', 
//     borderTopWidth: 1, 
//     borderTopColor: '#eee' 
//   },
//   timerText: { 
//     fontSize: 24, 
//     fontWeight: 'bold', 
//     color: '#E30613', 
//     textAlign: 'center', 
//     marginBottom: 20 
//   },

//   buttonContainer: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between' 
//   },
//   placeBidButton: {
//     flex: 1,
//     backgroundColor: '#E30613',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   disabledButton: { backgroundColor: '#999' },
//   placeBidText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

//   autoBidButton: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderWidth: 1.5,
//     borderColor: '#E30613',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   autoBidText: { color: '#E30613', fontSize: 16, fontWeight: 'bold' },
// });

// export default CarDetailScreen;



import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Alert, 
  FlatList, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CarDetailScreen = ({ route, navigation }) => {
  const { car } = route.params;

  const [activeTab, setActiveTab] = useState('EXTERIOR');
  const [timeLeft, setTimeLeft] = useState(37 * 60 + 52); // 37m 52s
  const [bidAmount, setBidAmount] = useState('');
  const [isBalanceLow, setIsBalanceLow] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const flatListRef = useRef(null);

  // Car Images for Carousel (Multiple images)
  const carImages = [
    car.image || 'https://picsum.photos/id/1015/800/500',
    'https://picsum.photos/id/106/800/500',
    'https://picsum.photos/id/1074/800/500',
    'https://picsum.photos/id/201/800/500',
    'https://picsum.photos/id/133/800/500',
  ];

  // Real Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs.toString().padStart(2, '0')}s`;
  };

  const placeBid = () => {
    if (!bidAmount || parseFloat(bidAmount) < 10000) {
      Alert.alert('Invalid Bid', 'Please enter a valid bid amount (min ₹10,000)');
      return;
    }
    if (isBalanceLow) {
      Alert.alert('Low Balance', 'Please add money to your wallet to continue bidding.');
      return;
    }
    Alert.alert('Success!', `Your bid of ₹${parseFloat(bidAmount).toLocaleString('en-IN')} has been placed successfully.`);
    setBidAmount('');
  };

  const startAutoBid = () => {
    Alert.alert('Auto Bid', 'Auto bidding will be activated soon.');
  };

  // Dummy Inspection Data
  const inspectionData = {
    EXTERIOR: {
      rating: '4',
      title: 'Exterior',
      items: [
        { status: 'good', text: 'Pillar, Apron, Boot Floor, Cowl Top' },
        { status: 'good', text: 'Roof' },
        { status: 'bad', text: 'Bonnet/Hood - Dented, Scratched' },
        { status: 'bad', text: 'Dicky Door / Boot Door - Repainted, Dented, Scratched' },
        { status: 'bad', text: 'Left Door Front - Dented, Scratched' },
        { status: 'bad', text: 'Left Door Rear - Dented, Scratched' },
        { status: 'bad', text: 'Right Door Front - Dented, Scratched' },
        { status: 'bad', text: 'Right Door Rear - Repainted, Dented, Scratched' },
      ]
    },
    ENGINE: {
      rating: '4',
      title: 'Engine',
      items: [
        { status: 'good', text: 'Engine Mounting' },
        { status: 'good', text: 'Engine Sound' },
        { status: 'good', text: 'No Oil Leakage' },
        { status: 'bad', text: 'Minor Smoke on Cold Start' },
        { status: 'good', text: 'Radiator Condition' },
      ]
    },
    AC: {
      rating: '5',
      title: 'AC',
      items: [
        { status: 'good', text: 'Cooling Performance' },
        { status: 'good', text: 'AC Gas Level' },
        { status: 'good', text: 'Blower Speed' },
        { status: 'good', text: 'No Unusual Noise' },
      ]
    },
    ELECTRIK: {
      rating: '4.5',
      title: 'Electrical',
      items: [
        { status: 'good', text: 'Battery Condition' },
        { status: 'good', text: 'Headlights & Taillights' },
        { status: 'good', text: 'Power Windows' },
        { status: 'bad', text: 'Infotainment System - Minor Glitch' },
        { status: 'good', text: 'Wiring & Connectors' },
      ]
    }
  };

  const currentData = inspectionData[activeTab] || inspectionData.EXTERIOR;

  // Handle image scroll
  const onImageScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentImageIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-up" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.carName} numberOfLines={1}>
            MARUTI SUZUKI Ertiga - VDI SHVS [2015 - 2018]
          </Text>
          <Text style={styles.carPrice}>₹{car.price ? car.price.toLocaleString('en-IN') : '4,57,000'}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Ionicons name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={carImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onImageScroll}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.carouselImage} />
          )}
        />

        {/* Image Dots Indicator */}
        <View style={styles.dotsContainer}>
          {carImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: currentImageIndex === index ? '#E30613' : '#ccc' }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Inspection Report Header */}
      <View style={styles.inspectionHeader}>
        <Text style={styles.inspectionTitle}>Inspection report</Text>
      </View>

      {/* Inspection Tabs */}
      <View style={styles.tabContainer}>
        {['EXTERIOR', 'ENGINE', 'AC', 'ELECTRIK'].map((tab) => (
          <TouchableOpacity 
            key={tab}
            style={styles.tabItem} 
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                {inspectionData[tab].rating}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dynamic Content */}
      <View style={styles.contentContainer}>
        <View style={styles.ratingRow}>
          <Text style={styles.sectionTitle}>{currentData.title}</Text>
          <View style={styles.starsContainer}>
            <Text style={styles.stars}>★★★★☆</Text>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingBoxText}>{currentData.rating}</Text>
            </View>
          </View>
        </View>

        {currentData.items.map((item, index) => (
          <View key={index} style={styles.panelRow}>
            <Ionicons
              name={item.status === 'good' ? "checkmark-circle" : "close-circle"}
              size={24}
              color={item.status === 'good' ? "#28a745" : "#FF3B30"}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.panelText}>{item.text}</Text>
            </View>
            <Image
              source={{ uri: `https://picsum.photos/id/${100 + index}/80/60` }}
              style={styles.smallImage}
            />
          </View>
        ))}
      </View>

      {/* Low Balance Banner */}
      {isBalanceLow && (
        <View style={styles.lowBalanceBanner}>
          <Ionicons name="car-outline" size={28} color="#fff" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.bannerTitle}>Low Account Balance</Text>
            <Text style={styles.bannerText}>
              Account balance is below Min. Balance Rs. 10000. Booking limit exceeded. Deposit Rs. 10000 to continue bidding.
            </Text>
          </View>
        </View>
      )}

      {/* Timer & Buttons */}
      <View style={styles.bottomSection}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.placeBidButton, isBalanceLow && styles.disabledButton]}
            onPress={placeBid}
            disabled={isBalanceLow}
          >
            <Text style={styles.placeBidText}>Place Bid</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.autoBidButton} onPress={startAutoBid}>
            <Text style={styles.autoBidText}>Start Auto Bid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  carName: { fontSize: 16, fontWeight: '600' },
  carPrice: { fontSize: 20, fontWeight: 'bold', color: '#E30613' },

  carouselContainer: { position: 'relative' },
  carouselImage: { width: width, height: 260, resizeMode: 'cover' },
  dotsContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  inspectionHeader: { padding: 16, backgroundColor: '#fff' },
  inspectionTitle: { fontSize: 18, fontWeight: 'bold' },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabItem: { alignItems: 'center', marginHorizontal: 8 },
  tabText: { fontSize: 13, color: '#666' },
  activeTabText: { color: '#E30613', fontWeight: 'bold' },
  ratingBadge: {
    backgroundColor: '#28a745',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  contentContainer: { padding: 16, backgroundColor: '#fff' },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  starsContainer: { flexDirection: 'row', alignItems: 'center' },
  stars: { fontSize: 18, marginRight: 8 },
  ratingBox: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  ratingBoxText: { color: '#fff', fontWeight: 'bold' },

  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  panelText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '500'
  },
  smallImage: {
    width: 70,
    height: 50,
    borderRadius: 6
  },

  lowBalanceBanner: {
    backgroundColor: '#FF3B30',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
  },
  bannerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  bannerText: { color: '#fff', fontSize: 13, marginTop: 4 },

  bottomSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E30613',
    textAlign: 'center',
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  placeBidButton: {
    flex: 1,
    backgroundColor: '#E30613',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  disabledButton: { backgroundColor: '#999' },
  placeBidText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  autoBidButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E30613',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  autoBidText: { color: '#E30613', fontSize: 16, fontWeight: 'bold' },
});

export default CarDetailScreen;