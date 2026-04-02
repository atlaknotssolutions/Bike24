


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const categories = [
  {
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Wings',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Dessert',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Pasta',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
  },
];

const featuredRestaurants = [
  {
    name: 'Rose Garden Restaurant',
    tags: 'Burger - Chicken - Riche - Wings',
    image: 'https://images.unsplash.com/photo-1517248135467-2c7ed3ab7229?auto=format&fit=crop&q=80&w=1000',
    rating: '4.7',
    deliveryTime: '20 min',
    deliveryFee: 'Free',
  },
  {
    name: 'Uttorra Coffee House',
    tags: 'Pizza - Calzone - European - Coffee',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=1000',
    rating: '4.5',
    deliveryTime: '25 min',
    deliveryFee: 'Free',
  },
  {
    name: 'Smokin Burger',
    tags: 'Burger - Fries - BBQ - American',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=1000',
    rating: '4.6',
    deliveryTime: '18 min',
    deliveryFee: '$1.99',
  },
  {
    name: 'Sushi Haven',
    tags: 'Sushi - Rolls - Japanese - Fresh',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
    rating: '4.8',
    deliveryTime: '22 min',
    deliveryFee: 'Free',
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const userName = 'Halal';

  // Modal states
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const handleImagePress = (item) => {
    setPreviewItem(item);
    setPreviewVisible(true);
  };

  const handleGoToDetails = () => {
    setPreviewVisible(false);
    navigation.navigate('Details', { item: previewItem });
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
    setPreviewItem(null);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* ── Improved Full-Screen Image Preview Modal ── */}
      <Modal
        visible={previewVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClosePreview}
      >
        <View style={tw`flex-1 bg-black/95 justify-between`}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={handleClosePreview}
            style={tw`absolute top-14 right-6 z-20 bg-black/40 rounded-full p-3`}
          >
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>

          {/* Image - Pura dikhane ke liye contain mode + badi height */}
          <View style={tw`flex-1 justify-center items-center px-4 pt-16`}>
            <Image
              source={{ uri: previewItem?.image }}
              style={tw`w-full h-3/4`}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Info + Button */}
          <View style={tw`px-6 pb-12`}>
            <Text style={tw`text-white text-3xl font-bold mb-2`}>
              {previewItem?.name}
            </Text>

            {previewItem?.tags && (
              <Text style={tw`text-gray-300 text-lg mb-4`}>{previewItem.tags}</Text>
            )}

            {previewItem?.rating && (
              <View style={tw`flex-row items-center mb-6`}>
                <Ionicons name="star" size={20} color="#fbbf24" />
                <Text style={tw`text-white text-lg ml-2 mr-5`}>{previewItem.rating}</Text>

                <Ionicons name="time-outline" size={20} color="#fb923c" />
                <Text style={tw`text-white text-lg ml-2 mr-5`}>{previewItem.deliveryTime}</Text>

                <Ionicons name="bicycle" size={20} color="#fb923c" />
                <Text style={tw`text-white text-lg ml-2`}>{previewItem.deliveryFee}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleGoToDetails}
              style={tw`bg-orange-500 py-5 rounded-2xl items-center shadow-2xl shadow-orange-500/40`}
              activeOpacity={0.85}
            >
              <Text style={tw`text-white text-xl font-bold`}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-100`}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>

        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-xs text-orange-500 font-medium`}>DELIVER TO</Text>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Text style={tw`text-base font-semibold text-gray-800`}>Halal Lab office</Text>
            <Ionicons name="chevron-down" size={20} color="#333" style={tw`ml-1`} />
          </TouchableOpacity>
        </View>

        <View style={tw`relative`}>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={28} color="#333" />
          </TouchableOpacity>
          <View style={tw`absolute -top-1 -right-1 bg-orange-500 w-5 h-5 rounded-full items-center justify-center`}>
            <Text style={tw`text-white text-xs font-bold`}>2</Text>
          </View>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Greeting + Search */}
        <View style={tw`px-5 pt-6 pb-4`}>
          <Text style={tw`text-2xl font-bold text-gray-800`}>
            Hey {userName}, Good Afternoon!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-3.5 mt-5`}
            activeOpacity={0.8}
          >
            <Ionicons name="search" size={22} color="#888" />
            <Text style={tw`flex-1 ml-3 text-base text-gray-600`}>
              Search dishes, restaurants
            </Text>
          </TouchableOpacity>
        </View>

        {/* All Categories */}
        <View style={tw`px-5 mt-2`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-gray-800`}>All Categories</Text>
            <TouchableOpacity>
              <Text style={tw`text-orange-500 font-medium`}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={tw`mr-6 items-center w-24`}
                activeOpacity={0.8}
                onPress={() => handleImagePress(cat)}
              >
                <View style={tw`w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-2 shadow-md`}>
                  <Image
                    source={{ uri: cat.image }}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                  />
                </View>
                <Text style={tw`text-center text-gray-700 font-medium`}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Open Restaurants */}
        <View style={tw`px-5 mt-8 mb-24`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-bold text-gray-800`}>Open Restaurants</Text>
            <TouchableOpacity>
              <Text style={tw`text-orange-500 font-medium`}>See All</Text>
            </TouchableOpacity>
          </View>

          {featuredRestaurants.map((restaurant, index) => (
            <TouchableOpacity
              key={index}
              style={tw`bg-white rounded-2xl shadow-lg overflow-hidden mb-7 border border-gray-100`}
              activeOpacity={0.9}
              onPress={() => handleImagePress(restaurant)}
            >
              <Image
                source={{ uri: restaurant.image }}
                style={tw`w-full h-56`}
                resizeMode="cover"
              />
              <View style={tw`p-4`}>
                <Text style={tw`text-xl font-bold text-gray-800 mb-1`}>
                  {restaurant.name}
                </Text>
                <Text style={tw`text-base text-gray-600 mb-2`}>{restaurant.tags}</Text>
                <View style={tw`flex-row items-center`}>
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Text style={tw`ml-1 text-gray-700 font-medium`}>{restaurant.rating}</Text>
                  <Text style={tw`ml-3 text-gray-500`}>• {restaurant.deliveryTime}</Text>
                  <Text style={tw`ml-3 text-gray-500`}>• {restaurant.deliveryFee}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}