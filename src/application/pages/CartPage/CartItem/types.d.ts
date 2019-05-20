import { ICartItem } from '@interfaces/cart';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router';
import * as React from 'react';

export interface CartItemProps extends ICartItem, WithStyles<typeof styles>, RouteComponentProps<React.SFC> {
    quantities: number[];
    handleDeleteItem: Function;
    handleChangeQty: (name: string, value: number) => void;
    isUpdateToDefault: boolean;
}
