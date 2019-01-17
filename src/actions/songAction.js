import { NEXT_SONG, PREVIOUS_SONG, TOTAL_SONGS } from './types'
import store from '../store'

export const fetchNextSong = () => {
    const totalSongs = store.getState().playerReducer.totalSongs;
    const currentSong = store.getState().playerReducer.songCounter;
    if (totalSongs - 1 <= currentSong) return {type:""};
    return {
        type: NEXT_SONG
    }
}

export const fetchPreviousSong = () => {
    const counter = store.getState().playerReducer.songCounter;
    if (counter <= 0) return {type:""};
    return {
        type: PREVIOUS_SONG
    }
}

export const loadTotalSongs = (payload) => {
    return {
        type: TOTAL_SONGS,
        payload: payload
    }
}