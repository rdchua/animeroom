import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, FlatList, ImageBackground, ActivityIndicator, ScrollView, StatusBar} from 'react-native';
import * as Kitsu from './Kitsu'
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            trendingAnime : [],
            spotlight: {}
        }
    }

    componentDidMount() {
        Kitsu.getTrendingAnime()
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    spotlight: json.data[0],
                    trendingAnime: json.data,
                    isLoading: false
                })
            })
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#ccc" />
                </View>
            );
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor='transparent' barStyle='light-content' translucent={true}/>
                <ImageBackground source={{uri: this.state.spotlight.attributes.posterImage.large}} style={styles.spotlight}>
                    <LinearGradient colors={['transparent', 'rgba(14,14,14,0.65)', 'rgba(14,14,14,0.95)']} style={styles.overlay}>
                    </LinearGradient>
                </ImageBackground>
                <Text style={styles.header}>Trending Anime</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={300}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.state.trendingAnime}
                    renderItem={({item, separators}) => (
                        <Text>{item.id}</Text>
                )}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    spotlight: {
        width: windowWidth,
        height: windowHeight - 100,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: windowWidth,
        height: '25%'
    },
    header: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14
    }
});
