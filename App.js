import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import TabsScreen from './screens/Tabs'
import DetailsScreen from './screens/Details'
import SearchScreen from './screens/Search'
import SearchResultsScreen from './screens/SearchResults'

export default class App extends React.Component {

    render() {
        return (
            <HomeStack />
        );
    }
}

const HomeStack = createStackNavigator({
    Tabs: { screen: TabsScreen },
    Details: { screen: DetailsScreen },
    Search: { screen: SearchScreen},
    SearchResults: { screen: SearchResultsScreen}
}, {
    navigationOptions: {
        gesturesEnabled: true,
    },
});