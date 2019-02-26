import { TAppCurrency } from '@interfaces/currency';
import { IInputProps } from '../types';
import { ISearchQuery } from '@interfaces/searchPageData';

export interface IInputComponentProps {
    currency?: TAppCurrency;
    isLoading?: boolean;
    completion?: string[] | null;
    inputProps: IInputProps;
    clearSuggestion: (query: string) => void;
    sendSearchAction?: (params: ISearchQuery) => void;
    push?: (query: string) => void;
}

export interface IInputComponentState {
    parts: array;
    matches: array;
}
