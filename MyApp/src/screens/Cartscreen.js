// CartScreen.jsx
// Dark themed cart screen matching the provided design

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './Cartcontext/Cartcontext.js';

const { width } = Dimensions.get('window');
const ORANGE = '#F97316';
const DARK = '#12121F';
const DARK2 = '#1C1C2E';
const CARD = '#1E1E30';

export default function CartScreen() {
  const navigation = useNavigation();
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState('2118 Thornridge Cir. Syracuse');
  const [editingAddress, setEditingAddress] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const deliveryFee = 0;
  const tax = parseFloat((totalPrice * 0.05).toFixed(2));
  const grandTotal = totalPrice + deliveryFee + tax;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Please add items before placing an order.');
      return;
    }
    Alert.alert('Order Placed! 🎉', `Your order of $${grandTotal.toFixed(2)} has been placed.`, [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Dashboard');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: DARK }}>
      <StatusBar barStyle="light-content" backgroundColor={DARK} />

      {/* ── Header ── */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.1)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14,
            }}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>Cart</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: ORANGE, fontSize: 14, fontWeight: '700', letterSpacing: 0.8 }}>
            EDIT ITEMS
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        {/* ── Cart Items ── */}
        <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
          {cartItems.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 60 }}>
              <Ionicons name="cart-outline" size={72} color="rgba(255,255,255,0.15)" />
              <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18, marginTop: 16, fontWeight: '600' }}>
                Your cart is empty
              </Text>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginTop: 24,
                  backgroundColor: ORANGE,
                  paddingHorizontal: 28,
                  paddingVertical: 12,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
                  Browse Menu
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            cartItems.map((item) => (
              <View
                key={item.cartId}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: CARD,
                  borderRadius: 20,
                  padding: 14,
                  marginBottom: 14,
                }}
              >
                {/* Food image */}
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 16,
                    overflow: 'hidden',
                    backgroundColor: '#2a2a3e',
                    marginRight: 14,
                  }}
                >
                  <Image
                    source={{ uri: item.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Info */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: '800',
                      marginBottom: 6,
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>

                  {/* Size + Qty controls */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginRight: 12 }}>
                      {item.size}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        borderRadius: 50,
                        paddingHorizontal: 4,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.cartId, item.quantity - 1)}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 18, lineHeight: 22 }}>−</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 15,
                          fontWeight: '700',
                          paddingHorizontal: 14,
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.cartId, item.quantity + 1)}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 18, lineHeight: 22 }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Delete */}
                <TouchableOpacity
                  onPress={() => removeFromCart(item.cartId)}
                  style={{ padding: 6, marginLeft: 4 }}
                >
                  <Ionicons name="trash-outline" size={18} color="rgba(255,80,80,0.7)" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* ── White Bottom Card ── */}
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 32,
            marginTop: 12,
            minHeight: 260,
          }}
        >
          {/* Delivery Address */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#aaa',
                letterSpacing: 1.4,
                textTransform: 'uppercase',
              }}
            >
              Delivery Address
            </Text>
            <TouchableOpacity onPress={() => setEditingAddress(!editingAddress)}>
              <Text style={{ color: ORANGE, fontSize: 13, fontWeight: '700' }}>EDIT</Text>
            </TouchableOpacity>
          </View>

          {editingAddress ? (
            <TextInput
              value={address}
              onChangeText={setAddress}
              onBlur={() => setEditingAddress(false)}
              autoFocus
              style={{
                backgroundColor: '#F4F5F7',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 14,
                color: '#333',
                marginBottom: 20,
                borderWidth: 1.5,
                borderColor: ORANGE,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: '#F4F5F7',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                marginBottom: 20,
              }}
            >
              <Text style={{ color: '#555', fontSize: 14, fontWeight: '500' }}>{address}</Text>
            </View>
          )}

          {/* Total + Breakdown */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={{ color: '#aaa', fontSize: 14, fontWeight: '600', marginRight: 8 }}>
                TOTAL:
              </Text>
              <Text style={{ color: DARK, fontSize: 34, fontWeight: '800' }}>
                ${grandTotal.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowBreakdown(!showBreakdown)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: ORANGE, fontSize: 14, fontWeight: '600' }}>Breakdown</Text>
              <Ionicons
                name={showBreakdown ? 'chevron-up' : 'chevron-forward'}
                size={16}
                color={ORANGE}
              />
            </TouchableOpacity>
          </View>

          {/* Breakdown panel */}
          {showBreakdown && (
            <View
              style={{
                backgroundColor: '#F9F9FB',
                borderRadius: 14,
                padding: 16,
                marginBottom: 20,
              }}
            >
              {[
                { label: 'Subtotal', value: `$${totalPrice.toFixed(2)}` },
                { label: 'Delivery Fee', value: deliveryFee === 0 ? 'Free' : `$${deliveryFee}` },
                { label: 'Tax (5%)', value: `$${tax.toFixed(2)}` },
              ].map((row) => (
                <View
                  key={row.label}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: '#999', fontSize: 13 }}>{row.label}</Text>
                  <Text style={{ color: DARK, fontSize: 13, fontWeight: '700' }}>{row.value}</Text>
                </View>
              ))}
              <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 8 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: DARK, fontSize: 14, fontWeight: '700' }}>Total</Text>
                <Text style={{ color: ORANGE, fontSize: 14, fontWeight: '800' }}>
                  ${grandTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          )}

          {/* PLACE ORDER Button */}
          <TouchableOpacity
            onPress={handlePlaceOrder}
            activeOpacity={0.85}
            style={{
              backgroundColor: ORANGE,
              borderRadius: 16,
              height: 58,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: ORANGE,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '800',
                letterSpacing: 1.5,
              }}
            >
              PLACE ORDER
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}