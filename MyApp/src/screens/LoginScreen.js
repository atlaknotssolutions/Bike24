

// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   Dimensions,
//   FlatList,
//   Animated,
//   StatusBar,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import tw from 'twrnc';

// const { width, height } = Dimensions.get('window');

// const slides = [
//   {
//     id: '1',
//     image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
//     badge: '🍕  Popular Near You',
//     title: 'All Your\nFavorites',
//     subtitle: 'Get all your loved foods in one place — you just place the order, we do the rest.',
//     accent: '#FF6B35',
//   },
//   {
//     id: '2',
//     image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800',
//     badge: '👨‍🍳  Top Rated Chefs',
//     title: 'Order from\nChosen Chef',
//     subtitle: 'Handpicked chefs who craft every dish with passion. Real food, real flavors.',
//     accent: '#FF6B35',
//   },
//   {
//     id: '3',
//     image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=800',
//     badge: '🚴  Fast Delivery',
//     title: 'Free Delivery\nOffers',
//     subtitle: 'Enjoy free delivery on your first 3 orders. Hot food at your door in minutes.',
//     accent: '#FF6B35',
//   },
// ];

// export default function OnboardingScreen({ navigation }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef(null);
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const handleDone = async () => {
//     try {
//       await AsyncStorage.setItem('onboardingSeen', 'true');
//       navigation.replace('Home');
//     } catch (error) {
//       console.log('Error saving onboarding state:', error);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < slides.length - 1) {
//       flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       handleDone();
//     }
//   };

//   const handleSkip = () => handleDone();

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index);
//     }
//   }).current;

//   const isLast = currentIndex === slides.length - 1;

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {/* Skip button top right */}
//       <View style={tw`flex-row justify-end px-6 pt-4 pb-2`}>
//         {!isLast && (
//           <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
//             <Text style={{ color: '#aaa', fontSize: 15, fontWeight: '500' }}>Skip</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Slides */}
//       <FlatList
//         ref={flatListRef}
//         data={slides}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
//         renderItem={({ item }) => (
//           <View style={{ width, alignItems: 'center' }}>
//             {/* Image Card */}
//             <View
//               style={{
//                 width: width * 0.88,
//                 height: height * 0.42,
//                 borderRadius: 32,
//                 overflow: 'hidden',
//                 marginTop: 8,
//                 shadowColor: '#FF6B35',
//                 shadowOffset: { width: 0, height: 12 },
//                 shadowOpacity: 0.18,
//                 shadowRadius: 24,
//                 elevation: 10,
//               }}
//             >
//               <Image
//                 source={{ uri: item.image }}
//                 style={{ width: '100%', height: '100%' }}
//                 resizeMode="cover"
//               />
//               {/* Gradient overlay bottom */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: 0,
//                   left: 0,
//                   right: 0,
//                   height: 80,
//                   background: 'transparent',
//                   // Simulate gradient with a semi-transparent view
//                   backgroundColor: 'rgba(0,0,0,0.18)',
//                 }}
//               />
//               {/* Badge */}
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 18,
//                   left: 18,
//                   backgroundColor: 'rgba(255,255,255,0.92)',
//                   borderRadius: 50,
//                   paddingHorizontal: 14,
//                   paddingVertical: 7,
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text style={{ fontSize: 13, fontWeight: '700', color: '#222' }}>
//                   {item.badge}
//                 </Text>
//               </View>
//             </View>

//             {/* Text */}
//             <View style={{ width: width * 0.88, marginTop: 32, alignItems: 'flex-start' }}>
//               <Text
//                 style={{
//                   fontSize: 38,
//                   fontWeight: '800',
//                   color: '#1A1A2E',
//                   lineHeight: 46,
//                   letterSpacing: -1,
//                   marginBottom: 14,
//                 }}
//               >
//                 {item.title}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   color: '#888',
//                   lineHeight: 26,
//                   fontWeight: '400',
//                   maxWidth: 300,
//                 }}
//               >
//                 {item.subtitle}
//               </Text>
//             </View>
//           </View>
//         )}
//       />

//       {/* Bottom Section: dots + button — fixed, NOT at very bottom */}
//       <View
//         style={{
//           paddingHorizontal: 28,
//           paddingBottom: 36,
//           paddingTop: 20,
//           alignItems: 'center',
//         }}
//       >
//         {/* Dots */}
//         <View style={{ flexDirection: 'row', marginBottom: 28 }}>
//           {slides.map((_, i) => {
//             const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
//             const dotWidth = scrollX.interpolate({
//               inputRange,
//               outputRange: [8, 26, 8],
//               extrapolate: 'clamp',
//             });
//             const opacity = scrollX.interpolate({
//               inputRange,
//               outputRange: [0.35, 1, 0.35],
//               extrapolate: 'clamp',
//             });
//             return (
//               <Animated.View
//                 key={i}
//                 style={{
//                   width: dotWidth,
//                   height: 8,
//                   borderRadius: 4,
//                   backgroundColor: '#FF6B35',
//                   opacity,
//                   marginHorizontal: 4,
//                 }}
//               />
//             );
//           })}
//         </View>

//         {/* Main CTA Button — centered, prominent */}
//         <TouchableOpacity
//           onPress={handleNext}
//           activeOpacity={0.88}
//           style={{
//             width: width * 0.82,
//             backgroundColor: '#FF6B35',
//             borderRadius: 20,
//             paddingVertical: 18,
//             alignItems: 'center',
//             shadowColor: '#FF6B35',
//             shadowOffset: { width: 0, height: 8 },
//             shadowOpacity: 0.35,
//             shadowRadius: 18,
//             elevation: 8,
//           }}
//         >
//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 17,
//               fontWeight: '800',
//               letterSpacing: 1.2,
//             }}
//           >
//             {isLast ? 'GET STARTED' : 'NEXT  →'}
//           </Text>
//         </TouchableOpacity>

//         {/* Small sign-in link */}
//         {isLast && (
//   <TouchableOpacity
//     onPress={() => navigation.navigate('Signup')}
//     style={{ marginTop: 16 }}
//   >
//     <Text style={{ color: '#aaa', fontSize: 14 }}>
//       Already have an account?{' '}
//       <Text style={{ color: '#FF6B35', fontWeight: '700' }}>
//         Sign In
//       </Text>
//     </Text>
//   </TouchableOpacity>
// )}
//       </View>
//     </SafeAreaView>
//   );
// }

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    if (phone.length === 10) {
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Please enter valid 10 digit phone number');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Cars24_Logo.svg/2560px-Cars24_Logo.svg.png' }} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      
      <Text style={styles.title}>Welcome to Cars24 Partners</Text>
      <Text style={styles.subtitle}>Channel Partner App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 10 digit mobile number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        maxLength={10}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue with OTP</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        New to Cars24? Your documents will be verified after registration.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
    justifyContent: 'center' 
  },
  logo: { 
    width: 220, 
    height: 70, 
    alignSelf: 'center', 
    marginBottom: 50 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 18, 
    textAlign: 'center', 
    color: '#666', 
    marginBottom: 50 
  },
  input: { 
    borderWidth: 1.5, 
    borderColor: '#ddd', 
    borderRadius: 12, 
    padding: 18, 
    fontSize: 18, 
    marginBottom: 25 
  },
  button: { 
    backgroundColor: '#E30613', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  note: { 
    marginTop: 40, 
    textAlign: 'center', 
    color: '#666', 
    fontSize: 14 
  },
});

export default LoginScreen;