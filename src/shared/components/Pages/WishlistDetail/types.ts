import { WithStyles } from '@material-ui/core';
import { styles } from 'src/shared/components/Pages/WishlistDetail/styles';
import { IWishlist, IWishlistProduct } from 'src/shared/interfaces/wishlist';
import { ICartAddItem, TCartId } from 'src/shared/interfaces/cart';
import { LocationDescriptor, LocationState } from 'history';
import { RouterAction } from 'react-router-redux';
import {TAppCurrency} from "src/shared/interfaces/currency/index";

export interface WishlistPageProps extends WithStyles<typeof styles> {
  wishlist: IWishlist | null;
  products: Array<IWishlistProduct> | null;
  isLoading: boolean;
  currency: TAppCurrency;
  cartLoading: boolean;
  cartId: TCartId;
  cartItemsLength: number;
  deleteItemAction(wishlistId: string, sku: string): void;
  addItemToCartAction(payload: ICartAddItem, cartId: TCartId): void;
  multiItemsCartAction(cartId: TCartId, listItems: string[]): void;
  deleteMultiItemsAction(wishlistId: string, items: string[]): void;
  changeLocation(location: LocationDescriptor, state?: LocationState): RouterAction;
}

export interface WishlistPageState {
  movedItem: string;
  multiProducts: string[];
}
