import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import { pathCartPage, pathCheckoutPage } from '@constants/routes';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { AppPrice } from '@components/AppPrice';
import { MiniCartItem } from '../MiniCartItem';
import { IMiniCartDropProps as Props } from './types';
import { styles } from './styles';

export const MiniCartDropComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        cartItems,
        totals,
        cartItemsQuantity,
        onMouseLeave,
        onMouseEnter,
        clearCheckoutDataForm
    } = props;

    const deleteFromCart = (cartItemId: string): void => {
        const {
            cartDeleteItemAction,
            removeItemGuestCartAction,
            cartId,
            anonymId,
            isUserLoggedIn
        } = props;

        if (isUserLoggedIn) {
            cartDeleteItemAction(cartId, cartItemId);

            return;
        }

        removeItemGuestCartAction(cartId, cartItemId, anonymId);
    };

    return (
        <div className={ classes.cartDrop } onMouseLeave={ onMouseLeave } onMouseEnter={ onMouseEnter }>
            <div className={ classes.cartHeading }>
                <Typography component="h4" variant="h4" color="inherit">
                    <FormattedMessage id={ 'word.my.cart.title' } />
                </Typography>
                <Typography component="span" variant="h5" color="inherit">
                    {`${cartItemsQuantity} `}
                    <FormattedPlural
                        value={ cartItemsQuantity }
                        one={ <FormattedMessage id={ 'word.item.title' } /> }
                        other={ <FormattedMessage id={ 'word.items.title' } /> }
                    />
                </Typography>
            </div>

            <ul className={ classes.cartDropProductsList }>
                { cartItems.map(cartItem => (
                    <li className={classes.cartDropProductsItem} key={ cartItem.sku }>
                        <MiniCartItem productData={ cartItem } deleteItem={ deleteFromCart } />
                    </li>
                )) }
            </ul>

            <div className={ classes.cartTotalContainer }>
                { (!!totals.discountTotal && totals.discountTotal > 0) &&
                    <div className={ classes.cartTotal }>
                        <Typography component="h5" variant="h4" className={ classes.fontTotal }>
                            <FormattedMessage id={ 'word.discount.title' } />
                        </Typography>
                        <span className={`${classes.priceTotal} ${classes.discountPriceTotal}`}>
                            <AppPrice value={ totals.discountTotal } isMinus />
                        </span>
                    </div>
                }
                <div className={ classes.cartTotal }>
                    <Typography component="h5" variant="h4" className={ classes.fontTotal }>
                        <FormattedMessage id={ 'word.total.title' } />
                    </Typography>
                    <span className={ classes.priceTotal }>
                        <AppPrice value={ totals.grandTotal }/>
                    </span>
                </div>
            </div>

            <Grid container className={ classes.cartBtns } spacing={ 8 }>
                <Grid item xs={ 6 }>
                    <Button
                        component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCartPage } /> }
                        variant="outlined"
                        fullWidth
                    >
                        <FormattedMessage id={ 'view.cart.title' } />
                    </Button>
                </Grid>
                <Grid item xs={ 6 }>
                    <Button
                        component={
                            ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCheckoutPage } />
                        }
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={ clearCheckoutDataForm }
                    >
                        <FormattedMessage id={ 'word.checkout.title' } />
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export const MiniCartDrop = connect(withStyles(styles)(MiniCartDropComponent));
