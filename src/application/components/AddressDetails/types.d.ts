import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItemOrder } from '@interfaces/addresses';

export interface IAddressDetailsProps extends WithStyles<typeof styles>, IAddressItemOrder {
    blockTitle: string;
}
