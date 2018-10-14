import React, {Component} from 'react';
import {StyleSheet, WebView, TouchableOpacity, View, Image, Text} from 'react-native';

export default class Donate extends React.Component {

    static navigationOptions = {
        headerTintColor: '#000',
        headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            fontWeight: '1000',
        },
    }

    render() {
        return (
            <WebView
                source={{uri: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3GQC564269GG8'}}
                onc
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414'
    },
    text: {
        marginVertical: 25,
        fontFamily: 'GoogleSans-Medium',
        color: 'white',
        fontSize: 22
    }
}); 
