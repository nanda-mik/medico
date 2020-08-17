/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Ionicons, Fontisto} from '@expo/vector-icons';

import {
  RequestStack,
  HomeStack,
  PrescriptionStack,
  ChatbotStack,
  LocationStack,
  DietStack,
} from './stackNavigators';

import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import CustomDrawer from '../Components/customDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Home" shifting={true}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({color}) => {
          return <Ionicons name="ios-home" size={26} color={color} />;
        },
        tabBarColor: '#0f88fa',
      }}
    />
    <Tab.Screen
      name="Request"
      component={RequestStack}
      options={{
        tabBarIcon: ({color}) => {
          return <Fontisto name="doctor" size={26} color={color} />;
        },
        tabBarColor: '#0f88fa',
      }}
    />
    <Tab.Screen
      name="Prescriptions"
      component={PrescriptionStack}
      options={{
        tabBarIcon: ({color}) => {
          return <Ionicons name="ios-notifications" size={26} color={color} />;
        },
        tabBarColor: '#0f88fa',
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerStyle={{backgroundColor: 'white'}}
    drawerContentOptions={{
      labelStyle: {
        color: 'black',
      },
      activeTintColor: 'orange',
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="Home" component={TabNavigator} />
    <Drawer.Screen name="DocBot" component={ChatbotStack} />
    <Drawer.Screen name="Nearest Hospitals!" component={LocationStack} />
    <Drawer.Screen name="My Diet" component={DietStack} />
    {/* <Drawer.Screen name="Search Path" component={PredictionStack} />
    <Drawer.Screen name="Help Me!" component={HelpMeStack} />
    <Drawer.Screen name="Let Me Go!" component={LetGoStack} />
    <Drawer.Screen name="Fin My Place!" component={FindMyPlaceStack} />
    <Drawer.Screen name="Scan QRcode" component={QRcodeStack} />
    <Drawer.Screen name="Chat Room" component={ChatStack} />
    <Drawer.Screen name="Keep Me Safe!" component={KeepMeSafeStack} />
    <Drawer.Screen name="Hear Me!" component={NoTouchStack} /> */}
    {/* <Drawer.Screen name="Profile" component={StackUser} /> */}
  </Drawer.Navigator>
);

export const Navigator = () => {
  return (
    <Stack.Navigator name="main">
      <Stack.Screen
        options={{headerShown: false}}
        name="Logging In"
        component={StartupScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#4e9c8d',
          },
          headerTintColor: '#fff',
        }}
        name="Signin"
        component={AuthScreen}
      />
      <Stack.Screen
        name="Logged In"
        options={{headerShown: false}}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};
