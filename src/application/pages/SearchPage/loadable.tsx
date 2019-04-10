import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableSearchPage = Loadable({
    loader: () =>
        import('@application/pages/SearchPage').then(
            module => module.SearchPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
