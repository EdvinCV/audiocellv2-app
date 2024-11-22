// STORE
import {createStore, applyMiddleware, compose} from 'redux';
// Redux thunk
import thunk from 'redux-thunk';
const { default: reducer } = require("./reducers");
// Reducers
const store = createStore(
    reducer,
    compose( applyMiddleware(thunk), 
        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;