import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';

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
        middlewares.push(logger);
    }

    const reducer = combineReducers({
        router: connectRouter(history),
        ...reducers
    });

    const middleware = process.env.NODE_ENV !== 'production' ?
        composeWithDevTools(applyMiddleware(...middlewares)) : compose(applyMiddleware(...middlewares));

    const store = createStore(
        reducer,
        initialState,
        middleware,
    );

    return store;
};
