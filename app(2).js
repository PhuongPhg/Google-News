import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {  LogBox, Text } from 'react-native';
// import News from './getNews';
import Published from './getPublished';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from "@expo/vector-icons";

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
      <Tab.Screen name="Search" component={News}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
}
function News(){
  return <Text> news</Text>
}