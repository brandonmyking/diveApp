import * as ActionTypes from './ActionTypes';

const initialState = {
    data: []
}

export const dives = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DIVE:
            const id = state.data.length;
            console.log(state);
            return {...state, data: [...state.data, {id: id, ...action.payload}]}
        case ActionTypes.RESET_DIVES:
            console.log(state);
            return {...state, data: []}
        default:
            return state;
    }
}

