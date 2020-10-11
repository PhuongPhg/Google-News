import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, FlatList, Linking, LogBox } from 'react-native';
import {Card} from 'react-native-elements';
import Constants from "expo-constants";
import moment from 'moment';
import {Icon} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
// // b79f085de40249e28b6c0f3f0d1c7ebd
// LogBox.ignoreLogs(["'Card.title' prop has been deprecated and will be removed in the next version."]);
// LogBox.ignoreLogs(["'Card.image' prop has been deprecated and will be removed in the next version."]);

const filterForUniqueArticles = (arr) =>{
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

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const [ search, setSearch] = useState('');

  const getNews = async () => {
    if (lastPageReached) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=b79f085de40249e28b6c0f3f0d1c7ebd&page=${pageNumber}`
      )
      const jsonData = await response.json();
      const hasMoreAricles = jsonData.articles.length > 0;
      if(hasMoreAricles){
        const newArticleList = filterForUniqueArticles(
          articles.concat(jsonData.articles)
        );
        setArticles(newArticleList);
        setPageNumber(pageNumber+1);
      } else {
        setLastPageReached(true);
      }
      console.log('jsonData', jsonData);
    } catch (error){
      setHasApiError(true);
    }
    setLoading(false);
    // console.log('jsonData', jsonData);
    
  };
  // only check the articles piece of state, not loading more 
  

//   if(loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" loading={loading} />
//       </View>
//     );
//   }
  if(hasErrored) {
    return (
      <View style={styles.container}>
        <Text>Error =( </Text>
      </View>
    )
  }
  const renderArticleItem=({item}) =>{
    return(
      <Card title={item.title} image={{uri: item.urlToImage}}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={{marginBottom: 10}}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published:</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more"
        color="#aa4a30"
        // backgroundColor = "#aa4a30" 
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
  
  const updateSearch = (search) => {
      setSearch({search});
      useEffect(() =>{
        getNews(search);
      }, [articles]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <SearchBar
        placeholder="Search here..."
        onChangeText={text => updateSearch(text)}
        value={search} />
      </View>
      <FlatList data={articles}
       renderItem={renderArticleItem} 
       keyExtractor={item => item.title}
       onEndReached={getNews} onEndReachedThreshold={1} 
       ListFooterComponent={
         lastPageReached ? 
         <View >
            <Text style={styles.noMore}>No more Articles</Text>
            <Entypo name="emoji-sad" size={24} color="black" style={{textAlign: 'center', marginBottom: 10}} />
         </View>
          : <ActivityIndicator size="large" loading ={loading} />}
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
    flexDirection: 'row'
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
  }
});
