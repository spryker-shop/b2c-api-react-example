import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IProductAttributeNames, IProductAttributes } from '@interfaces/product';

export interface IProductAttributesProps extends WithStyles<typeof styles> {
    attributes: IProductAttributes;
    attributeNames: IProductAttributeNames | null;
}
