import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ScrollToTopRoute } from '@hoc/ScrollToTopRoute';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { sprykerTheme } from '@theme/sprykerTheme';
import { configureStore } from '@stores/configureStore';
import createHistory from 'history/createBrowserHistory';
import { PageContent } from '@containers/PageContent';
const config = require('@configs/env_config');

const history = createHistory();
const store: Store<any> = configureStore(history);

const MOUNT_NODE: HTMLElement | null = document.getElementById('app');

const render: Function = (): void => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={ store }>
                <ConnectedRouter history={ history }>
                    <ScrollToTopRoute>
                        <MuiThemeProvider theme={ sprykerTheme }>
                            <CssBaseline />
                            <Route path={ config.WEB_PATH } render={ props => <PageContent { ...props } /> } />
                        </MuiThemeProvider>
                    </ScrollToTopRoute>
                </ConnectedRouter>
            </Provider>
        </BrowserRouter>,
        MOUNT_NODE
    );
};

if (module.hot) {
    module.hot.accept(['@containers/PageContent'], () => {
        if (MOUNT_NODE) {
            ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        }

        render();
    });
}

render();
