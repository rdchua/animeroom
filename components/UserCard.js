import React, {PureComponent, Component} from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import StarRating from 'react-native-star-rating';
import Storage from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class AnimeCard extends PureComponent {

    constructor(props){
        super(props)
    }

    render() {
        const user = this.props.data;
        return (
            <View style={styles.item}>
                <Image resizeMode='cover' resizeMethod='resize' source={{uri: user.attributes.avatar ? user.attributes.avatar.medium : 'https://dummyimage.com/50x50/414141.jpg?text=-'}} style={styles.image}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.name}>{user.attributes.name}</Text>
                    <Text style={styles.location}>{moment(user.attributes.createdAt).fromNow()}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        marginTop: 15,
        flexDirection: 'row'
    },
    rightContainer: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    name: {
        color: 'white',
        fontFamily: 'GoogleSans-Regular',
        letterSpacing: 0.5,
        fontSize: 16
    },
    location: {
        color: 'gray',
        fontSize: 12
    }
});
