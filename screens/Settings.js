import React, {Component} from 'react';
import {StyleSheet, WebView, TouchableOpacity, View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Settings extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{`Support\n Development`}</Text>
                <Icon name='heart' size={20} color='red' style={{marginVertical: 15}}/>
                <TouchableOpacity style={styles.donateButton} onPress={() => navigation.push('Donate')}>
                    <Image source={require('../assets/images/paypal-button.png')} style={{width: 200, height: 67}}/>
                </TouchableOpacity>
            </View>
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
        fontFamily: 'GoogleSans-Medium',
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 50,
    }
}); 
