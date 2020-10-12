import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {  StyleSheet, View, LogBox, Text, TextInput, TouchableOpacity } from 'react-native';
import News from './getNews';
import Published from './getPublished';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from "@expo/vector-icons";
import singlePub from './totalPublished';
import { SearchBar } from 'react-native-elements';
import Constants from "expo-constants";
import Searches from './getSearch';

const Tab = createBottomTabNavigator();

const routeIcon = {
  News: "news",
  Published: "publish",
  Search: "compass",
};


export default function App(){
  return (
    <NavigationContainer initialRouteName="News">
    <Tab.Navigator 
    screenOptions={({route})=>({
      tabBarIcon: ({focused}) => (
        <Entypo
        name={routeIcon[route.name]}
        size={24}
        color={focused ? "#aa4a30":"grey"}/>
      ),
    })}
    tabBarOptions={{
      activeTintColor: '#aa4a30',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="News" component={News}/>
      <Tab.Screen name="Published" component={Published}/>
      <Tab.Screen name="Search" component={Searches}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  buttonSubmit:{
    height: 50,
    width: '50%',
    backgroundColor: '#d57149',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 40,
  },
});