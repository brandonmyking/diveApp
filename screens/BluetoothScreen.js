import React from 'react';
import { Bluetooth } from '../components/BluetoothComponent';

export default function BluetoothScreen() {
  return <Bluetooth />;
}

BluetoothScreen.navigationOptions = {
  title: 'Bluetooth Upload',
};