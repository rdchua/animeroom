import buildUrl from 'build-url'
import {Alert} from 'react-native';
//? define URL 
const trendingAnime = 'https://kitsu.io/api/edge/trending/anime'
const topAiringAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=current&sort=-averageRating,popularityRank'
const topUpcomingAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank'
const animeCharacter = 'https://kitsu.io/api/edge/media-characters'
const anime = 'https://kitsu.io/api/edge/anime'

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
    return fetch(`${animeCharacter}/id/character`)
}
