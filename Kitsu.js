import buildUrl from 'build-url'
import {Alert} from 'react-native';
//? define URL 
const trendingAnime = 'https://kitsu.io/api/edge/trending/anime'
const topAiringAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=current&sort=-averageRating,popularityRank'
const topUpcomingAnime = 'https://kitsu.io/api/edge/anime?page[limit]=10&filter[status]=upcoming&sort=-averageRating,popularityRank'
const animeGenres = 'https://kitsu.io/api/edge/anime'

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
    return fetch(`${animeGenres}/${id}/genres`)
}
