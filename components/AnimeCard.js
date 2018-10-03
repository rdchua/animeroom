import React, {PureComponent, Component} from 'react';
import { StyleSheet, Dimensions, Text, View, Image} from 'react-native';
import StarRating from 'react-native-star-rating';

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

    render() {
        const anime = this.props.data;
        return (
            <View style={styles.item}>
                <Image borderTopRightRadius={4} borderTopLeftRadius={4} source={{uri: anime.attributes.posterImage.large}} style={styles.image}/>
                <View style={styles.infoContainer}>
                    <Text numberOfLines={2} style={styles.title}>{anime.attributes.canonicalTitle}</Text>
                    <Text style={styles.rating}>{anime.attributes.averageRating}%</Text>
                    <View style={styles.row}>
                        <StarRating
                            starStyle={styles.star}
                            maxStars={1}
                            rating={1}
                            starSize={12}
                            disabled={false}
                            fullStar={'heart'}
                            fullStarColor={'gray'}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}/>
                        <Text style={styles.likes}>{anime.attributes.popularityRank} in Popularity</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    item: {
        marginRight: 10,
        borderRadius: 4,
        height: 235,
        width: 120,
        elevation: 6,
        backgroundColor: '#212121',
    },
    image: {
        height: 150,
    },
    spotlightTitle: {
        fontSize: 24,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    infoContainer: {
        padding: 10
    },
    title: {
        fontFamily: 'GoogleSans-Medium',
        maxWidth: '85%',
        fontSize: 13,
        color: 'white',
        marginTop: 2
    },
    rating: {
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
    }
});
