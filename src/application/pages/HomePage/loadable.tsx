import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableHomePage = Loadable({
    loader: () =>
        import('@pages/HomePage').then(
            module => module.HomePage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
