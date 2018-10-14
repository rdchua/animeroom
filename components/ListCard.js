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
        this.state = {
            isLoading: true,
            trendingAnime : []
        }
    }

    deleteFromList() {
        const anime = this.props.data;
        const mangaSubtypes = ['doujin', 'manga', 'manhua', 'manhwa', 'novel', 'oel', 'oneshot'];
        const store = mangaSubtypes.includes(anime.attributes.subtype) ? 'mangaList' : 'animeList'
        Storage.get(store)
            .then((list) => {
                let index = list.findIndex(element => element.id == anime.id);
                list.splice(index, 1);
                this.props.updateList(list)
                Storage.save(store, list);
                ToastAndroid.showWithGravityAndOffset(
                    `${anime.attributes.canonicalTitle} deleted from list`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    0,
                    50
                );
            })
    }

    render() {
        const anime = this.props.data;
        return (
            <View style={[styles.item, this.props.customStyle]}>
                <Image resizeMode='cover' resizeMethod='resize' borderTopRightRadius={4} borderTopLeftRadius={4} source={{uri: anime.attributes.posterImage.large}} style={styles.image}/>
                <View style={styles.infoContainer}>
                    <Text numberOfLines={2} style={styles.title}>{anime.attributes.canonicalTitle}</Text>
                    <Text numberOfLines={2} style={styles.japTitle}>{anime.attributes.titles.ja_jp}</Text>
                    <Text style={styles.rating}>{anime.attributes.averageRating}%</Text>
                    <View style={styles.row}>
                        <StarRating
                            starStyle={styles.star}
                            maxStars={1}
                            rating={1}
                            starSize={12}
                            disabled={true}
                            fullStar={'heart'}
                            fullStarColor={'#D85A42'}/>
                        <Text style={styles.likes}>Rank #{anime.attributes.popularityRank} (Most Popular Anime)</Text>
                    </View>
                    <View style={styles.row}>
                        <StarRating
                            starStyle={styles.star}
                            maxStars={1}
                            rating={1}
                            starSize={12}
                            disabled={true}
                            fullStar={'star'}
                            fullStarColor={'#EA9D33'}/>
                        <Text style={styles.likes}>Rank #{anime.attributes.ratingRank} (Highest Rated Anime)</Text>
                    </View>
                    <Text style={styles.nextEp}>{anime.attributes.nextRelease ? `Next episode airs ${moment(anime.attributes.nextRelease).fromNow()}` : 'Next episode air date unknown'}</Text>
                    <Text style={styles.totalEps}>Status: {anime.attributes.status ? anime.attributes.status : '?'}</Text>
                </View>
                <TouchableOpacity style={styles.deleteIcon} onPress={() => this.deleteFromList()}>
                    <Icon name='trash-alt' size={16} color='#D85A42'/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        marginTop: 2,
        flexDirection: 'row'
    },
    item: {
        marginRight: 10,
        borderRadius: 4,
        height: 170,
        width: '100%',
        elevation: 6,
        backgroundColor: '#212121',
        flexDirection: 'row'
    },
    image: {
        height: 170,
        width: 120
    },
    spotlightTitle: {
        fontSize: 24,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    infoContainer: {
        padding: 10,
    },
    title: {
        fontFamily: 'GoogleSans-Medium',
        paddingRight: 20,
        fontSize: 16,
        color: 'white',
        marginTop: 2
    },
    japTitle: {
        fontFamily: 'GoogleSans-Medium',
        paddingRight: 20,
        fontSize: 14,
        color: '#ccc',
        letterSpacing: 0.5,
        marginTop: 2
    },
    rating: {
        marginTop: 10,
        fontSize: 12,
        color: '#888',
    },
    star: {
        marginTop: 2,
    },
    likes: {
        fontSize: 11, 
        color: '#888',
        marginLeft: 5
    },
    nextEp: {
        marginTop: 15,
        color: '#888',
        fontFamily: 'GoogleSans-Medium',
        fontSize: 13
    },
    totalEps: {
        color: '#888',
        fontFamily: 'GoogleSans-Medium',
        fontSize: 13
    },
    deleteIcon: {
        position: 'absolute',
        top: 12,
        right: 10
    }
});
