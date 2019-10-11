import * as ActionTypes from './ActionTypes';

const initialState = {
    dives: []
}

export const dives = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DIVE:
            const id = state.dives.length;
            console.log(state);
            return {...state, dives: [...state.dives, {id: id, ...action.payload}]}
        case ActionTypes.RESET_DIVES:
            console.log(state);
            return {...state, dives: []}
        default:
            return state;
    }
}

