import React, {PureComponent, Component} from 'react';
import { StyleSheet, TouchableOpacity, ToastAndroid, View, Image} from 'react-native';
import StarRating from 'react-native-star-rating';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/StreamersIcons/config.json';
const StreamIcons = createIconSetFromFontello(fontelloConfig);

export default class StreamerCard extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            isActive: false,
            backgroundColor: '#212121',
            iconColor: this.props.iconColor,
        }
    }

    _handleOnPress() {
        const streamer = this.props.iconName;
        if(this.state.isActive){
            this.props.updateLink('streamers', this.props.iconName, 0);
            this.setState({
                iconColor: this.props.iconColor,
                backgroundColor: '#212121',
                isActive: false,
            })
        } else {
            this.props.updateLink('streamers', this.props.iconName, 1);
            ToastAndroid.showWithGravityAndOffset(
                this.props.iconName,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                50
              );
            this.setState({ backgroundColor: '#fff', isActive: true })
            switch(streamer){
                case 'netflix':
                    this.setState({ iconColor: '#db0000' });
                    break;
                case 'hulu':
                    this.setState({ iconColor: '#63B34C' });
                    break;
                case 'funimation':
                    this.setState({ iconColor: '#372290' });
                    break;
                case 'crunchyroll':
                    this.setState({ iconColor: '#EC8E38' });
                    break;
                case 'amazon-alt':
                    this.setState({ iconColor: '#F6A631' });
                    break;
                case 'daisuki':
                    this.setState({ iconColor: '#000' });
                    break;
                case 'hidive':
                    this.setState({ iconColor: '#3FABED' });
                    break;
                case 'tubitv':
                    this.setState({ iconColor: '#ED482B' });
                    break;
                case 'amazon':
                    this.setState({ iconColor: '#F6A631' });
                    break;
                case 'youtube':
                    this.setState({ iconColor: '#ED3B18' });
                    break;
            }
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.item, {backgroundColor: this.state.backgroundColor }]} onPress={() => this._handleOnPress()}>
                <StreamIcons style={styles.icon} name={this.props.iconName} size={this.props.iconSize} color={this.state.iconColor}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: 55,
        height: 55,
        elevation: 6,
        borderRadius: 6,
        // backgroundColor: '#212121',
        justifyContent: 'center',
        marginRight: 10,
        marginTop: 10,
    },
    icon: {
        alignSelf: 'center'
    }
});
