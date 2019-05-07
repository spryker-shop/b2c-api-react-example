import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import { App } from 'src';
import { configureStore } from '@stores/configureStore';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Response as ExResponse, Request } from 'express';

const path = require('path');
const APP_TITLE = process.env.APP_TITLE || 'App';
const store = configureStore(createMemoryHistory());

export default (req: Request, res: ExResponse) => {
  const filePath = path.resolve(__dirname, '..', '..', 'index');
  const context: Partial<Response> = {};

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    const status = context.status || 200;
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    res.render(
      filePath,
      {
        state: serialize(store.getState()),
        title: `${APP_TITLE} SSR`,
      },
      (err: Error, htmlData: String) => {
        if (err) {
          console.error('err', err);

          return res.status(404).end();
        }

        return (
          res
            .status(status)
            .type('html')
            // inject the rendered app into our html and send it
            .end(htmlData.replace('<div id="app"></div>', `<div id="app">${html}</div>`))
        );
      },
    );
  }
};
