import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteProps } from 'react-router-dom';
import { IOrderDetailsParsed, IOrderDetailsSelectedItems } from '@interfaces/order';
import { ICartAddItem } from '@interfaces/cart';

export interface ICustomerOrderDetailsProps extends WithStyles<typeof styles>, RouteProps {
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isAppDataSet: boolean;
    isUserLoggedIn: boolean;
    isInitiated: boolean;
    isOrderExist: boolean;
    getOrderDetailsAction: Function;
    orderIdParam: string;
    order: IOrderDetailsParsed;
}

export interface ICustomerOrderDetailsState {
    selectedItems: IOrderDetailsSelectedItems;
    selectedItemsData: ICartAddItem[];
}
