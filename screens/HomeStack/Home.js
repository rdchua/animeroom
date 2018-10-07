import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, FlatList, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Kitsu from '../../Kitsu';
import AnimeCard from '../../components/AnimeCard';

export default class Details extends React.Component {

    static navigationOptions = {
        title: (<Text>AniRoom</Text>),
        headerStyle: {
            backgroundColor: '#212121'
        },
        headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            fontWeight: '1000',
            alignSelf: 'center',
            textAlign: 'center',
            paddingLeft: 20,
            width: '100%'
        },
        headerRight: (
            <TouchableOpacity>
                <Icon name="search" size={20} color="#aaa" style={{paddingRight: 20}} />
            </TouchableOpacity>
        ),
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            trendingAnime : [],
            topAiringAnime: [],
            topUpcomingAnime: [],
            mostPopularAnime: [],
        }
    }

    componentDidMount() {
        Kitsu.getTrendingAnime()
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    trendingAnime: json.data,
                    isLoading: false
                })
            })
        Kitsu.getTopAiringAnime()
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    topAiringAnime: json.data
                })
            })
        Kitsu.getTopUpcomingAnime()
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    topUpcomingAnime: json.data
                })
            })
        Kitsu.getMostPopularAnime()
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    mostPopularAnime: json.data
                })
            })
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style={{flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#ccc" />
                </View>
            );
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor='#212121' barStyle='light-content'/>
                <ScrollView>
                    <View style={styles.mainContainer}>
                        <Text style={styles.header}>Trending Anime</Text>
                        <Text style={styles.subheader}>Most watched right now.</Text>
                        <FlatList
                            style={{marginTop: 10, marginHorizontal: -20, paddingLeft: 20, paddingRight: -20}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={300}
                            keyExtractor={(item, index) => item.id.toString()}
                            data={this.state.trendingAnime}
                            renderItem={({item, separators}) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {anime: item})}>
                                    <AnimeCard data={item}/>
                                </TouchableOpacity>
                            )}/>
                        <Text style={[styles.header, {marginTop: 25}]}>Top Airing Anime</Text>
                        <Text style={styles.subheader}>Hottest on-going shows.</Text>
                        <FlatList
                            style={{marginTop: 10, marginHorizontal: -20, paddingLeft: 20, paddingRight: -20}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={300}
                            keyExtractor={(item, index) => item.id.toString()}
                            data={this.state.topAiringAnime}
                            renderItem={({item, separators}) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {anime: item})}>
                                    <AnimeCard data={item}/>
                                </TouchableOpacity>
                            )}/>
                        <Text style={[styles.header, {marginTop: 25}]}>Upcoming Anime</Text>
                        <Text style={styles.subheader}>Shows to watch out for.</Text>
                        <FlatList
                            style={{marginTop: 10, marginHorizontal: -20, paddingLeft: 20, paddingRight: -20}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={300}
                            keyExtractor={(item, index) => item.id.toString()}
                            data={this.state.topUpcomingAnime}
                            renderItem={({item, separators}) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {anime: item})}>
                                    <AnimeCard data={item}/>
                                </TouchableOpacity>
                            )}/>
                        <Text style={[styles.header, {marginTop: 25}]}>Most Popular Anime</Text>
                        <FlatList
                            style={{marginTop: 10, marginHorizontal: -20, paddingLeft: 20, paddingRight: -20}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={300}
                            keyExtractor={(item, index) => item.id.toString()}
                            data={this.state.mostPopularAnime}
                            renderItem={({item, separators}) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {anime: item})}>
                                    <AnimeCard data={item}/>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    mainContainer: {
        padding: 20,
    },
    header: {
        fontFamily: 'GoogleSans-Bold',
        letterSpacing: 0.5,
        color: 'white',
        fontSize: 16
    }, 
    subheader: {
        fontFamily: 'GoogleSans-Regular',
        letterSpacing: 0.5,
        color: '#bbb',
        fontSize: 14
    }
});
