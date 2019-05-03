import { IWishlist } from '@interfaces/wishlist';
import { IMenuItemSelect } from '@components/UI/SprykerSelect/types';

export const createWishlistMenuVariants = (
    wishlists: IWishlist[] | null
): IMenuItemSelect[] | null => {
    if (!wishlists) {
        return null;
    }

    const variants = wishlists.map((wishlist: IWishlist) => ({name: wishlist.name, value: wishlist.id}));

    return variants;
};
