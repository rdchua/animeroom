import React, {PureComponent, Component} from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, Image} from 'react-native';

export default class StreamerCard extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            isActive: false,
            backgroundColor: '#212121',
            color: this.props.color
        }
    }

    _handleOnPress() {
        if(this.state.isActive) { //set inactive state
            this.props.updateLink(this.props.filterType, this.props.text, 0);
            this.setState({ 
                isActive: false,
                color: this.props.color,
                backgroundColor: '#212121', 
            })
        } else { //set active state
            this.props.updateLink(this.props.filterType, this.props.text, 1);
            this.setState({
                isActive: true, 
                color: '#000',
                backgroundColor: '#fff', 
            })
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.item, { backgroundColor: this.state.backgroundColor }]} onPress={() => this._handleOnPress()}>
                <Text style={[styles.text, {color: this.state.color }]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        marginRight: 10,
        marginTop: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        elevation: 6,
        borderRadius: 6,
        // backgroundColor: '#212121',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'GoogleSans-Bold',
        letterSpacing: 0.5,
        alignSelf: 'center'
    }
});
