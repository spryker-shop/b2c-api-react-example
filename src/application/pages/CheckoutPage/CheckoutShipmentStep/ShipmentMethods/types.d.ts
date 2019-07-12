import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IShipmentMethod } from '@interfaces/checkout';
import { ICheckoutPageState } from './types';

export interface IShipmentMethodProps extends WithStyles<typeof styles> {
    shipmentMethod: string;
    shipmentMethods: IShipmentMethod[];
    mutateShipmentMethodAction: (value: string, price: number) => void;
}
