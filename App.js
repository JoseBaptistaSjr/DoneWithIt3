import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppButton from './app/components/AppButton';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Card from './app/components/Card';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import Screen from './app/components/Screen';
import Icon from './app/components/Icon';
import ListItem from './app/components/ListItem';
import AccountScreen from './app/screens/AccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import AppTextInput from './app/components/AppTextInput';
import AppPicker from './app/components/AppPicker';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);


  return (
    <GestureHandlerRootView>
      <Screen>
        <AppPicker icon="apps" placeholder='Category'/>
        <AppTextInput icon="email" placeholder='Email'/>
      </Screen>
    </GestureHandlerRootView>
  );
}



