import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const recentKeywords = ['Burger', 'Sandwich', 'Pizza', 'Sanwich'];

const suggestedRestaurants = [
  { name: 'Pansi Restaurant', rating: 4.7, image: 'https://images.unsplash.com/photo-1517248135467-2c7ed3ab7229?w=400' },
  { name: 'American Spicy Burger Shop', rating: 4.3, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400' },
  { name: 'Cafenio Coffee Club', rating: 4.0, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400' },
];

const popularItems = [
  {
    name: 'European Pizza',
    restaurant: 'Uttorra Coffe House',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
  },
  {
    name: 'Buffalo Pizza',
    restaurant: 'Cafenio Coffee Club',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&crop=entropy',
  },
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={tw`flex-1 text-center text-xl font-bold ml-[-28px]`}>Search</Text>
        <View style={tw`relative`}>
          <Ionicons name="cart-outline" size={28} color="#333" />
          <View
            style={tw`absolute -top-1 -right-1 bg-orange-500 w-5 h-5 rounded-full items-center justify-center`}
          >
            <Text style={tw`text-white text-xs font-bold`}>2</Text>
          </View>
        </View>
      </View>

      {/* Search Input */}
      <View style={tw`px-5 py-4`}>
        <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-3`}>
          <Ionicons name="search" size={22} color="#888" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Pizza"
            placeholderTextColor="#999"
            style={tw`flex-1 ml-3 text-base text-gray-700`}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={22} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={tw`flex-1 px-5`}>
        {/* Recent Keywords */}
        <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Recent Keywords</Text>
        <View style={tw`flex-row flex-wrap mb-6`}>
          {recentKeywords.map((kw, i) => (
            <TouchableOpacity
              key={i}
              style={tw`bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2`}
              onPress={() => setSearchQuery(kw)}
            >
              <Text style={tw`text-gray-700`}>{kw}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggested Restaurants */}
        <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Suggested Restaurants</Text>
        {suggestedRestaurants.map((res, i) => (
          <TouchableOpacity key={i} style={tw`flex-row items-center mb-4`} activeOpacity={0.8}>
            <Image source={{ uri: res.image }} style={tw`w-16 h-16 rounded-lg mr-4`} />
            <View>
              <Text style={tw`font-semibold text-gray-800`}>{res.name}</Text>
              <Text style={tw`text-orange-500`}>★ {res.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Popular Fast Food */}
        <Text style={tw`text-lg font-bold text-gray-800 mb-3 mt-4`}>Popular Fast Food</Text>
        <View style={tw`flex-row flex-wrap justify-between`}>
          {popularItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={tw`w-[48%] mb-6`}
              onPress={() => navigation.navigate('Details', { item })}
            >
              <Image
                source={{ uri: item.image }}
                style={tw`w-full h-40 rounded-xl mb-2`}
                resizeMode="cover"
              />
              <Text style={tw`font-medium text-gray-800`}>{item.name}</Text>
              <Text style={tw`text-sm text-gray-600`}>{item.restaurant}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}