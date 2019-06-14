import { ISearchQuery } from '@interfaces/search';
import { RenderSuggestionsContainerParamsutProps } from 'react-autosuggest';
import { ICategory } from '@interfaces/common';
import { IProductCard } from '@interfaces/product';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISuggestionsContainerProps extends WithStyles<typeof styles> {
    options: RenderSuggestionsContainerParamsutProps;
    suggestions?: IProductCard[];
    categories?: {[name: string]: string}[];
    completion?: string[];
    currency?: string;
    categoriesTree?: ICategory[];
    clearSuggestion: (query: string) => void;
    sendSearchAction?: (params: ISearchQuery) => void;
    isFulfilled?: boolean;
}
