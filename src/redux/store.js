import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { initialState } from './initialState';
import { reducer as accountsReducer } from './accountsRedux';

const reducers = {
	accounts: accountsReducer,
};

Object.keys(initialState).forEach(item => {
	if (typeof reducers[item] == 'undefined') {
		reducers[item] = (statePart = null) => statePart;
	}
});

const combinedReducers = combineReducers(reducers);

export const store = configureStore({
	reducer: combinedReducers,
	initialState
});


