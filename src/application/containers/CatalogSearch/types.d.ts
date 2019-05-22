import { WithStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { styles } from './styles';
import { IFlyoutSearch } from '@interfaces/search';
import * as React from 'react';
import { BlurEvent, ChangeEvent } from 'react-autosuggest';

export interface ICatalogProps extends WithStyles<typeof styles>, RouteProps, Partial<IFlyoutSearch> {
    currency?: string | null;
    isLoading?: boolean;
    id: string;
    sendSuggestionAction?: (query: string) => void;
    clearSuggestions?: (query: string) => void;
    extraInputClassName?: string;
}

export interface ICatalogState {
    value: string;
    completionValue?: string;
}

export interface IInputProps {
    value: string;
    extraInputClassName?: string;
    [key: string]: any;
    onChange: (event: React.FormEvent<any>, params?: ChangeEvent) => void;
    onBlur?: (event: React.FormEvent<any>, params?: BlurEvent) => void;
}

export interface ICompletionMatch {
    text: string;
    highlight: Boolean;
}
