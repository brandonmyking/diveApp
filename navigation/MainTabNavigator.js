import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDiveScreen from '../screens/AddDiveScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BluetoothScreen from '../screens/BluetoothScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Dive Log',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : ''}`
          : 'md-list'
      }
    />
  ),
};

HomeStack.path = '';

const AddDiveStack = createStackNavigator(
  {
    AddDive: AddDiveScreen,
  },
  config
);

AddDiveStack.navigationOptions = {
  tabBarLabel: 'Add Dive',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
  ),
};

AddDiveStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

const BluetoothStack = createStackNavigator(
  {
    Bluetooth: BluetoothScreen,
  },
  config
);

BluetoothStack.navigationOptions = {
  tabBarLabel: 'Bluetooth',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-bluetooth' : 'md-bluetooth'} />
  ),
};

BluetoothStack.path = '';

const tabNavigator = createBottomTabNavigator({
  AddDiveStack,
  BluetoothStack,
  HomeStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
