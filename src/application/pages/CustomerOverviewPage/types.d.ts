import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ICustomerDataParsed } from '@interfaces/customer';
import { IOrderItem } from '@interfaces/order';
import { IAddressItem } from '@interfaces/addresses';

export interface ICustomerOverviewPageProps extends WithStyles<typeof styles> {
    customerData: ICustomerDataParsed;
    isAppDataSet: boolean;
    isLoading: boolean;
    customerReference: string;
    orders: IOrderItem[] | null;
    getCustomerData: (customerReference: string) => void;
    getOrdersCollectionAction: () => void;
    isCustomerDataExist: boolean;
    isAddressesListInitiated?: boolean;
    isHasOrders?: boolean;
    addresses?: IAddressItem[];
}
