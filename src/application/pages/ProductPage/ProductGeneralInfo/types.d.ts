import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductGeneralInfoProps extends WithStyles<typeof styles> {
    name: string;
    sku: string;
    price: number | null;
    oldPrice: number | null;
    availability: string;
}
