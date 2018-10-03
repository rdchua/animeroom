import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, FlatList, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Kitsu from '../Kitsu';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Details extends React.Component {

    static navigationOptions = {
        title: 'Details',
        headerStyle: {
            backgroundColor: '#212121'
        },
        headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            fontWeight: '1000',
            alignSelf: 'center',
            textAlign: 'center',
            width: '100%'
        },
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            trendingAnime : [],
            topAiringAnime: [],
            topUpcomingAnime: [],
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
