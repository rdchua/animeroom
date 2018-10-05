import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, Image, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity, FlatList, Alert, WebView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import * as Kitsu from '../Kitsu';
import AnimeCard from '../components/AnimeCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Details extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        // title: navigation.state.params.anime.attributes.canonicalTitle,
        headerTransparent: true,
        headerTintColor: '#fff',
        headerStyle: {
            paddingTop: 24
        },
        headerTitleStyle: {
            fontFamily: 'GoogleSans-Medium',
            fontWeight: '1000',
        },
    })

    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            genres: [],
            similarAnime: []
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const anime = navigation.getParam('anime', {});
        Kitsu.getAnimeGenres(anime.id)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoading: false,
                    genres: json.data
                }, () => {
                    Kitsu.getSimilarAnime(this.state.genres)
                        .then((response) => response.json())
                        .then((json) => {
                            this.setState({ similarAnime: json.data })
                        })
                })
            })
        Kitsu.getCharactersFromAnime(anime.id)
            .then((response) => response.json())
            .then((json) => {
                let characters = []
                for(let i = 0; i < json.data.length; i++) {
                    Kitsu.getAnimeCharacter(json.data[i].id)
                        .then((response) => response.json())
                        .then((character) => {
                            characters.push(json.data);
                        })
                }
            })
    }

    render() {
        const { navigation } = this.props;
        const anime = navigation.getParam('anime', {});
        if(this.state.isLoading) {
            return(
                <View style={{flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#ccc" />
                </View>
            );
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor='#rgba(0,0,0,0)' barStyle='light-content' translucent={true}/>
                <View style={styles.imageContainer} >
                    <View style={styles.background} >
                        <Image source={{uri: anime.attributes.posterImage.original}} style={styles.image}/>
                    </View>
                </View>
                <TouchableOpacity style={styles.circleButtonContainer}>
                    <Icon name="play" size={20} color="#fff" style={styles.buttonIcon} />
                </TouchableOpacity>
                <Text style={styles.animeName}>{anime.attributes.canonicalTitle}</Text>
                <FlatList
                    style={styles.genreList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={300}
                    keyExtractor={(item, index) => item.id.toString()}
                    data={this.state.genres}
                    renderItem={({item, index}) => (
                        <TouchableOpacity>
                            <Text style={styles.genre}>{item.attributes.name}</Text>
                        </TouchableOpacity>
                    )}/>
                <View style={styles.starContainer}>
                    <StarRating
                        maxStars={5}
                        rating={anime.attributes.averageRating / 20}
                        starSize={18}
                        disabled={true}
                        fullStar={'star'}
                        fullStarColor={'#54D2FA'}/>
                </View>
                <View style={[styles.row, styles.inforow]}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeader}>Type</Text>
                        <Text style={styles.infoSubheader}>{anime.attributes.showType}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeader}>Status</Text>
                        <Text style={styles.infoSubheader}>{anime.attributes.status}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeader}>Rating</Text>
                        <Text style={styles.infoSubheader}>{anime.attributes.averageRating}</Text>
                    </View>
                </View>
                <View style={{paddingLeft: 25, paddingRight: 10}}>
                    <Text numberOfLines={6} style={styles.synopsis}>{anime.attributes.synopsis}</Text>
                    <Text style={[styles.header, {marginTop: 15}]}>Trending Anime</Text>
                    <FlatList
                        style={{marginTop: 10, marginHorizontal: -20, paddingLeft: 20, paddingRight: -20}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={300}
                        keyExtractor={(item, index) => item.id.toString()}
                        data={this.state.similarAnime}
                        renderItem={({item, separators}) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {anime: item})}>
                                <AnimeCard data={item}/>
                            </TouchableOpacity>)}/>
                    <Text style={[styles.header, {marginTop: 30}]}>More Information</Text>
                    <Text style={styles.moreHeader}>Age Rating</Text>
                    <Text style={styles.moreText}>{anime.attributes.ageRatingGuide ? anime.attributes.ageRatingGuide : 'N/A'}</Text>
                    <Text style={styles.moreHeader}>Start Date</Text>
                    <Text style={styles.moreText}>{anime.attributes.startDate ? anime.attributes.startDate : 'N/A'}</Text>
                    <Text style={styles.moreHeader}>End Date</Text>
                    <Text style={styles.moreText}>{anime.attributes.endDate ? anime.attributes.endDate : 'N/A'}</Text>
                    <Text style={styles.moreHeader}>Next Release</Text>
                    <Text style={styles.moreText}>{anime.attributes.nextRelease ? anime.attributes.nextRelease : 'N/A'}</Text>
                    <Text style={styles.moreHeader}>Episodes</Text>
                    <Text style={styles.moreText}>{anime.attributes.episodes ? anime.attributes.episodes : 'N/A'}</Text>
                    <Text style={styles.moreHeader}>Length per episode</Text>
                    <Text style={styles.moreText}>{anime.attributes.episodeLength ? anime.attributes.episodeLength : 'N/A'}</Text>
                    <Text style={styles.moreHeader}>NSFW</Text>
                    <Text style={styles.moreText}>{anime.attributes.nsfw ? anime.attributes.nsfw : 'N/A'}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 25,
        backgroundColor: '#111',
    },
    row: {
        flexDirection: 'row'
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
    },
    poster: {
        width: windowWidth, 
        height: windowHeight - 200
    },
    circleButtonContainer: {
        borderRadius: 50,
        width: 70,
        height: 70,
        marginTop: -35,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center'
    },
    buttonIcon: {
        alignSelf: 'center',
    },
    imageContainer: {
        alignSelf: 'center',
        width: windowWidth,
        overflow: 'hidden',
        height: windowWidth / 1.2 //if you change this also change height in image style
    },
    background: { 
        borderRadius: 400,
        width: windowWidth * 2,
        height: windowWidth * 2,
        marginLeft: -(windowWidth / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    image: {
        elevation: 20,
        height: windowWidth / 1.2,
        width: windowWidth,
        position: 'absolute',
        bottom: 0,
        marginLeft: windowWidth / 2,
        backgroundColor: '#9DD6EB'
    },
    animeName: {
        fontFamily: 'GoogleSans-Medium',
        paddingHorizontal: '25%',
        letterSpacing: 0.5,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    genreList:{
        flexGrow: 0,
        marginTop: 15,
        alignSelf: 'center'
    },
    genre: {
        marginRight: 10,
        fontSize: 12,
        color: '#888',
        fontFamily: 'GoogleSans-Regular',
    },
    starContainer: {
        marginTop: 15,
        width: '32.5%',
        alignSelf: 'center'
    },
    synopsis: {
        fontFamily: 'GoogleSans-Regular',
        letterSpacing: 0.5,
        marginTop: 25,
        color: 'gray',
        lineHeight: 20
    },
    infoHeader: {
        marginTop: 5,
        textAlign: 'center',
        fontFamily: 'GoogleSans-Medium',
        fontSize: 14,
        color: 'white'
    },
    infoSubheader: {
        fontFamily: 'GoogleSans-Regular',
        color: '#888'
    },
    infoContainer: {
        marginRight: 15
    },
    inforow: {
        marginTop: 20,
        alignSelf: 'center'
    },
    moreHeader: {
        fontSize: 13,
        fontFamily: 'GoogleSans-Regular',
        marginTop: 15,
        color: 'white',
    },
    moreText: {
        fontSize: 12,
        fontFamily: 'GoogleSans-Regular',
        color: 'gray',
        marginTop: 5,
    }
}); 
