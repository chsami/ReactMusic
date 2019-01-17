import { combineReducers} from 'redux';
import { NEXT_SONG, PREVIOUS_SONG, TOTAL_SONGS } from "../actions/types";

const initialState = {
    songCounter: 0,
    totalSongs: 0
}

function playerReducer(state = initialState, action) {
    switch (action.type) {
        case PREVIOUS_SONG:
            return {
                ...state,
                songCounter: --initialState.songCounter
            }
        case NEXT_SONG:
            return {
                ...state,
                songCounter: ++initialState.songCounter
            }
        case TOTAL_SONGS:
            return {
                ...state,
                totalSongs: action.payload
            }
        default:
            return state;
    }
}



export default combineReducers({
    playerReducer: playerReducer
});