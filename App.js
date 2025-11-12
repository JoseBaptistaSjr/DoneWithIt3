import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './app/screens/LoginScreen';
import AccountScreen from './app/screens/AccountScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';

export default function App() {

  return (
    <GestureHandlerRootView>
      <ListingDetailsScreen />
    </GestureHandlerRootView>
  );
}



