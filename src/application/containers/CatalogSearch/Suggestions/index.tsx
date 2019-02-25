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
    const listItemHeight = 45;
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
                        extraOverlayClassName={ classes.imageOverlay }
                        image={ suggestion.images.length ? suggestion.images[0].externalUrlSmall : '' }
                        size={ listItemHeight }
                        alt={ suggestion.abstractName }
                    />
                </div>

                <div className={ classes.description }>
                    <span className={ classes.itemName }>{ suggestion.abstractName }</span>
                    <div className={ classes.prices }>
                        <AppPrice
                            value={ isPriceExist ? suggestion.prices[0].grossAmount : suggestion.price }
                            priceType={ isPriceExist ? suggestion.prices[0].priceTypeName : '' }
                            extraClassName={ `${classes.priceItem} ${isOldPriceExist ?
                                classes.newPrice : classes.mainPrice}` }
                        />

                        { isOldPriceExist &&
                            <AppPrice
                                value={ suggestion.prices[1].grossAmount }
                                priceType={ suggestion.prices[1].priceTypeName }
                                extraClassName={ `${classes.priceItem} ${classes.oldPrice}` }
                            />
                        }
                    </div>
                </div>
            </MenuItem>
        </NavLink>
    );
};

export const Suggestions = withStyles(styles)(SuggestionsComponent);
