import { createStore, combineReducers } from 'redux';
import { dives } from './dives';


export const ConfigureStore = () => {
   
    const store = createStore(
        combineReducers({
            dives
        })
    );

    return { store }
}