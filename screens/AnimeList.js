import React, {Component} from 'react';
import {StyleSheet, Dimensions, Alert, View, FlatList, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Storage from 'react-native-simple-store';
import ListCard from '../components/ListCard';

export default class AnimeList extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            animeList: []
        }
    }

    componentDidMount() {
        if(this.props.tabLabel == 'Anime') {
            Storage.get('animeList')
                .then((list) => {
                    this.setState({ 
                        animeList: list,
                        isLoading: false,
                    })
                })
        } else {
            Storage.get('mangaList')
                .then((list) => {
                    this.setState({ 
                        animeList: list,
                        isLoading: false,
                    })
                })
        }
    }

    updateList = (newList) => {
        this.setState({ animeList: newList })
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style={{flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#ccc" />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#212121' barStyle='light-content'/>
                <FlatList
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={300}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.state.animeList}
                    renderItem={({item, separators}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {anime: item})}>
                            <ListCard data={item} updateList={this.updateList} customStyle={{marginTop: 10}}/>
                        </TouchableOpacity>
                    )}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#111',
    },
    mainContainer: {
        padding: 20,
    },
    header: {
        fontFamily: 'GoogleSans-Bold',
        letterSpacing: 0.5,
        color: 'white',
        fontSize: 16
    }, 
    subheader: {
        fontFamily: 'GoogleSans-Regular',
        letterSpacing: 0.5,
        color: '#bbb',
        fontSize: 14
    }
});
