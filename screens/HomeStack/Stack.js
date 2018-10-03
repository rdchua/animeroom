import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, FlatList, ImageBackground, ActivityIndicator, ScrollView, StatusBar, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../HomeStack/Home'
import DetailsScreen from '../Details'

export default RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
