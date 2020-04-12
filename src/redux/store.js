import { createStore } from 'redux';
import languageReducer from '../listpages/reducer';


let store = createStore(languageReducer);

export default store;