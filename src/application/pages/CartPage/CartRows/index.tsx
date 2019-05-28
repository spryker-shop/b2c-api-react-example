import * as React from 'react';
import { connect } from './connect';
import { CartRowsProps as Props } from './types';
import { ICartItem } from '@interfaces/cart';
import { createCartItemAddToCart } from '@helpers/cart';
import { CartItem } from '../CartItem';
import { List } from '@material-ui/core';

@connect
export class CartRows extends React.Component<Props> {
    public componentDidUpdate = (prevProps: Props): void => {
        if (prevProps.cartRejected !== this.props.cartRejected) {
            this.props.updateCartFulfilledStateAction();
            this.forceUpdate();
        }
    };

    protected handleDeleteItem = (sku: string): void => {
        const { cartDeleteItemAction, cartId, isUserLoggedIn, anonymId } = this.props;

        cartDeleteItemAction(cartId, sku, anonymId, isUserLoggedIn);
    };

    protected handleChangeQty = (name: string, value: number): void => {
        const { cartId, isUserLoggedIn, anonymId, updateItemInCartAction } = this.props;

        updateItemInCartAction(createCartItemAddToCart(name, value), cartId, anonymId, isUserLoggedIn);
    };

    public render(): JSX.Element {
        const { items, cartRejected } = this.props;

        return (
            <List>
                { items.map((cartItem: ICartItem) => {
                    const quantities: number[] = [];
                    const maxItems = cartItem.availableQuantity < 10 ? cartItem.availableQuantity : 10;

                    for (let i = 0; i <= maxItems; i++) {
                        quantities.push(i);
                    }

                    return (
                        <CartItem
                            key={ cartItem.sku }
                            quantities={ quantities }
                            handleDeleteItem={ this.handleDeleteItem }
                            handleChangeQty={ this.handleChangeQty }
                            isUpdateToDefault={ cartRejected }
                            { ...cartItem }
                        />
                    );
                }) }
            </List>
        );
    }
}
