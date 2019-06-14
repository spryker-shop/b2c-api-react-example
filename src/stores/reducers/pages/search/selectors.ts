import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IIndexSignature } from '@interfaces/common';

export const isPageSearchStateLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    state.pageSearch && state.pageSearch.pending && state.pageSearch.pending === true;

export const getSpellingSuggestion = (state: IReduxStore, props: IReduxOwnProps): string =>
    state.pageSearch.data && state.pageSearch.data.spellingSuggestion
        ? state.pageSearch.data.spellingSuggestion
        : null;

export const getSortParamLocalizedNames = (state: IReduxStore, props: IReduxOwnProps): IIndexSignature =>
    state.pageSearch.data && state.pageSearch.data.sortParamLocalizedNames
        ? state.pageSearch.data.sortParamLocalizedNames
        : null;

export const getCategoriesLocalizedName = (state: IReduxStore, props: IReduxOwnProps): string =>
    state.pageSearch.data && state.pageSearch.data.categoriesLocalizedName
        ? state.pageSearch.data.categoriesLocalizedName
        : null;
