import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import { ScrollToTopRoute } from '@application/hoc/ScrollToTopRoute';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { sprykerTheme } from './theme/sprykerTheme';
import { configureStore } from '@stores/configureStore';
import createHistory from 'history/createBrowserHistory';
import PageContent from '@application/containers/PageContent';
import { FontLoader } from '@application/components/FontLoader';
import config from './configs/server';

const history = createHistory();
const store: Store<any> = configureStore(history);

export const App = () => (
    <BrowserRouter>
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <ScrollToTopRoute>
                    <FontLoader>
                        <MuiThemeProvider theme={ sprykerTheme }>
                            <CssBaseline />
                            <Route path={ config.WEB_PATH } render={ props => <PageContent { ...props } /> } />
                        </MuiThemeProvider>
                    </FontLoader>
                </ScrollToTopRoute>
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>
);

render(<App />, document.getElementById('app'));
