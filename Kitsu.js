import buildUrl from 'build-url'
import {Alert} from 'react-native';
//? define URL 
const trendingAnime = 'https://kitsu.io/api/edge/trending/anime'
const anime = 'https://kitsu.io/api/edge/trending/anime'

//? define functions
export function getTrendingAnime() {
    return fetch(trendingAnime);
}
export function getAnime() {
    return fetch(anime);
}  