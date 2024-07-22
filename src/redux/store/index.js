// redux/store.js
import { createStore } from 'redux';
import { Reducers } from '../reducers'; // Import your combined reducers

export const Store = createStore(Reducers);
