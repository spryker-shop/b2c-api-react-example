import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItem } from '@interfaces/addresses';

export interface ICustomerAddressesProps extends WithStyles<typeof styles> {
    customer: string;
    addresses: IAddressItem[];
    currentAddress: IAddressItem;
    isLoading: boolean;
    isAddressesInit: boolean;
    getAddressesAction: Function;
    routerPush: Function;
}
