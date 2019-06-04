import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ICustomerDataParsed } from '@interfaces/customer';
import { IOrderItem } from '@interfaces/order';
import { IAddressItem } from '@interfaces/addresses';
import { RouteComponentProps } from 'react-router-dom';

export interface ICustomerOverviewProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    customerData: ICustomerDataParsed;
    isAppDataSet: boolean;
    isLoading: boolean;
    customerReference: string;
    orders: IOrderItem[];
    getCustomerProfileAction: (customerReference: string) => void;
    getOrdersCollectionAction: () => void;
    isCustomerDataExist: boolean;
    isAddressesListInitiated?: boolean;
    isHasOrders?: boolean;
    addresses?: IAddressItem[];
    logoutAction?: () => void;
}
