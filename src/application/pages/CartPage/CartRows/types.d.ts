import { ICartItem, TCartId } from '@interfaces/cart';

export interface CartRowsProps {
    items?: ICartItem[] | null;
    cartId?: TCartId;
    isUserLoggedIn?: boolean;
    anonymId?: string;
    updateItemInCartAction?: Function;
    cartDeleteItemAction?: Function;
    removeItemGuestCartAction?: Function;
    updateGuestCartAction?: Function;
    updateCartFulfilledStateAction?: Function;
    cartRejected?: boolean;
}
