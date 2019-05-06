import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItem } from '@interfaces/addresses';

export interface ICustomerAddressPageProps extends WithStyles<typeof styles> {
    customer: string | null;
    addresses: IAddressItem[];
    currentAddress: IAddressItem;
    isLoading: boolean;
    isAddressesInit: boolean;
    dispatch: Function;
    getAddressesAction: Function;
    deleteAddressAction: Function;
    setCurrentAddressAction: Function;
    routerPush: Function;
}
