import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadablePasswordResetPage = Loadable({
    loader: () =>
        import('@pages/ResetPasswordPage').then(
            module => module.ResetPasswordPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
