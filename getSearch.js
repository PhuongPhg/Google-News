import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {  StyleSheet, View, LogBox, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
import News from './getNews';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import DetailSearch from "./search"
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
// `https://newsapi.org/v2/everything?q=${search}&apiKey=b79f085de40249e28b6c0f3f0d1c7ebd&page=${pageNumber}`
export default function Searches(){
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="DetailSearch" component={DetailSearch} />
    </Stack.Navigator>
  )
}
function Search({navigation}){
  const [key,setKey]= useState('');

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    // style={styles.container}
    >
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Search..."
        onChangeText={text => setKey(text)}
        defaultValue={key}
        autoFocus={false}
      />
      <TouchableOpacity style={styles.buttonSubmit} 
        onPress={() => {
          navigation.navigate("DetailSearch", key)
          console.log(key);
          setKey('')}}
      >
        <Text style={{color: 'white', fontWeight: 'bold',}}>Search</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: Constants.statusBarHeight,
    
  },
  buttonSubmit:{
    height: 50,
    // width: '20%',
    backgroundColor: '#d57149',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 40,
  },
  textInputStyle: {
    height: 40, 
    fontSize: 18, 
    width: '90%', 
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderColor: '#d57149',
    borderWidth: 1, 
    borderRadius: 10,
  }
});