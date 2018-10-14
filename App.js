import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import TabsScreen from './screens/Tabs'
import DetailsScreen from './screens/Details'
import SearchScreen from './screens/Search'
import SearchResultsScreen from './screens/SearchResults'
import MangaSearchScreen from './screens/SearchManga'
import DonateScreen from './screens/Donate'

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
    MangaSearch: { screen: MangaSearchScreen},
    SearchResults: { screen: SearchResultsScreen},
    Donate: {screen: DonateScreen}
}, {
    navigationOptions: {
        gesturesEnabled: true,
    },
});