import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { InputChangeEvent } from '@interfaces/common';

export interface IWishlistsListItemProps extends WithStyles<typeof styles> {
    id: string;
    activeListId: string;
    name: string;
    numberOfItems: number;
    date: string;
    isLoading: boolean;
    activeListName: string;
    handleChangeUpdatedName: (event: InputChangeEvent) => void;
    handleUpdateWishlist: (id: string, name: string) => void;
    handleDeleteWishlist: (wishlistId: string) => void;
}
