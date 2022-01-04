import { createStore } from 'redux';
import globalReducer from './reducers';

export default createStore(globalReducer);
