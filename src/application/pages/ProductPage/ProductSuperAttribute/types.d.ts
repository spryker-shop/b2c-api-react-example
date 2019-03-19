import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ISuperAttribute } from '@helpers/product/types';
import { styles } from './styles';

export interface IProductSuperAttributeProps extends WithStyles<typeof styles> {
    productData: ISuperAttribute[] | null;

    onChange(selectedData: { name: string, value: string }): void;
}

export interface IProductSuperAttributeState {
    selectedValues: {
        [name: string]: string;
    } | null;
}
