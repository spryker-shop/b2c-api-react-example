import * as React from 'react';
import { IFilterItemToDelete, TCategoryId } from '@application/pages/SearchPage/types';

type TSearchPageContext = {
    selectCategoryHandler: (categoryId: TCategoryId) => (event: React.MouseEvent<HTMLElement>) => void;
    deleteActiveFilterHandler: (itemToDelete: IFilterItemToDelete) => (event: React.MouseEvent<HTMLElement>) => void;
};

export const SearchPageContext = React.createContext<TSearchPageContext>({
    selectCategoryHandler: (/*categoryId: TCategoryId*/) => {
        throw new Error('selectCategoryHandler() not implemented');
    },
    deleteActiveFilterHandler: (/*itemToDelete: IFilterItemToDelete*/) => {
        throw new Error('deleteActiveFilterHandler() not implemented');
    },
});
