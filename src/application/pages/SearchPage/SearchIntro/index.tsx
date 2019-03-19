import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { ISearchIntroProps } from './types';
import { pathSearchPage } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export const SearchIntroBase: React.SFC<ISearchIntroProps> = props => {
    const {spellingSuggestion, onLinkClick, classes} = props;

    if (!spellingSuggestion) {
        return null;
    }

    const suggestionTermLink = <NavLink
            to={pathSearchPage}
            className={classes.spellingSuggestion}
            onClick={onLinkClick}
        >
            {spellingSuggestion}
        </NavLink>;

    return (
        <FormattedMessage
            id={'category.suggestion.title'}
            values={{suggestionTerm: suggestionTermLink}}
        />
    );
};

export const SearchIntro = withStyles(styles)(SearchIntroBase);
