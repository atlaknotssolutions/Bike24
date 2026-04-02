

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import tw from 'twrnc';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const ingredients = [
//   { name: 'Sauce', icon: 'pizza' },
//   { name: 'Chicken', icon: 'restaurant' },
//   { name: 'Onion', icon: 'leaf' },
//   { name: 'Garlic', icon: 'flame' },
//   { name: 'Chili', icon: 'flame-outline' },
// ];

// export default function DetailsScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { item } = route.params || {};

//   const [size, setSize] = useState('14"');
//   const [quantity, setQuantity] = useState(2);
//   const price = 32;

//   // Dynamic values from item, with fallbacks
//   const itemName    = item?.name        || 'Pizza Calzone European';
//   const itemTags    = item?.tags        || 'Pizza · Calzone · European · Coffee';
//   const itemImage   = item?.image       || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800';
//   const itemRating  = item?.rating      || '4.7';
//   const itemTime    = item?.deliveryTime|| '20 min';
//   const itemFee     = item?.deliveryFee || 'Free';

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <ScrollView showsVerticalScrollIndicator={false}>

//         {/* ── Hero Image + Back + Favourite ── */}
//         <View style={tw`relative`}>
//           <TouchableOpacity
//             style={tw`absolute top-12 left-5 z-10 bg-white rounded-full p-3 shadow-lg`}
//             onPress={() => navigation.goBack()}
//           >
//             <Ionicons name="arrow-back" size={24} color="#333" />
//           </TouchableOpacity>

//           <Image
//             source={{ uri: itemImage }}
//             style={tw`w-full h-96`}
//             resizeMode="cover"
//           />

//           <TouchableOpacity
//             style={tw`absolute top-12 right-5 bg-white rounded-full p-3 shadow-lg`}
//           >
//             <Ionicons name="heart-outline" size={24} color="#ff4444" />
//           </TouchableOpacity>
//         </View>

//         {/* ── Content ── */}
//         <View style={tw`px-5 -mt-6`}>

//           {/* Restaurant chip */}
//           <TouchableOpacity
//             style={tw`flex-row items-center mb-4 bg-white rounded-xl p-4 shadow-md`}
//           >
//             <View style={tw`bg-orange-100 rounded-full p-3 mr-3`}>
//               <Ionicons name="cafe" size={24} color="#f97316" />
//             </View>
//             <Text style={tw`text-lg font-semibold text-gray-800`}>{itemName}</Text>
//           </TouchableOpacity>

//           {/* Title */}
//           <Text style={tw`text-3xl font-bold text-gray-800 mb-2`}>{itemName}</Text>

//           {/* Tags / description */}
//           <Text style={tw`text-gray-500 mb-2 text-sm`}>{itemTags}</Text>
//           <Text style={tw`text-gray-600 mb-5 leading-6`}>
//             Freshly prepared with premium ingredients. A crowd favourite you'll want to order again and again.
//           </Text>

//           {/* Rating + Delivery info */}
//           <View style={tw`flex-row flex-wrap items-center mb-8`}>
//             <View style={tw`flex-row items-center bg-green-100 px-4 py-2 rounded-full mr-3 mb-2`}>
//               <Ionicons name="star" size={18} color="#22c55e" />
//               <Text style={tw`ml-2 font-medium text-green-700`}>{itemRating}</Text>
//             </View>
//             <View style={tw`flex-row items-center mr-3 mb-2`}>
//               <Ionicons name="bicycle" size={20} color="#f97316" />
//               <Text style={tw`ml-2 text-gray-700`}>{itemFee}</Text>
//             </View>
//             <View style={tw`flex-row items-center mb-2`}>
//               <Ionicons name="time-outline" size={20} color="#f97316" />
//               <Text style={tw`ml-2 text-gray-700`}>{itemTime}</Text>
//             </View>
//           </View>

//           {/* Size selector */}
//           <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>SIZE:</Text>
//           <View style={tw`flex-row mb-8`}>
//             {['10"', '14"', '16"'].map((s) => (
//               <TouchableOpacity
//                 key={s}
//                 onPress={() => setSize(s)}
//                 style={tw`mr-4 px-7 py-3 rounded-full border ${
//                   size === s ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'
//                 }`}
//               >
//                 <Text style={tw`${size === s ? 'text-white font-bold' : 'text-gray-700'}`}>
//                   {s}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Ingredients */}
//           <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>INGREDIENTS</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-10`}>
//             {ingredients.map((ing, i) => (
//               <View key={i} style={tw`items-center mr-8`}>
//                 <View style={tw`w-16 h-16 rounded-full bg-orange-50 items-center justify-center mb-2 shadow-sm`}>
//                   <Ionicons name={ing.icon} size={32} color="#f97316" />
//                 </View>
//                 <Text style={tw`text-sm text-gray-600`}>{ing.name}</Text>
//               </View>
//             ))}
//           </ScrollView>

//           {/* Price + Quantity */}
//           <View style={tw`flex-row items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-md`}>
//             <Text style={tw`text-4xl font-bold text-gray-900`}>${price}</Text>
//             <View style={tw`flex-row items-center bg-gray-100 rounded-full px-2 py-1.5`}>
//               <TouchableOpacity
//                 onPress={() => quantity > 1 && setQuantity(quantity - 1)}
//                 style={tw`px-4`}
//               >
//                 <Text style={tw`text-3xl text-gray-700`}>-</Text>
//               </TouchableOpacity>
//               <Text style={tw`text-2xl font-bold px-6`}>{quantity}</Text>
//               <TouchableOpacity
//                 onPress={() => setQuantity(quantity + 1)}
//                 style={tw`px-4`}
//               >
//                 <Text style={tw`text-3xl text-gray-700`}>+</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Add to Cart */}
//           <TouchableOpacity
//             style={tw`bg-orange-500 py-6 rounded-2xl items-center shadow-xl mb-10`}
//             activeOpacity={0.85}
//           >
//             <Text style={tw`text-white text-xl font-bold`}>
//               Add to Cart — ${price * quantity}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// DetailsScreen.jsx
// Updated: Add to Cart button now adds item to global cart & navigates to CartScreen

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from './Cartcontext/Cartcontext.js';

const ORANGE = '#F97316';

const ingredients = [
  { name: 'Sauce',   icon: 'pizza' },
  { name: 'Chicken', icon: 'restaurant' },
  { name: 'Onion',   icon: 'leaf' },
  { name: 'Garlic',  icon: 'flame' },
  { name: 'Chili',   icon: 'flame-outline' },
];

export default function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params || {};
  const { addToCart } = useCart();

  const [size, setSize]         = useState('14"');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded]       = useState(false);

  const price = 32;

  const itemName  = item?.name         || 'Pizza Calzone European';
  const itemTags  = item?.tags         || 'Pizza · Calzone · European · Coffee';
  const itemImage = item?.image        || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800';
  const itemRating= item?.rating       || '4.7';
  const itemTime  = item?.deliveryTime || '20 min';
  const itemFee   = item?.deliveryFee  || 'Free';

  const handleAddToCart = () => {
    addToCart({
      name:         itemName,
      image:        itemImage,
      price:        price,
      size:         size,
      quantity:     quantity,
      rating:       itemRating,
      deliveryTime: itemTime,
      deliveryFee:  itemFee,
    });
    // Green flash then navigate to Cart
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      navigation.navigate('Cart');
    }, 400);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero Image ── */}
        <View style={tw`relative`}>
          <TouchableOpacity
            style={tw`absolute top-12 left-5 z-10 bg-white rounded-full p-3 shadow-lg`}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Image
            source={{ uri: itemImage }}
            style={tw`w-full h-96`}
            resizeMode="cover"
          />

          {/* Cart icon top-right — tap to go to cart directly */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={tw`absolute top-12 right-5 bg-white rounded-full p-3 shadow-lg`}
          >
            <Ionicons name="cart-outline" size={24} color={ORANGE} />
          </TouchableOpacity>
        </View>

        {/* ── Content ── */}
        <View style={tw`px-5 -mt-6`}>

          {/* Restaurant chip */}
          <TouchableOpacity
            style={tw`flex-row items-center mb-4 bg-white rounded-xl p-4 shadow-md`}
          >
            <View style={tw`bg-orange-100 rounded-full p-3 mr-3`}>
              <Ionicons name="cafe" size={24} color={ORANGE} />
            </View>
            <Text style={tw`text-lg font-semibold text-gray-800`}>{itemName}</Text>
          </TouchableOpacity>

          <Text style={tw`text-3xl font-bold text-gray-800 mb-2`}>{itemName}</Text>
          <Text style={tw`text-gray-500 mb-2 text-sm`}>{itemTags}</Text>
          <Text style={tw`text-gray-600 mb-5 leading-6`}>
            Freshly prepared with premium ingredients. A crowd favourite you'll want to order again and again.
          </Text>

          {/* Rating + Delivery */}
          <View style={tw`flex-row flex-wrap items-center mb-8`}>
            <View style={tw`flex-row items-center bg-green-100 px-4 py-2 rounded-full mr-3 mb-2`}>
              <Ionicons name="star" size={18} color="#22c55e" />
              <Text style={tw`ml-2 font-medium text-green-700`}>{itemRating}</Text>
            </View>
            <View style={tw`flex-row items-center mr-3 mb-2`}>
              <Ionicons name="bicycle" size={20} color={ORANGE} />
              <Text style={tw`ml-2 text-gray-700`}>{itemFee}</Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="time-outline" size={20} color={ORANGE} />
              <Text style={tw`ml-2 text-gray-700`}>{itemTime}</Text>
            </View>
          </View>

          {/* Size */}
          <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>SIZE:</Text>
          <View style={tw`flex-row mb-8`}>
            {['10"', '14"', '16"'].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSize(s)}
                style={tw`mr-4 px-7 py-3 rounded-full border ${
                  size === s ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'
                }`}
              >
                <Text style={tw`${size === s ? 'text-white font-bold' : 'text-gray-700'}`}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Ingredients */}
          <Text style={tw`text-lg font-bold text-gray-800 mb-4`}>INGREDIENTS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-10`}>
            {ingredients.map((ing, i) => (
              <View key={i} style={tw`items-center mr-8`}>
                <View style={tw`w-16 h-16 rounded-full bg-orange-50 items-center justify-center mb-2 shadow-sm`}>
                  <Ionicons name={ing.icon} size={32} color={ORANGE} />
                </View>
                <Text style={tw`text-sm text-gray-600`}>{ing.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Price + Quantity */}
          <View style={tw`flex-row items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-md`}>
            <View>
              <Text style={{ color: '#aaa', fontSize: 12, fontWeight: '600', marginBottom: 2 }}>
                TOTAL PRICE
              </Text>
              <Text style={tw`text-4xl font-bold text-gray-900`}>
                ${(price * quantity).toFixed(2)}
              </Text>
            </View>
            <View style={tw`flex-row items-center bg-gray-100 rounded-full px-2 py-1.5`}>
              <TouchableOpacity
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                style={tw`px-4`}
              >
                <Text style={tw`text-3xl text-gray-700`}>−</Text>
              </TouchableOpacity>
              <Text style={tw`text-2xl font-bold px-6`}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={tw`px-4`}
              >
                <Text style={tw`text-3xl text-gray-700`}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── ADD TO CART Button ── */}
          <TouchableOpacity
            onPress={handleAddToCart}
            activeOpacity={0.85}
            style={{
              backgroundColor: added ? '#22c55e' : ORANGE,
              borderRadius: 18,
              height: 62,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              shadowColor: added ? '#22c55e' : ORANGE,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.4,
              shadowRadius: 18,
              elevation: 10,
              marginBottom: 32,
            }}
          >
            <Ionicons
              name={added ? 'checkmark-circle' : 'cart'}
              size={22}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontWeight: '800',
                letterSpacing: 1,
              }}
            >
              {added ? 'Added!' : `Add to Cart — $${(price * quantity).toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}