import * as React from 'react';
import { connect } from './connect';
import { pathCartPage, pathCheckoutPage } from '@constants/routes';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { AppPrice } from '@application/components/AppPrice';
import { MiniCartItem } from '../MiniCartItem';
import { AppBtnLink } from '@application/components/AppBtnLink';
import { IMiniCartDropProps as Props } from './types';
import { styles } from './styles';

@connect
export class MiniCartDropComponent extends React.Component<Props> {
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
        const {classes, cartItems, totals} = this.props;

        return (
            <div className={classes.cartDrop}>
                <Typography gutterBottom component="h3" className={classes.title}>
                    <FormattedMessage id={'word.cart.title'} />
                </Typography>

                <ul className={classes.cartDropProductsList}>
                    {cartItems.map(cartItem => (
                        <li key={cartItem.sku}>
                            <MiniCartItem productData={cartItem} deleteItem={this.deleteFromCart} />
                        </li>
                    ))}
                </ul>

                <div className={classes.cartTotalContainer}>
                    {(!!totals.discountTotal && totals.discountTotal > 0) &&
                        <div className={classes.cartTotal}>
                            <Typography component="h5" className={classes.fontTotal}>
                                <FormattedMessage id={'word.discount.title'} />
                            </Typography>
                            <AppPrice
                                value={totals.discountTotal}
                                isMinus
                                extraClassName={classes.fontTotal}
                            />
                        </div>
                    }
                    <div className={classes.cartTotal}>
                        <Typography component="h5" className={classes.fontTotal}>
                            <FormattedMessage id={'word.total.title'} />
                        </Typography>
                        <AppPrice
                            value={totals.grandTotal}
                            extraClassName={classes.fontTotal}
                        />
                    </div>
                </div>

                <div className={classes.cartBtns}>
                    <AppBtnLink
                        title={<FormattedMessage id={'word.cart.title'} />}
                        path={pathCartPage}
                        extraClassName={classes.action}
                    />
                    <AppBtnLink
                        title={<FormattedMessage id={'word.checkout.title'} />}
                        path={pathCheckoutPage}
                        type="black"
                        extraClassName={classes.action}
                    />
                </div>
            </div>
        );
    }
}

export const MiniCartDrop = withStyles(styles)(MiniCartDropComponent);
