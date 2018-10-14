import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, FlatList, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Storage from 'react-native-simple-store';
import ListCard from '../components/ListCard';
import * as Kitsu from '../Kitsu';
import UserCard from '../components/UserCard'

export default class Users extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            users: []
        }
    }

    componentDidMount() {
        Kitsu.getUsers()
            .then((response) => response.json())
            .then((json) => {
                this.setState({ 
                    users: json.data,
                    isLoading: false
                })
            })
    }

    updateList = (newList) => {
        this.setState({ animeList: newList })
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
            <View style={styles.container}>
                <StatusBar backgroundColor='#212121' barStyle='light-content'/>
                <FlatList
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={300}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.state.users}
                    renderItem={({item, separators}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Users', {user: item})}>
                            <UserCard data={item}/>
                        </TouchableOpacity>
                    )}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
