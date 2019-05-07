import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import { ScrollToTopRoute } from '@application/hoc/ScrollToTopRoute';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { sprykerTheme } from '@theme/sprykerTheme';
import { configureStore } from '@stores/configureStore';
import { createBrowserHistory, createMemoryHistory } from 'history';
import isNode from 'detect-node';

import config from './configs/server';
import { PageContent } from '@application/containers/PageContent';

// Create a history of your choosing (we're using a browser history in this case)
const history = isNode ? createMemoryHistory() : createBrowserHistory();
const store: Store<any> = configureStore(history);

export const App = () => (
    <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <ScrollToTopRoute>
                <MuiThemeProvider theme={sprykerTheme}>
                    <CssBaseline/>
                    <Route path={config.WEB_PATH} component={PageContent}/>
                </MuiThemeProvider>
            </ScrollToTopRoute>
        </ConnectedRouter>
    </Provider>
);
if (!isNode) {
    hydrate(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));
}
