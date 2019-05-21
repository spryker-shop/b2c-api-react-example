import { IInputProps } from '../types';
import { ISearchQuery } from '@interfaces/searchPageData';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IInputComponentProps extends WithStyles<typeof styles> {
    currency?: string | null;
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
