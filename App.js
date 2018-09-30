import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import * as kitsu from './Kitsu'

export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            trendingAnime : []
        }
    }

    componentDidMount() {
        fetch(kitsu.trendingAnime)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ trendingAnime: responseJson.data })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if(this.state.trendingAnime.length == 0) {
            return null
        }
        return (
            <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={300}
                keyExtractor={(item, index) => item.id.toString()}
                data={this.state.trendingAnime}
                renderItem={({item, separators}) => (
                    <Text>{item.id}</Text>
                )}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
