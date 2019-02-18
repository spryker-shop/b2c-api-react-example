import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
// import { routerMiddleware, routerReducer } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';
import { IReduxStore } from './reducers/types';

export const configureStore = function (history: History, initialState?: any) {
    const middlewares = [
        thunk,
        routerMiddleware(history),
    ];
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger({
            actionTransformer: action => ({
                ...action,
                type: String(action.type),
            }),
        });
        // Logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
        middlewares.push(logger);
    }
    // Add the reducer to your store on the `router` key
    const reducer = combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
    // Apply our middleware for navigating
    const middleware = process.env.NODE_ENV !== 'production' ?
        composeWithDevTools(applyMiddleware(...middlewares)) : compose(applyMiddleware(...middlewares));

    const store = createStore(
        reducer,
        initialState,
        middleware,
    );

    return store;
};

export default configureStore;
