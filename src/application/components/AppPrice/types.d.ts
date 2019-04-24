import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TAppCurrency } from '@interfaces/currency';
import { TPriceTypeName } from '@interfaces/product';

interface IAppPriceProps extends WithStyles<typeof styles> {
    currency: TAppCurrency;
    value: number | null;
    specificCurrency?: TAppCurrency;
    priceType?: TPriceTypeName;
    isMinus?: boolean;
}
