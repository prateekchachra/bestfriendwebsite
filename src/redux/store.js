
import {combineReducers, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import mainReducer from '../listpages/reducer';

const store = createStore(combineReducers({
    main: mainReducer
  }), {}, applyMiddleware(reduxThunk));

export default store;