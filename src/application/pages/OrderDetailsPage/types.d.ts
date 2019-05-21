import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteProps } from 'react-router';
import { TRouterMatchParam } from '@helpers/router/types';
import { IOrderDetailsParsed, IOrderDetailsSelectedItems } from '@interfaces/order';
import { ICartAddItem } from '@interfaces/cart';

export interface IOrderDetailsPageProps extends WithStyles<typeof styles>, RouteProps {
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isAppDataSet: boolean;
    isUserLoggedIn: boolean;
    isInitiated: boolean;
    isOrderExist: boolean;
    getOrderData: Function;
    orderIdParam: TRouterMatchParam;
    order: IOrderDetailsParsed;
}

export interface IOrderDetailsPageState {
    selectedItems: IOrderDetailsSelectedItems;
    selectedItemsData: ICartAddItem[] | null;
}
