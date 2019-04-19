import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadablePasswordForgotPage = Loadable({
    loader: () =>
        import('@application/pages/ForgotPasswordPage').then(
            module => module.ForgotPasswordPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
