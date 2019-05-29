import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TPriceTypeName } from '@interfaces/product';

interface IAppPriceProps extends WithStyles<typeof styles> {
    currency: string | null;
    value: number | null;
    specificCurrency?: string | null;
    priceType?: TPriceTypeName;
    isMinus?: boolean;
}
