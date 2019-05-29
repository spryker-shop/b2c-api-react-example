import { IPagination } from '@containers/AppPagination/types';
import { History } from 'history';

export interface ISearchPaginationProps {
    pagination: IPagination;
    history: History;
    setPaginationPageAction: (page: number) => void;
}
