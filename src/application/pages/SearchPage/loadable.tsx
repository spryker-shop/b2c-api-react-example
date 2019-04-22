import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableSearchPage = Loadable({
    loader: () =>
        import('@application/pages/SearchPage').then(
            module => module.SearchPage,
        ),
    loading: () => <Preloader />,
});
