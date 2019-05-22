import { IProductAttributes, ISuperAttribute } from '@interfaces/product';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IProductSuperAttributeProps extends WithStyles<typeof styles> {
    superAttributes: ISuperAttribute[] | null;
    superAttrSelected: IProductAttributes;
    onChange: (name: string, value: string) => void;
}
