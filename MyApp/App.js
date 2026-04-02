import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "./src/screens/Cartcontext/Cartcontext.js";
import { WalletProvider } from "./src/screens/Cartcontext/WalletContext.js";

const App = () => (
  <SafeAreaProvider>
    <CartProvider>
      <WalletProvider>
        <AppNavigator />
      </WalletProvider>
    </CartProvider>
  </SafeAreaProvider>
);

export default App;
