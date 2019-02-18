import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import { ScrollToTopRoute } from '@routes/ScrollToTopRoute';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { sprykerTheme } from '../../theme/sprykerTheme';

import { configureStore } from '@stores/configureStore';
import createHistory from 'history/createBrowserHistory';
import config from '../../configs/server';
import { PageContent } from '../PageContent';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
const store: Store<any> = configureStore(history);

export const App = () => (
    <BrowserRouter>
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
    </BrowserRouter>
);
