import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/ProductLabel/styles';
import { IProductLabel } from '@interfaces/product';

interface IProductLabelProps extends WithStyles<typeof styles> {
    label: IProductLabel[] | null;
}
