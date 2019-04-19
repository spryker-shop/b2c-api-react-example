import { IPagination } from '@components/AppPagination/types';
import { History } from 'history';

export interface ISearchPaginationProps {
    pagination: IPagination;
    history: History;

    setPaginationPage: (page: number) => void;
}
