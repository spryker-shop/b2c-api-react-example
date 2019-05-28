import * as React from 'react';
import { pathProductPageBase } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { withStyles, MenuItem } from '@material-ui/core';
import { SquareImage } from '@components/SquareImage';
import { Price } from '@components/Price';
import { ISuggestionsProps as Props } from './types';
import { styles } from './styles';

const SuggestionsComponent: React.SFC<Props> = (props): JSX.Element => {
    const { suggestion, classes, isHighlighted, clearSuggestion } = props;
    const { prices, price } = suggestion;
    const isDefaultPriceExist = Boolean(prices && prices.priceDefaultGross);
    const isOriginalPriceExist = Boolean(prices && prices.priceOriginalGross);

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
                        image={ suggestion.image }
                        alt={ suggestion.abstractName }
                    />
                </div>

                <div className={ classes.description }>
                    <span className={ classes.itemName }>{ suggestion.abstractName }</span>
                    <div className={ classes.prices }>
                        <span
                            className={`
                               ${classes.priceItem} ${isOriginalPriceExist ? classes.newPrice : classes.mainPrice}
                            `}
                        >
                            <Price value={ isDefaultPriceExist ? prices.priceDefaultGross : price } />
                        </span>

                        { isOriginalPriceExist &&
                            <span className={ `${classes.priceItem} ${classes.oldPrice}` }>
                                <Price value={ prices.priceOriginalGross } isOriginal />
                            </span>
                        }
                    </div>
                </div>
            </MenuItem>
        </NavLink>
    );
};

export const Suggestions = withStyles(styles)(SuggestionsComponent);
