import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import GroupViewScreen from './GroupViewScreen';

const Stack = createStackNavigator();

export default function HomeStack({ groups, addComparison, updateComparison, deleteComparison }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeList">
        {(props) => <HomeScreen {...props} groups={groups} />}
      </Stack.Screen>
      <Stack.Screen name="GroupView">
        {(props) => (
          <GroupViewScreen
            {...props}
            groups={groups}
            addComparison={addComparison}
            updateComparison={updateComparison}
            deleteComparison={deleteComparison}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
