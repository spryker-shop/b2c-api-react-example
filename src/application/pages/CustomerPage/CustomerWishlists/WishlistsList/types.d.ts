import { IWishlist } from '@interfaces/wishlist';

export interface IWishlistsListProps {
    isLoading?: boolean;
    wishlists?: IWishlist[];
    getWishlistsAction?: () => void;
    updateWishlistAction?: (wishlistId: string, name: string) => void;
    deleteWishlistAction?: (wishlistId: string) => void;
}

export interface IWishlistsListState {
    listName: string;
    listId: string;
    isUpdating: boolean;
}
