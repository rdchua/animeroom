import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, FlatList, ImageBackground, ActivityIndicator, ScrollView, StatusBar, Image} from 'react-native';
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
                <View style={{flex: 1, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#ccc" />
                </View>
            );
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor='transparent' barStyle='light-content' translucent={true}/>
                <ImageBackground source={{uri: this.state.spotlight.attributes.posterImage.large}} style={styles.spotlight}>
                    <LinearGradient colors={['transparent', 'rgba(20,20,20,.6)', 'rgb(20,20,20)']} style={styles.overlay}>
                        <Text style={styles.spotlightTitle}>{this.state.spotlight.attributes.canonicalTitle}</Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.mainContainer}>
                    <Text style={styles.header}>Trending Anime</Text>
                    <FlatList
                        style={{marginTop: 5}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={300}
                        keyExtractor={(item, index) => item.id.toString()}
                        data={this.state.trendingAnime}
                        renderItem={({item, separators}) => (
                            <View style={styles.item}>
                                <Image source={{uri: item.attributes.posterImage.small}} style={styles.image}/>
                            </View>
                        )}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    mainContainer: {
        padding: 20,
        marginTop: -50,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    spotlight: {
        width: windowWidth,
        height: windowHeight - 200,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: windowWidth,
        height: '30%'
    },
    header: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15
    }, 
    item: {
        marginRight: 10,
    },
    image: {
        width: 125,
        height: 170
    },
    spotlightTitle: {
        fontSize: 24,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});
