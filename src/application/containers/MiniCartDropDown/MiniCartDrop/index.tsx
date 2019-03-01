import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import { pathCartPage, pathCheckoutPage } from '@constants/routes';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { AppPrice } from '@application/components/AppPrice';
import { MiniCartItem } from '../MiniCartItem';
import { IMiniCartDropProps as Props } from './types';
import { styles } from './styles';

@connect
class MiniCartDropComponent extends React.Component<Props> {
    protected deleteFromCart = (cartItemId: string): void => {
        const {
            cartDeleteItemAction,
            removeItemGuestCartAction,
            cartId,
            anonymId,
            isUserLoggedIn
        } = this.props;

        if (isUserLoggedIn) {
            cartDeleteItemAction(cartId, cartItemId);
        } else {
            removeItemGuestCartAction(cartId, cartItemId, anonymId);
        }
    };

    public render(): JSX.Element {
        const { classes, cartItems, totals, cartItemsQuantity, onMouseLeave, onMouseEnter } = this.props;

        return (
            <div className={ classes.cartDrop } onMouseLeave={ onMouseLeave } onMouseEnter={ onMouseEnter }>
                <div className={ classes.cartHeading }>
                    <Typography component="h4" variant="display1" color="inherit">
                        <FormattedMessage id={ 'word.my.cart.title' } />
                    </Typography>
                    <Typography component="span" variant="headline" color="inherit">
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
                            <MiniCartItem productData={ cartItem } deleteItem={ this.deleteFromCart } />
                        </li>
                    )) }
                </ul>

                <div className={ classes.cartTotalContainer }>
                    { (!!totals.discountTotal && totals.discountTotal > 0) &&
                        <div className={ classes.cartTotal }>
                            <Typography component="h5" variant="display1" className={ classes.fontTotal }>
                                <FormattedMessage id={ 'word.discount.title' } />
                            </Typography>
                            <AppPrice
                                value={ totals.discountTotal }
                                isMinus
                                extraClassName={`${classes.priceTotal} ${classes.discountPriceTotal}`}
                            />
                        </div>
                    }
                    <div className={ classes.cartTotal }>
                        <Typography component="h5" variant="display1" className={ classes.fontTotal }>
                            <FormattedMessage id={ 'word.total.title' } />
                        </Typography>
                        <AppPrice
                            value={ totals.grandTotal }
                            extraClassName={ classes.priceTotal }
                        />
                    </div>
                </div>

                <Grid container className={ classes.cartBtns } spacing={ 8 }>
                    <Grid item xs={ 6 }>
                        <Button
                            component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCartPage } /> }
                            variant="outlined"
                            fullWidth={ true }
                        >
                            <FormattedMessage id={ 'word.cart.title' } />
                        </Button>
                    </Grid>
                    <Grid item xs={ 6 }>
                        <Button
                            component={
                                ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCheckoutPage } />
                            }
                            variant="contained"
                            color="primary"
                            fullWidth={ true }
                        >
                            <FormattedMessage id={ 'word.checkout.title' } />
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const MiniCartDrop = withStyles(styles)(MiniCartDropComponent);
