import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductAvailabilityProps extends WithStyles<typeof styles> {
    availability: string;
}
