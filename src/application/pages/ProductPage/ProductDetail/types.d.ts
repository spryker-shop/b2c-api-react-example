import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IProductPropFullData } from '@interfaces/product';

export interface IProductDetailProps extends WithStyles<typeof styles> {
    attributes: IProductPropFullData['attributes'];
    attributeNames: IProductPropFullData['attributeNames'];
    description: IProductPropFullData['description'];
    sku: IProductPropFullData['sku'];
}

export interface IProductDetailState {
    value: number;
}
