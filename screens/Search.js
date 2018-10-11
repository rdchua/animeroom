import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, Alert, ActivityIndicator, ScrollView, StatusBar, TouchableOpacity, FlatList, TextInput} from 'react-native';
import { StackActions } from 'react-navigation';
import GridView from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import * as Kitsu from '../Kitsu';
import StarRating from 'react-native-star-rating';
import StreamerCard from '../components/StreamerCard';
import RatingsCard from '../components/RatingsCard';
import AnimeCard from '../components/AnimeCard';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Search extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            isSearching: true,
            genres: [],
            categories: [],
            searchResults: [],
            rating: 1,
            filterCount: 0,
            query: '',
            url: 'https://kitsu.io/api/edge/anime?',
            multiSliderValue: [1907, moment().year()],
        }
    }

    updateLink = (filter, value, type) => {
        /* if type is 0 then a filter was removed, 1 otherwise */
        let newURL;
        if(type == 1) {
            this.setState({
                url: this.state.url += this.state.filterCount == 0 ? `filter[${filter}]=${value}` : `&filter[${filter}]=${value}`,  
                filterCount: this.state.filterCount += 1
            }, () => {
                console.log(this.state.url);
            })
        } else {
            if(this.state.url.includes(`&filter[${filter}]=${value}`)) {
                newURL = this.state.url.replace(`&filter[${filter}]=${value}`, '');
            } else {
                newURL = this.state.url.replace(`filter[${filter}]=${value}`, '');
                newURL = newURL.replace('&', '');
            }
            this.setState({
                filterCount: this.state.filterCount -= 1,
                url: newURL  
            }, () => {
                console.log(this.state.url);
            })
        }
    }

    multiSliderValuesChange = (values) => {
        this.setState({
            multiSliderValue: values,
        });
    }

    searchAnime() {
        const { navigation } = this.props;
        this.setState({ isSearching: !this.state.isSearching });
        let searchURL;
        let slider1 = this.state.multiSliderValue[0];
        let slider2 = this.state.multiSliderValue[1];
        if(this.state.filterCount == 0) {
            searchURL = this.state.query == '' ? this.state.url : `${this.state.url}filter[text]=${this.state.query}`; 
            searchURL += `filter[year]=${slider1}..${slider2}&filter[averageRating]=${this.state.rating*20}..100&page[limit]=20&sort=-averageRating,popularityRank` 
        } else {
            searchURL = this.state.query == '' ? this.state.url : `${this.state.url}&filter[text]=${this.state.query}`;
            searchURL += `&filter[year]=${slider1}..${slider2}&filter[averageRating]=${this.state.rating*20}..100&page[limit]=20&sort=-averageRating,popularityRank`
        }
        navigation.navigate('SearchResults', { url: searchURL, query: this.state.query });
    }

    componentDidMount() {
        Kitsu.getGenres()
            .then((response) => response.json())
            .then((json) => {
                this.setState({ 
                    genres: json.data 
                })
            })
    }

    render() {
        const { navigation } = this.props;
        var genreList = []
        if(this.state.genres.length > 0) {
            for(let i = 0; i < this.state.genres.length; i++) {
                genreList.push(
                    <RatingsCard key={i} updateLink={this.updateLink} filterType='genres' text={this.state.genres[i].attributes.name} color='#888'/>
                )
            }
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#212121' barStyle='light-content'/>
                    <View style={styles.headerBar}>
                        <View style={[styles.row]}>
                            <TouchableOpacity onPress={() => this.state.isSearching ? navigation.navigate('Tabs') : this.setState({ isSearching: true})}>
                                <Icon name="arrow-left" size={24} color='#aaa' style={styles.headerIcon}/>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.headerTitle}
                                placeholder="Search Anime/Manga.."
                                placeholderTextColor="#888"
                                editable={true}
                                onChangeText={(text) => this.setState({ query: text })}
                            />
                            <TouchableOpacity style={styles.searchButton} onPress={() => this.searchAnime()}>
                                <Icon name='check' color='#54D2FA' size={24}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView>
                        {
                            this.state.isLoading ? 
                            <View style={{height: windowHeight, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size="large" color="#ccc" />
                            </View> :
                            <View style={styles.advancedSearchContainer}>
                                <MultiSlider
                                    showValues={true}
                                    trackStyle={{backgroundColor: '#555'}}
                                    selectedStyle={{backgroundColor: '#54D2FA'}}
                                    markerStyle={{backgroundColor: '#54D2FA'}}
                                    valuesStyle={[styles.header, {marginBottom: 15, marginLeft: -5}]}
                                    values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                                    sliderLength={280}
                                    onValuesChange={this.multiSliderValuesChange}
                                    min={1907}
                                    max={moment().year()}/>
                                <Text style={[styles.header, {marginTop: 20}]}>Rating</Text>
                                <View style={styles.starContainer}>
                                    <StarRating
                                        maxStars={5}
                                        rating={this.state.rating}
                                        starSize={18}
                                        disabled={false}
                                        fullStar={'star'}
                                        fullStarColor={'#54D2FA'} //54D2FA - blue
                                        selectedStar={(rating) => this.setState({ rating: rating })}/>
                                </View>
                                <Text style={[styles.header, {marginTop: 20}]}>Type</Text>
                                <View style={styles.ratingsContainer}>
                                    <RatingsCard filterType='rating' updateLink={this.updateLink} text='Anime' color='#888'/>
                                    <RatingsCard filterType='rating' updateLink={this.updateLink} text='Manga' color='#888'/>
                                </View>
                                <Text style={[styles.header, {marginTop: 20}]}>Streamers</Text>
                                <View style={styles.streamersContainer}>
                                    <StreamerCard updateLink={this.updateLink} iconName="hulu" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="funimation" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="crunchyroll" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="viewster" iconSize={18} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="daisuki" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="netflix" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="hidive" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="tubitv" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="amazon" iconSize={22} iconColor="#888"/>
                                    <StreamerCard updateLink={this.updateLink} iconName="youtube" iconSize={22} iconColor="#888"/>
                                </View>
                                <Text style={[styles.header, {marginTop: 20}]}>Genres</Text>
                                <View style={styles.ratingsContainer}>
                                    {
                                        this.state.genres.length > 0 ? 
                                        [genreList] : <ActivityIndicator style={{marginTop: 20}} size="small" color="#fff" />
                                    }
                                </View>
                                <Text style={[styles.header, {marginTop: 20}]}>Rating</Text>
                                <View style={styles.ratingsContainer}>
                                    <RatingsCard filterType='rating' updateLink={this.updateLink} text='ALL' color='#888'/>
                                    <RatingsCard filterType='rating' updateLink={this.updateLink} text='G' color='#888'/>
                                    <RatingsCard filterType='rating' updateLink={this.updateLink} text='PG' color='#888'/>
                                    <RatingsCard filterType='rating' updateLink={this.updateLink} text='R' color='#888'/>
                                    <RatingsCard filterType='rating' updateLink={this.updateLink} text='R18' color='#888'/>
                                </View>
                                <Text style={[styles.header, {marginTop: 20}]}>Season</Text>
                                <View style={styles.ratingsContainer}>
                                    <RatingsCard filterType='season' updateLink={this.updateLink} text='Summer' color='#888'/>
                                    <RatingsCard filterType='season' updateLink={this.updateLink} text='Spring' color='#888'/>
                                    <RatingsCard filterType='season' updateLink={this.updateLink} text='Fall' color='#888'/>
                                    <RatingsCard filterType='season' updateLink={this.updateLink} text='Winter' color='#888'/>
                                </View>
                                <Text style={[styles.header, {marginTop: 20}]}>Type</Text>
                                <View style={styles.ratingsContainer}>
                                    <RatingsCard filterType='subtype' updateLink={this.updateLink} text='All' color='#888'/>
                                    <RatingsCard filterType='subtype' updateLink={this.updateLink} text='TV' color='#888'/>
                                    <RatingsCard filterType='subtype' updateLink={this.updateLink} text='Special' color='#888'/>
                                    <RatingsCard filterType='subtype' updateLink={this.updateLink} text='ONA' color='#888'/>
                                    <RatingsCard filterType='subtype' updateLink={this.updateLink} text='OVA' color='#888'/>
                                    <RatingsCard filterType='subtype' updateLink={this.updateLink} text='Movie' color='#888'/>
                                    <RatingsCard filterType='subtype' updateLink={this.updateLink} text='Music' color='#888'/>
                                </View>
                            </View>
                        }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBar: {
        height: 56,
        justifyContent: 'center',
        elevation: 6,
        backgroundColor: '#212121',
    },
    headerIcon: {
        paddingVertical: 10,
        paddingLeft: 16,
    },
    headerTitle: {
        paddingLeft: 24,
        width: '75%',
        fontFamily: 'GoogleSans-Medium',
        fontSize: 18,
        color: 'white'
    },
    header: {
        fontFamily: 'GoogleSans-Bold',
        letterSpacing: 0.5,
        color: 'white',
        fontSize: 16
    }, 
    searchText: {
        fontSize: 24,
        
        color: 'white'
    },
    container: {
        flex: 1,
        paddingBottom: 25,
        backgroundColor: '#141414',
    },
    row: {
        flexDirection: 'row'
    },
    advancedSearchContainer: {
        padding: 20,
    },
    streamersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
    },
    ratingsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
    },
    starContainer: {
        marginTop: 15,
        width: '32.5%',
    },
    sliderValues: {
        color: 'white',
        marginBottom: 15,
        fontFamily: 'GoogleSans-Medium'
    },
    searchButton: { 
        justifyContent: 'center', 
        paddingHorizontal: 10, 
        height: 35, 
        alignSelf: 'center', 
        borderRadius: 50,
    },
    customStyle: {
        marginTop: 0, 
        // justifyContent: 'flex-end',
    }
}); 
