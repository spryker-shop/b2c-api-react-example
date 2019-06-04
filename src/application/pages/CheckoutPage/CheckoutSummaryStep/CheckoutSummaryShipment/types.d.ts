import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IShipmentMethod } from '@interfaces/checkout';

export interface ICheckoutSummaryShipmentProps extends WithStyles<typeof styles> {
    shipmentMethods: IShipmentMethod[];
    shipmentMethod: string;
}
