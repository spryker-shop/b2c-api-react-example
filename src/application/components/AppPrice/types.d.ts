import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

interface IAppPriceProps extends WithStyles<typeof styles> {
    currency: string | null;
    value: number | null;
    specificCurrency?: string | null;
    isOriginal?: boolean;
    isMinus?: boolean;
}
