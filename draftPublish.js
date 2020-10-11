import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, FlatList, Linking, LogBox } from 'react-native';
import {Card} from 'react-native-elements';
import Constants from "expo-constants";
import moment from 'moment';
import {Icon} from 'react-native-elements';

const filterForUniqueSources = (arr) =>{
  const cleaned = [];
  arr.forEach(itm=>{
    let unique = true;
    cleaned.forEach(itm2 =>{
      const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
      if(isEqual) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
}

export default function Published(){
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState([]);
  const [hasErrored, setHasApiError] = useState(false);
  

  const getPublished = async () =>{
    try{
      const response = await fetch(`https://newsapi.org/v2/sources?apiKey=b79f085de40249e28b6c0f3f0d1c7ebd`);
      const jsonData = await response.json();
      // console.log('jsonData', jsonData.sources.length);
      const hasMoreSources = jsonData.sources.length > 0;
      if(hasMoreSources){
        const newSourcesList = filterForUniqueSources (
        sources.concat(jsonData.sources)
      )
      setSources(newSourcesList);
      // console.log(newSourcesList);
      }
    } catch (error){
      setHasApiError(true);
    }
    setLoading(false); 
  }

  useEffect(() => {
    getPublished();
  }, [sources]);

  if(loading) {
    return(
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
  if(hasErrored) {
    return (
      <View style={styles.container}>
        <Text>Error =( </Text>
      </View>
    )
  }

  const renderSourcesItem=({item}) =>{
    return(
      <Card>
        <View style={styles.row}>
          <Text style={styles.info}>Name: </Text>
          <Text style={styles.label}>{item.name}</Text>
        </View>
        <Text style={{marginBottom: 10}}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.info}>Category: </Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        {/* <View style={styles.row}>
          <Text style={styles.label}>Published:</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View> */}
        <Button icon={<Icon />} title="Read more"
        color="#aa4a30"
        backgroundColor = "#aa4a30" 
        onPress={() => onPress(item.url)}
        />
      </Card>
    );
  };
  const onPress=url =>{
    Linking.canOpenURL(url).then(supported => {
      if(supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    })
  }


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Published Count:</Text>
        <Text style={styles.info}>{sources.length}</Text>
      </View>
      <FlatList data={sources}
       renderItem={renderSourcesItem} 
       keyExtractor={item => item.id}
       onEndReached={getPublished} onEndReachedThreshold={1} 
      //  ListFooterComponent={
      //    lastPageReached ? 
      //    <View >
      //       <Text style={styles.noMore}>No more Articles</Text>
      //       <Entypo name="emoji-sad" size={24} color="black" style={{textAlign: 'center', marginBottom: 10}} />
      //    </View>
      //     : <ActivityIndicator size="large" loading ={loading} />}
      />  
    </View>
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
    containerFlex: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header: {
      height: 30,
      width: '100%',
      backgroundColor: 'pink'
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    label: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold'
    },
    info: {
      fontSize: 16,
      color: 'grey'
    },
    noMore: {
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 5,
      marginTop: 10,
      fontSize: 20
    },
    category: {
      backgroundColor: 'grey',
      marginLeft: 5,
      color: 'white',
      borderRadius: 10,
      paddingLeft: 5,
      paddingRight: 5,
    }
});