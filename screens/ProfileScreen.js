import React from 'react';
import { Profile } from '../components/ProfileComponent';

export default function ProfileScreen() {
  return <Profile />;
}

ProfileScreen.navigationOptions = {
  title: 'My Profile',
};
