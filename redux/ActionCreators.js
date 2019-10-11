import * as ActionTypes from './ActionTypes';


export const addDive = (dive) => ({
    type: ActionTypes.ADD_DIVE,
    payload: dive
});

export const resetDives = () => ({
    type: ActionTypes.RESET_DIVES
})

export const testFunction = (testInfo) => ({
    type: ActionTypes.TEST_TYPE,
    payload: testInfo
})