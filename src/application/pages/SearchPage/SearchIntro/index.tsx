import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ISearchIntroProps } from '@application/pages/SearchPage/SearchIntro/types';
import { FormattedMessage } from 'react-intl';
import { pathSearchPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';

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
