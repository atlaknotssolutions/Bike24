import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const ORANGE = '#F97316';
const DARK = '#12121F';

// ─────────────────────────────────────────────
// 🔷 Reusable Input Field
// ─────────────────────────────────────────────
function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) {
  const [secure, setSecure] = useState(secureEntry);
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: '#888',
          letterSpacing: 1.4,
          marginBottom: 8,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: focused ? '#fff' : '#F4F5F7',
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: focused ? ORANGE : 'transparent',
          paddingHorizontal: 16,
          height: 56,
          shadowColor: focused ? ORANGE : 'transparent',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: focused ? 3 : 0,
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#bbb"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            fontSize: 15,
            color: DARK,
            fontWeight: '500',
          }}
        />
        {secureEntry && (
          <TouchableOpacity onPress={() => setSecure(!secure)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#bbb"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// 🔷 Dark Header (Sign Up / Login top section)
// ─────────────────────────────────────────────
function DarkHeader({ title, subtitle, onBack }) {
  return (
    <View
      style={{
        backgroundColor: DARK,
        paddingTop: Platform.OS === 'android' ? 48 : 20,
        paddingBottom: 36,
        paddingHorizontal: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <View
        style={{
          position: 'absolute',
          top: -30,
          left: -30,
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 18,
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: -20,
          width: 160,
          height: 160,
          borderRadius: 80,
          borderWidth: 1,
          borderColor: 'rgba(249,115,22,0.25)',
          borderStyle: 'dashed',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 60,
          right: 40,
          width: 80,
          height: 80,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: 'rgba(249,115,22,0.15)',
          borderStyle: 'dashed',
        }}
      />

      {/* Back button */}
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: 'rgba(255,255,255,0.12)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontSize: 36,
          fontWeight: '800',
          color: '#fff',
          letterSpacing: -0.5,
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontWeight: '400' }}>
        {subtitle}
      </Text>
    </View>
  );
}

// ─────────────────────────────────────────────
// ✅ SCREEN 1 — SignUpScreen
// ─────────────────────────────────────────────
export function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    // TODO: connect your auth logic here
    navigation.replace('AccessLocation');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: DARK }}>
      <StatusBar barStyle="light-content" backgroundColor={DARK} />

      <DarkHeader
        title="Sign Up"
        subtitle="Please sign up to get started"
        onBack={() => navigation.goBack()}
      />

      {/* White card */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          paddingHorizontal: 24,
          paddingTop: 32,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputField
            label="Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <InputField
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <InputField
            label="Password"
            placeholder="••••••••••"
            value={password}
            onChangeText={setPassword}
            secureEntry
          />
          <InputField
            label="Re-type Password"
            placeholder="••••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureEntry
          />

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            activeOpacity={0.85}
            style={{
              backgroundColor: ORANGE,
              borderRadius: 16,
              height: 58,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
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
              SIGN UP
            </Text>
          </TouchableOpacity>

          {/* Login link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24, marginBottom: 32 }}>
            <Text style={{ color: '#aaa', fontSize: 14 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: ORANGE, fontWeight: '700', fontSize: 14 }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// ✅ SCREEN 2 — LoginScreen
// ─────────────────────────────────────────────
export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    // TODO: connect your auth logic here
    navigation.replace('Dashboard');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: DARK }}>
      <StatusBar barStyle="light-content" backgroundColor={DARK} />

      <DarkHeader
        title="Log In"
        subtitle="Welcome back! Please log in"
        onBack={() => navigation.goBack()}
      />

      {/* White card */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 24,
          paddingTop: 36,
        }}
      >
        <InputField
          label="Email"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          placeholder="••••••••••"
          value={password}
          onChangeText={setPassword}
          secureEntry
        />

        {/* Forgot Password */}
        <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 28, marginTop: -8 }}>
          <Text style={{ color: ORANGE, fontSize: 13, fontWeight: '600' }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
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
            LOG IN
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 28 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
          <Text style={{ color: '#ccc', marginHorizontal: 14, fontSize: 13 }}>or continue with</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
        </View>

        {/* Social buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
          {['logo-google', 'logo-facebook', 'logo-apple'].map((icon) => (
            <TouchableOpacity
              key={icon}
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                backgroundColor: '#F4F5F7',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#eee',
              }}
            >
              <Ionicons name={icon} size={24} color={DARK} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign up link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32 }}>
          <Text style={{ color: '#aaa', fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: ORANGE, fontWeight: '700', fontSize: 14 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// ✅ SCREEN 3 — AccessLocationScreen
// ─────────────────────────────────────────────
export function AccessLocationScreen({ navigation }) {
  const handleAccess = async () => {
    try {
      // If using expo-location:
      // const { status } = await Location.requestForegroundPermissionsAsync();
      // if (status === 'granted') { ... }
      Alert.alert('Location Access', 'Location permission granted!', [
        { text: 'OK', onPress: () => navigation.replace('Dashboard') },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSkip = () => navigation.replace('Dashboard');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 }}>

        {/* Map Illustration */}
        <View
          style={{
            width: 260,
            height: 260,
            borderRadius: 130,
            backgroundColor: '#F0F4FF',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 48,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Map road lines */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {/* Horizontal roads */}
            <View style={{ position: 'absolute', top: '38%', left: 0, right: 0, height: 28, backgroundColor: '#F5E97A', opacity: 0.8 }} />
            <View style={{ position: 'absolute', top: '62%', left: 0, right: 0, height: 20, backgroundColor: '#F5E97A', opacity: 0.6 }} />
            {/* Vertical roads */}
            <View style={{ position: 'absolute', left: '30%', top: 0, bottom: 0, width: 28, backgroundColor: '#F5E97A', opacity: 0.8 }} />
            <View style={{ position: 'absolute', left: '60%', top: 0, bottom: 0, width: 20, backgroundColor: '#F5E97A', opacity: 0.6 }} />
            {/* Green block */}
            <View style={{ position: 'absolute', top: '5%', right: '15%', width: 40, height: 36, backgroundColor: '#7ED8A4', borderRadius: 6, opacity: 0.8 }} />
            {/* Block fills */}
            <View style={{ position: 'absolute', top: '10%', left: '10%', width: 55, height: 26, backgroundColor: '#E8EDF5', borderRadius: 6 }} />
            <View style={{ position: 'absolute', bottom: '14%', right: '10%', width: 50, height: 30, backgroundColor: '#E8EDF5', borderRadius: 6 }} />
            <View style={{ position: 'absolute', bottom: '10%', left: '8%', width: 60, height: 22, backgroundColor: '#E8EDF5', borderRadius: 6 }} />
          </View>

          {/* Pin shadow */}
          <View
            style={{
              position: 'absolute',
              bottom: '30%',
              width: 30,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(0,0,0,0.15)',
              zIndex: 2,
            }}
          />

          {/* Map pin */}
          <View style={{ alignItems: 'center', zIndex: 10, marginBottom: 20 }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: ORANGE,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: ORANGE,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 10,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                }}
              />
            </View>
            {/* Pin tail */}
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderTopWidth: 18,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: ORANGE,
                marginTop: -2,
              }}
            />
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            color: DARK,
            textAlign: 'center',
            marginBottom: 12,
            letterSpacing: -0.5,
          }}
        >
          Enable Location
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#999',
            textAlign: 'center',
            lineHeight: 23,
            marginBottom: 48,
            maxWidth: 280,
          }}
        >
          We need your location to find the best restaurants and deliver to your doorstep.
        </Text>

        {/* ACCESS LOCATION button */}
        <TouchableOpacity
          onPress={handleAccess}
          activeOpacity={0.85}
          style={{
            width: '100%',
            backgroundColor: ORANGE,
            borderRadius: 16,
            height: 58,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: ORANGE,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 8,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontWeight: '800',
              letterSpacing: 1.4,
              marginRight: 10,
            }}
          >
            ACCESS LOCATION
          </Text>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="location-outline" size={18} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity onPress={handleSkip} style={{ paddingVertical: 10 }}>
          <Text style={{ color: '#bbb', fontSize: 14, fontWeight: '500' }}>Maybe Later</Text>
        </TouchableOpacity>

        {/* Info text */}
        <Text
          style={{
            color: '#ccc',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 20,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontWeight: '600',
          }}
        >
          DFood will access your location{'\n'}only while using the app
        </Text>
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// Default export — all screens bundled
// ─────────────────────────────────────────────
export default { SignUpScreen, LoginScreen, AccessLocationScreen };