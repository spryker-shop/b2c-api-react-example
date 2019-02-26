import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TSpellingSuggestion } from '@interfaces/searchPageData';
import * as React from 'react';

export interface ISearchIntroProps extends WithStyles<typeof styles> {
    onLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    spellingSuggestion: TSpellingSuggestion | null;
}
