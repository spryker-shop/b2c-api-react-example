import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItemOrder } from '@interfaces/addresses';

export interface IOrderAddressesProps extends WithStyles<typeof styles> {
    billingAddress: IAddressItemOrder;
    shippingAddress: IAddressItemOrder;
    billingBlockTitle: string | JSX.Element;
    shippingBlockTitle: string | JSX.Element;
}
