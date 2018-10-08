import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, Alert, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity, FlatList, TextInput} from 'react-native';
import GridView from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Kitsu from '../Kitsu';
import AnimeCard from '../components/AnimeCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class SearchResults extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => {
            return (
                <Text style={styles.header}>{navigation.getParam('query')}</Text>
            )
        },
        headerStyle: {
            backgroundColor: '#212121'
        },
        headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            color: 'white',
            fontWeight: '1000',
            alignSelf: 'center',
            textAlign: 'center',
            width: '100%'
        },
        headerTintColor: '#fff',
    })

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            isLoadingMore: false,
            isSearching: true,
            searchResults: [],
            nextPage: ''
        }
    }

    _handleLoadMore = () => {
        if(this.state.nextPage != 'end'){
            this.setState({ isLoadingMore: true })
            Kitsu.advancedSearchAnime(this.state.nextPage)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoadingMore: false, 
                    searchResults: [...this.state.searchResults, ...json.data],
                    nextPage: json.links.next ? json.links.next : 'end',
                })
            })
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        Kitsu.advancedSearchAnime(navigation.getParam('url', ''))
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoading: false, 
                    searchResults: json.data,
                    nextPage: json.links.next ? json.links.next : 'end'
                })
            })
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" color="#ccc" />
                </View>
            );
        }
        return (
            !this.state.searchResults.length == 0 ? 
            <View style={styles.container}>
                <StatusBar backgroundColor='#212121' barStyle='light-content'/>
                    <ScrollView>
                        <GridView
                            onEndReached={this._handleLoadMore}
                            itemDimension={100}
                            items={this.state.searchResults}
                            renderItem={item => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {anime: item})}>
                                    <AnimeCard data={item} customStyle={styles.customStyle}/>
                                </TouchableOpacity>
                            )}/>
                        {
                            this.state.isLoadingMore ? 
                            <ActivityIndicator size="large" color="#ccc" /> : null
                        }
                </ScrollView>
            </View> :
            <View style={styles.noResultsContainer}>
                <Icon name='sad-cry' size={65} color='#54D2FA'/>
                <Text style={styles.noResultsText}>No results found</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'GoogleSans-Bold',
        letterSpacing: 0.5,
        color: 'white',
        fontSize: 20
    }, 
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    customStyle: {
        marginTop: 0, 
        // justifyContent: 'flex-end',
    },
    loadingView: {
        height: windowHeight, 
        backgroundColor: '#141414', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    noResultsContainer: {
        flex: 1,
        backgroundColor: '#141414',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noResultsText: {
        marginTop: 10,
        fontFamily: 'GoogleSans-Medium',
        fontSize: 16,
        color: 'gray',
        letterSpacing: 0.5
    }
}); 
