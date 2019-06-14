import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductGeneralInfoProps extends WithStyles<typeof styles> {
    name: string;
    sku: string;
    price: number;
    oldPrice: number;
    isAvailable: boolean;
}
