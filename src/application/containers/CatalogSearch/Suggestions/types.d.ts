import { IProductCard } from '@interfaces/product';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISuggestionsProps extends WithStyles<typeof styles> {
    suggestion: IProductCard;
    query: string;
    isHighlighted: boolean;
    clearSuggestion: (query: string) => void;
    containerRef: React.RefObject<HTMLDivElement>;
    classes?: any;
}
