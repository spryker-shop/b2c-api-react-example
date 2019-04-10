import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableLoginPage = Loadable({
    loader: () =>
        import('@application/pages/LoginPage').then(
            module => module.LoginPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
