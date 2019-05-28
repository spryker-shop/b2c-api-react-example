import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

interface IPriceProps extends WithStyles<typeof styles> {
    currency: string | null;
    value: number | null;
    specificCurrency?: string | null;
    isOriginal?: boolean;
    isMinus?: boolean;
}
