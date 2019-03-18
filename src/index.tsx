import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ScrollToTopRoute } from '@application/hoc/ScrollToTopRoute';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { sprykerTheme } from './theme/sprykerTheme';
import { configureStore } from '@stores/configureStore';
import createHistory from 'history/createBrowserHistory';
import PageContent from '@application/containers/PageContent';

const history = createHistory();
const store: Store<any> = configureStore(history);

export const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTopRoute>
                <MuiThemeProvider theme={sprykerTheme}>
                    <CssBaseline/>
                    <PageContent />
                </MuiThemeProvider>
            </ScrollToTopRoute>
        </ConnectedRouter>
    </Provider>
);

render(<App/>, document.getElementById('app'));
