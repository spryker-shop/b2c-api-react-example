import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItem, IAddressItemOrder } from '@interfaces/addresses';

export interface IAddressDetailsProps extends WithStyles<typeof styles> {
    address: IAddressItem | IAddressItemOrder;
    title: string | JSX.Element;
}
