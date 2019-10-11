import * as ActionTypes from './ActionTypes';

const initialState = {
    test_data: []
}

export const testConst = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.TEST_TYPE:
            console.log(state)
            return {...state, test_data: [...state.test_data, action.payload]}
        default:
            return state;
    }
}