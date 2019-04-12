import * as React from 'react';
import { pathProductPageBase } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { withStyles, MenuItem } from '@material-ui/core';
import { SquareImage } from '@application/components/SquareImage';
import { AppPrice } from '@application/components/AppPrice';
import { ISuggestionsProps as Props } from './types';
import { styles } from './styles';

export const SuggestionsComponent: React.SFC<Props> = (props): JSX.Element => {
    const { suggestion, classes, isHighlighted, clearSuggestion } = props;
    const isPriceExist = suggestion.prices && suggestion.prices.length;
    const isOldPriceExist = suggestion.prices && suggestion.prices.length > 1;

    return (
        <NavLink
            to={ `${pathProductPageBase}/${suggestion.abstractSku}` }
            className={ classes.textWithoutDecoration }
            onClick={ () => clearSuggestion(suggestion.abstractName) }
        >
            <MenuItem selected={ isHighlighted } component="div" className={ classes.menuItem }>
                <div className={ classes.imageWrapper }>
                    <SquareImage
                        classes={{ actionAreaOverlay: classes.imageOverlay, imgWrapper: classes.image }}
                        image={ suggestion.images.length ? suggestion.images[0].externalUrlSmall : '' }
                        alt={ suggestion.abstractName }
                    />
                </div>

                <div className={ classes.description }>
                    <span className={ classes.itemName }>{ suggestion.abstractName }</span>
                    <div className={ classes.prices }>
                        <span className={`${classes.priceItem} ${isOldPriceExist ?
                            classes.newPrice : classes.mainPrice}`}>
                            <AppPrice
                                value={ isPriceExist ? suggestion.prices[0].grossAmount : suggestion.price }
                                priceType={ isPriceExist ? suggestion.prices[0].priceTypeName : '' }
                            />
                        </span>

                        { isOldPriceExist &&
                            <span className={ `${classes.priceItem} ${classes.oldPrice}` }>
                                <AppPrice
                                    value={ suggestion.prices[1].grossAmount }
                                    priceType={ suggestion.prices[1].priceTypeName }
                                />
                            </span>
                        }
                    </div>
                </div>
            </MenuItem>
        </NavLink>
    );
};

export const Suggestions = withStyles(styles)(SuggestionsComponent);
