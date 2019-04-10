import * as React from 'react';
import { connect } from './connect';
import { ISearchPaginationProps as Props } from './types';
import { AppPagination } from '@application/containers/AppPagination';

const SearchPaginationComponent: React.SFC<Props> = (props): JSX.Element => {
    const { pagination, history, setPaginationPage } = props;

    const handlePagination = async (value: number | string): Promise<void> => {
        setPaginationParam(String(value));
    };

    const setPaginationParam = (page: string): void => {
        const searchQuery = new URLSearchParams(history.location.search);
        searchQuery.set('page', page);
        history.replace({...history.location, search: searchQuery.toString()});
        setPaginationPage(Number(page));
    };

    return (
        <AppPagination pagination={ pagination } onChangeHandler={ handlePagination }/>
    );
};

export const SearchPagination = connect(SearchPaginationComponent);
