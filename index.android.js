/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native';
import CustomButton from "./CustomButton";
/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */

// bien nay lay du lieu hien thi tu mot file json
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

//bien nay cu roi khong dung nua
/**var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
*/

export default class HelloWorld2 extends Component {
  constructor (props){
    super (props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1,row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  // lifecycle len man hinh
  componentDidMount() {
    // cau lenh nay de thuc hien viec lay du lieu
    this.fetchData();
  }

//ham nay thuc hien viec lay du lieu tu url phia tren
  fetchData() {
    fetch(REQUEST_URL)
      .then((response)=> response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          // lay du lieu xong thi gan vao cai dataSource
          // sau do thi loaded = true
          loaded: true,
        });
      })
      .done();
  }

  render() {
    // vua mo app len thi bien loaded == false
    // nen ham se chay cai renderLoadingView de hien thi thong bao ban dau
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }

    // sau khi da load xong du lieu thi loaded == true
    // ham se hien thi ra danh sach cac film
    return(
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderMovie}
          style = {styles.listView}
        />
    )
  }
//ham nay hien thi thong bao tai phim
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text> Doi chut nha cung.</Text>
        <Text> Dang tai phim ve ... </Text>
      </View>
      );
    }

  // ham nay quy dinh viec hien thi thong tin film tren man hinh
  // chuc nang cua ham la render 1 movie len man hinh
  // phai truyen bien 'movie' vao cho ham
  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  rightContainer: {
    flex : 1,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  thumbnail: {
    width: 53,
    height: 81,
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign:  'center',
  },

  year: {
    textAlign: 'center',
  },

  listView: {
    paddingTop: 20,
    backgroundColor: 'pink',
  },
});

AppRegistry.registerComponent('HelloWorld2', () => HelloWorld2);
