import { createStore, combineReducers } from 'redux';
import { dives } from './dives';
import { testConst } from './test';


export const ConfigureStore = () => {
   
    const store = createStore(
        combineReducers({
            dives,
            testConst
        })
    );

    return { store }
}