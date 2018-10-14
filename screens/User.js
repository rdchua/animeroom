import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, Image, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity, FlatList, ToastAndroid, Alert, Modal, Share, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import Storage from 'react-native-simple-store';
import * as Kitsu from '../Kitsu';
import moment from 'moment'
import AnimeCard from '../components/AnimeCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class User extends React.Component {

    static navigationOptions = {
        headerTransparent: true,
        headerTintColor: '#fff',
        headerStyle: {
            paddingTop: 24
        },
        headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            fontWeight: '1000',
        },
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            favorites: [],
        }
    }

    componentDidMount() {
        const user = this.props.navigation.getParam('user', {});
        Kitsu.getUserFavorites(user.relationships.library)
            .then((response) => response.json())
            .then((json) => {
            })
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const { navigation } = this.props;
        const user = navigation.getParam('user', {});
        if(this.state.isLoading) {
            return(
                <View style={{flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#ccc" />
                </View>
            );
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor='#rgba(0,0,0,0)' barStyle='light-content' translucent={true}/>
    
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 25,
        backgroundColor: '#111',
    },
    row: {
        flexDirection: 'row'
    },
}); 
