import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { pathCategoryPageBase, pathSearchPage } from '@constants/routes';
import { getCategoryIdByName } from '@helpers/categories';
import {
    withStyles,
    Paper,
    Typography,
    Divider
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ClickEvent } from '@interfaces/common';
import { ISuggestionsContainerProps as Props } from './types';
import { styles } from './styles';

export const SuggestionsContainerBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        categories,
        completion,
        suggestions,
        categoriesTree,
        classes,
        options,
        currency,
        clearSuggestion,
        sendSearchAction,
        fulfilled
    } = props;

    const handleSearchCompletion = (event: ClickEvent): void => {
        const query = event.currentTarget.dataset.query.trim();
        sendSearchAction({q: query, currency});
        clearSuggestion(query);
    };

    let suggestQuery: string = options.query.trim();

    if (completion.length) {
        completion.some((data: string) => {
            if (data.startsWith(options.query.trim().toLowerCase())) {
                suggestQuery = data;

                return true;
            }

            return false;
        });
    }

    const maxAmountOfItems = 4;

    const renderCompletions = (): JSX.Element[] => {
        const completionsList: JSX.Element[] = [];

        for (let i = 0; i < maxAmountOfItems; i++) {
            if (completion[i]) {
                completionsList.push(
                    <NavLink
                        to={pathSearchPage}
                        data-query={completion[i]}
                        key={`completion-${i}`}
                        className={classes.completion}
                        onClick={handleSearchCompletion}
                    >
                        <SearchIcon />
                        <span>{completion[i]}</span>
                    </NavLink>
                );
            }
        }

        return completionsList;
    };

    const renderedCategories = (): JSX.Element[] => {
        const categoriesList: JSX.Element[] = [];

        for (let i = 0; i < maxAmountOfItems; i++) {
            if (categories[i]) {
                const categoryNodeId = getCategoryIdByName(categories[i].name, categoriesTree);
                const path = categoryNodeId ? `${pathCategoryPageBase}/${categoryNodeId}` : pathSearchPage;
                categoriesList.push(
                    <NavLink to={path}
                             data-name={categories[i].name}
                             data-nodeid={categoryNodeId}
                             key={`category-${categoryNodeId}`}
                             className={classes.completion}
                             onClick={() => clearSuggestion(categories[i].name)}
                    >
                        <div className={classes.completion}>{categories[i].name}</div>
                    </NavLink>
                );
            }
        }

        return categoriesList;
    };

    const isNoSuggestions = !Boolean(categories.length) && !Boolean(completion.length) &&
        !Boolean(options.children) && fulfilled;

    if (isNoSuggestions) {
        return (
            <div className={ classes.suggestionsContainer }>
                <div className={ classes.noFoundText }>
                    <FormattedMessage id={'no.found.message'} />
                </div>
            </div>
        );
    }

    return (
        <div {...options.containerProps}>
            <div className={classes.insideContWrapper}>
                <div>{renderCompletions()}</div>
                <Typography component="h4" className={classes.categoryTitle}>
                    <FormattedMessage id={'categories.panel.title'} />
                </Typography>

                <Divider />

                <div className={classes.marginTop}>{renderedCategories()}</div>
                <Typography component="h4" className={classes.categoryTitle}>
                    <FormattedMessage id={'suggested.products.title'} />
                </Typography>

                <Divider />

                <div>{options.children}</div>

                <NavLink
                    to={pathSearchPage}
                    data-query={options.query}
                    onClick={handleSearchCompletion}
                    className={classes.linkAll}
                >
                    <FormattedMessage id={'all.suggested.products.title'} />
                </NavLink>
            </div>
        </div>
    );
};

export const SuggestionsContainer = connect(withStyles(styles)(SuggestionsContainerBase));
