import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableRegisterPage = Loadable({
    loader: () =>
        import('@pages/RegisterPage').then(
            module => module.RegisterPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
