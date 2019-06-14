import * as React from 'react';
import { connect } from './connect';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { pathCategoryPageBase, pathSearchPage } from '@constants/routes';
import { getCategoryIdByName } from '@helpers/categories';
import { withStyles } from '@material-ui/core';
import { LinkIcon } from './icons';
import { ClickEvent } from '@interfaces/common';
import { ISuggestionsContainerProps as Props } from './types';
import { ICompletionMatch } from '../types';
import { styles } from './styles';

const SuggestionsContainerComponent: React.FC<Props> = (props): JSX.Element => {
    const {
        categories,
        completion,
        categoriesTree,
        classes,
        options,
        currency,
        clearSuggestion,
        sendSearchAction,
        isFulfilled
    } = props;
    const maxAmountOfItems = 4;

    const handleSearchCompletion = (event: ClickEvent): void => {
        const query = event.currentTarget.dataset.query.trim();
        sendSearchAction({ q: query, currency });
        clearSuggestion(query);
    };

    const renderCompletions = (): JSX.Element[] => {
        const completionsList: JSX.Element[] = [];

        for (let i = 0; i < maxAmountOfItems; i++) {
            if (completion[i]) {
                completionsList.push(
                    <NavLink
                        to={ pathSearchPage }
                        data-query={ completion[i] }
                        key={ `completion-${i}` }
                        className={ classes.completion }
                        onClick={ handleSearchCompletion }
                    >
                        <span>{ completion[i] }</span>
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
                const matches = match(categories[i].name, options.query);
                const parts = parse(categories[i].name, matches);

                const highlightedLetters = parts.map((part: ICompletionMatch, index: number) => part.highlight
                    ? <span key={ String(index) } className={ classes.matchedText }>{ part.text }</span>
                    : <span key={ String(index) }>{ part.text }</span>
                );

                categoriesList.push(
                    <NavLink to={ path }
                             data-name={ categories[i].name }
                             data-nodeid={ categoryNodeId }
                             key={ `category-${categoryNodeId}` }
                             className={ classes.completion }
                             onClick={ () => clearSuggestion(categories[i].name) }
                    >
                        <div className={ classes.completionInner }>
                            <span>{ highlightedLetters }</span>
                            <span className={ classes.completionTip }>
                                <FormattedMessage id={ 'categories.panel.title' } />
                                <span className={ classes.completionTipIcon }><LinkIcon /></span>
                            </span>
                        </div>
                    </NavLink>
                );
            }
        }

        return categoriesList;
    };

    const isNoSuggestions = !Boolean(categories.length) && !Boolean(completion.length) &&
        !Boolean(options.children) && isFulfilled;

    if (isNoSuggestions) {
        return (
            <div className={ classes.suggestionsContainer }>
                <div className={ classes.noFoundText }>
                    <FormattedMessage id={ 'no.found.message' } />
                </div>
            </div>
        );
    }

    return (
        <div { ...options.containerProps }>
            <div className={ classes.insideContWrapper }>
                <div className={ classes.completionList }>{ renderCompletions() }</div>

                {Boolean(renderedCategories().length) &&
                    <div className={ classes.completionList }>{ renderedCategories() }</div>
                }

                <div className={ classes.completionList }>
                    <div>{ options.children }</div>

                    <NavLink
                        to={ pathSearchPage }
                        data-query={ options.query }
                        onClick={ handleSearchCompletion }
                        className={ classes.linkAll }
                    >
                        <FormattedMessage id={ 'all.suggested.products.title' } />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export const SuggestionsContainer = connect(withStyles(styles)(SuggestionsContainerComponent));
