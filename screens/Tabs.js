import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import {StyleSheet, Dimensions, Text, Alert, FlatList, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './HomeStack/Home'
import MangaScreen from './HomeStack/Manga'
import AnimeListScreen from './AnimeList'
import UsersScreen from './Users'
import ListTabsScreen from './ListTabs'
import SettingsScreen from './Settings'

export default class Tabs extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            elevation: 6
        }
    }

    static navigationOptions = ({ navigation, navigationOptions }) => ({
            headerTitle: () => {
                return (
                    <Text style={styles.header} numberOfLines={2}>Okami Anime and Manga</Text>
                )
            },
            headerStyle: {
                elevation: 0,
                backgroundColor: '#212121'
            },
            headerTitleStyle: {
                fontFamily: 'GoogleSans-Medium',
                color: 'white',
                fontWeight: '1000',
            },
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Icon name="search" size={20} color="#aaa" style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
            ),
    })

    render() {
        return (
            <ScrollableTabView 
                tabBarPosition='bottom'
                tabBarBackgroundColor='#0a0a0a'
                tabBarActiveTextColor='#54D2FA'
                tabBarInactiveTextColor='gray'
                tabBarTextStyle={[styles.tabText, {fontWeight: '1000'}]}
                tabBarUnderlineStyle={styles.tabUnderline}
                renderTabBar={() => <ScrollableTabBar
                    textStyle={styles.tabText}
                    activeBackgroundColor="#ffffff"/>}>
                <HomeScreen 
                    navigation={this.props.navigation} //! the navigation passed here is from the root stack navigation
                    tabLabel='Anime'/>
                <MangaScreen
                    navigation={this.props.navigation} 
                    tabLabel='Manga'/>
                <ListTabsScreen
                    navigation={this.props.navigation} 
                    tabLabel='List'/>
                <SettingsScreen 
                    navigation={this.props.navigation}
                    tabLabel='Settings'/>
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
        fontSize: 12,
        marginTop: 3, 
        fontFamily: 'GoogleSans-Medium', 
    },
    tabUnderline: {
        borderWidth: 0,
        backgroundColor: 'transparent'
    }
});