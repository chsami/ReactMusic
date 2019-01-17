import { combineReducers} from 'redux';
import { NEXT_SONG, PREVIOUS_SONG } from "../actions/types";

const initialState = {
    songCounter: 0
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
        default:
            return state;
    }
}



export default combineReducers({
    playerReducer: playerReducer
});