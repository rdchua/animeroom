import buildUrl from 'build-url'
import {Alert} from 'react-native';
//? define URL 
const trendingAnime = 'https://kitsu.io/api/edge/trending/anime';
const mostPopularAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter&sort=popularityRank';
const topAiringAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=current&sort=popularityRank';
const topUpcomingAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank';
const animeCharacter = 'https://kitsu.io/api/edge/media-characters';
const genres = 'https://kitsu.io/api/edge/genres?page[limit]=20';
const categories = 'https://kitsu.io/api/edge/categories?sort=-totalMediaCount';
const anime = 'https://kitsu.io/api/edge/anime';


const trendingManga = 'https://kitsu.io/api/edge/trending/manga';
const mostPopularManga = 'https://kitsu.io/api/edge/manga?page[limit]=10&filter&sort=popularityRank';
const topAiringManga = 'https://kitsu.io/api/edge/manga?page[limit]=10&filter[status]=current&sort=popularityRank';
const topUpcomingManga = 'https://kitsu.io/api/edge/manga?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank';

//? define functions
export function getTrendingAnime() {
    return fetch(trendingAnime);
}

export function getTopAiringAnime() {
    return fetch(topAiringAnime);
}

export function getTopUpcomingAnime() {
    return fetch(topUpcomingAnime);
}

export function getMostPopularAnime() {
    return fetch(mostPopularAnime);
}

export function getAnimeGenres(id) {
    return fetch(`${anime}/${id}/genres`)
}

export function getSimilarAnime(genres) {
    return fetch(`${anime}?page[limit]=10&filter[genres]=${genres[0].attributes.name}&filter[genres]=${genres[1].attributes.name}&sort=-averageRating,popularityRank`);
}

export function getCharactersFromAnime(id) {
    return fetch(`${anime}/${id}/characters`)
}

export function getAnimeCharacter(id){
    return fetch(`${animeCharacter}/${id}/character`)
}

export function getGenres() {
    return fetch(genres);
}

export function getCategories() {
    return fetch(categories);
}

export function advancedSearchAnime(url) {
    return fetch(url);
}

export function getTrendingManga() {
    return fetch(trendingManga);
}

export function getTopAiringManga() {
    return fetch(topAiringManga);
}

export function getTopUpcomingManga() {
    return fetch(topUpcomingManga);
}

export function getMostPopularManga() {
    return fetch(mostPopularManga);
}
