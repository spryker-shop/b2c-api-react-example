import * as React from 'react';
import { pathProductPageBase } from '@constants/routes';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { NavLink } from 'react-router-dom';
import { withStyles, MenuItem } from '@material-ui/core';
import { SquareImage } from '@application/components/SquareImage';
import { AppPrice } from '@application/components/AppPrice';
import { ISuggestionsProps as Props, ISuggestionsState as State } from './types';
import { ICompletionMatch } from '../types';
import { styles } from './styles';

export class SuggestionsBase extends React.Component<Props, State> {
    protected designImgWidth: number = 0.23;

    public readonly state: State = {
        listItemHeight: 100
    };

    public componentDidMount = (): void => {
        window.addEventListener('resize', this.setListItemHeight);
        this.setListItemHeight();
    }

    public componentWillUnmount = (): void => {
        window.removeEventListener('resize', this.setListItemHeight);
    }

    protected setListItemHeight = (): void => {
        const {containerRef} = this.props;

        if (containerRef && containerRef.current) {
            const listItemHeight = containerRef.current.offsetWidth * this.designImgWidth;

            this.setState({listItemHeight});
        }
    };

    public render(): JSX.Element {
        const {suggestion, classes, isHighlighted, query, clearSuggestion} = this.props;
        const {listItemHeight} = this.state;
        const matches = match(suggestion.abstractName, query);
        const parts = parse(suggestion.abstractName, matches);

        const highlightedLetters = parts.map((part: ICompletionMatch, index: number) => part.highlight
            ? <span key={String(index)} className={classes.mediumText}>{part.text}</span>
            : <strong key={String(index)} className={classes.lightText}>{part.text}</strong>
        );

        return (
            <NavLink
                to={`${pathProductPageBase}/${suggestion.abstractSku}`}
                className={classes.textWithoutDecoration}
                onClick={() => clearSuggestion(suggestion.abstractName)}
            >
                <MenuItem selected={isHighlighted} component="div" className={classes.menuItem}>
                    <SquareImage
                        image={suggestion.images.length ? suggestion.images[0].externalUrlSmall : ''}
                        size={Number(listItemHeight)}
                        alt={suggestion.abstractName}
                    />

                    <div className={classes.description}>
                        <span className={classes.itemName}>
                            {highlightedLetters}
                        </span>

                        <AppPrice
                            value={
                                suggestion.prices && suggestion.prices.length
                                    ? suggestion.prices[0].grossAmount
                                    : suggestion.price
                            }
                            priceType={
                                suggestion.prices && suggestion.prices.length
                                    ? suggestion.prices[0].priceTypeName
                                    : ''
                            }
                            extraClassName={classes.mainPrice}
                        />

                        {suggestion.prices && suggestion.prices.length > 1 ? (
                            <AppPrice
                                value={suggestion.prices[1].grossAmount}
                                priceType={suggestion.prices[1].priceTypeName}
                                extraClassName={classes.oldPrice}
                            />
                        ) : null}
                    </div>
                </MenuItem>
            </NavLink>
        );
    }
}

export const Suggestions = withStyles(styles)(SuggestionsBase);
