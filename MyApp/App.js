import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from './src/screens/Cartcontext/Cartcontext.js';
const App = () => (
  <SafeAreaProvider>
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  </SafeAreaProvider>
);

export default App;
