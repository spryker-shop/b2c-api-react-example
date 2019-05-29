import { ICartItem } from '@interfaces/cart';

export interface CartRowsProps {
    items?: ICartItem[] | null;
    cartId?: string;
    isUserLoggedIn?: boolean;
    anonymId?: string;
    updateItemInCartAction?: Function;
    cartDeleteItemAction?: Function;
    updateCartFulfilledStateAction?: Function;
    cartRejected?: boolean;
}
