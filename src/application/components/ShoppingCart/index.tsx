import * as React from 'react';
import { withStyles, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { styles } from './styles';
import { IShoppingCartProps as Props } from './types';

export const ShoppingCartBase: React.SFC<Props> = (props): JSX.Element => {
    const {cartItemsQuantity, cartProductsQuantity, classes} = props;

    const shoppingCart = (
        <ShoppingCartIcon className={ classes.icon } />
    );

    const shoppingCartWithQuantity = (
        <Badge
            badgeContent={ cartItemsQuantity }
            color="primary"
            classes={ { badge: classes.badge } }
        >
            { shoppingCart }
        </Badge>
    );

    return (
        cartItemsQuantity ? shoppingCartWithQuantity : shoppingCart
    );
};

export const ShoppingCart = withStyles(styles)(ShoppingCartBase);
