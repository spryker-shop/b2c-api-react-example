import * as React from 'react';
import { connect } from './connect';
import { ISearchPaginationProps as Props } from './types';
import { Pagination } from '@containers/Pagination';

const SearchPaginationComponent: React.FC<Props> = (props): JSX.Element => {
    const { pagination, history, setPaginationPageAction } = props;

    const handlePagination = async (value: number | string): Promise<void> => {
        setPaginationParam(String(value));
    };

    const setPaginationParam = (page: string): void => {
        const searchQuery = new URLSearchParams(history.location.search);
        searchQuery.set('page', page);
        history.replace({...history.location, search: searchQuery.toString()});
        setPaginationPageAction(Number(page));
    };

    return (
        <Pagination pagination={ pagination } onChangeHandler={ handlePagination }/>
    );
};

export const SearchPagination = connect(SearchPaginationComponent);
