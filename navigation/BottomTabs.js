import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../screens/HomeStack';
import ManageScreen from '../screens/ManageScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs(props) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home">
        {(screenProps) => (
          <HomeStack {...screenProps} {...props} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Gerenciar">
        {(screenProps) => (
          <ManageScreen {...screenProps} groups={props.groups} addGroup={props.addGroup} editGroup={props.editGroup} removeGroup={props.removeGroup} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
