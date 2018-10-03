import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import TabsScreen from './screens/Tabs'
import DetailsScreen from './screens/Details'

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
}, {
    navigationOptions: {
        gesturesEnabled: true,
    },
});