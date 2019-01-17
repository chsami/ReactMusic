import { NEXT_SONG, PREVIOUS_SONG } from './types'
import store from '../store'

export const fetchNextSong = () => {
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