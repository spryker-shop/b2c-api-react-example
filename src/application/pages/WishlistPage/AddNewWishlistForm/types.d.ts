import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IAddNewWishlistFormProps extends WithStyles<typeof styles> {
    addWishlistAction?: (name: string) => void;
}

export interface IAddNewWishlistFormState {
    name: string;
}
