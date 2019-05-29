import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

interface IPriceProps extends WithStyles<typeof styles> {
    currency: string;
    value: number;
    specificCurrency?: string;
    isOriginal?: boolean;
    isMinus?: boolean;
}
