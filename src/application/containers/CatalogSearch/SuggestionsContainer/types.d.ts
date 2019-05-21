import { ISearchQuery } from '@interfaces/searchPageData';
import { RenderSuggestionsContainerParamsutProps } from 'react-autosuggest';
import { ICategory } from '@interfaces/category';
import { IProductCard } from '@interfaces/product';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISuggestionsContainerProps extends WithStyles<typeof styles> {
    options: RenderSuggestionsContainerParamsutProps;
    suggestions?: IProductCard[] | null;
    categories?: {[name: string]: string}[] | null;
    completion?: string[] | null;
    currency?: string | null;
    categoriesTree?: ICategory[] | null;
    clearSuggestion: (query: string) => void;
    sendSearchAction?: (params: ISearchQuery) => void;
    fulfilled?: boolean;
}
