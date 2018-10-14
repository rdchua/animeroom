import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {StyleSheet, Dimensions, Text, View, FlatList, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import ScrollableTabView, {ListTabBar} from 'react-native-scrollable-tab-view';

import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './HomeStack/Home'
import MangaScreen from './HomeStack/Manga'
import AnimeListScreen from './AnimeList'
import UsersScreen from './Users'

export default class ListTabs extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => {
            return (
                <Text style={styles.header} numberOfLines={2}>Okami Anime and Manga</Text>
            )
          },
        headerStyle: {
            backgroundColor: '#212121'
        },
        headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            color: 'white',
            fontWeight: '1000',
        },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Icon name="bars" size={20} color="#aaa" style={{paddingLeft: 20}} />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Icon name="search" size={20} color="#aaa" style={{paddingRight: 20}} />
            </TouchableOpacity>
        ),
    })

    render() {
        return (
            <ScrollableTabView 
                tabBarPosition='top'
                tabBarBackgroundColor='#212121'
                tabBarActiveTextColor='#fff'
                tabBarInactiveTextColor='gray'
                tabBarTextStyle={[styles.tabText, {fontWeight: '1000'}]}
                tabBarUnderlineStyle={styles.tabUnderline}
                renderTabBar={() => <ListTabBar
                    textStyle={styles.tabText}
                    activeBackgroundColor="#ffffff"/>}>
                <AnimeListScreen 
                    navigation={this.props.navigation} //! the navigation passed here is from the root stack navigation
                    tabLabel='Anime'/>
                <AnimeListScreen
                    navigation={this.props.navigation} 
                    tabLabel='Manga'/>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontFamily: 'GoogleSans-Medium',
        color: 'white',
    },
    tabText: {
        fontSize: 16,
        marginTop: 3, 
        fontFamily: 'GoogleSans-Medium', 
    },
    tabUnderline: {
        borderWidth: 1,
        backgroundColor: '#54D2FA'
    }
});