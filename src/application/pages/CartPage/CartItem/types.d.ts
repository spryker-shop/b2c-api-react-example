import * as React from 'react';
import { ICartItem } from '@interfaces/cart';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface CartItemProps extends ICartItem, WithStyles<typeof styles> {
    quantities: number[];
    handleDeleteItem: Function;
    handleChangeQty: (event: React.ChangeEvent) => void;
    cartRejected: boolean;
}
