import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IDescriptionAttributes, IProductPropFullData } from '@interfaces/product';

export interface IProductDetailProps extends WithStyles<typeof styles> {
    descriptionAttributes: IDescriptionAttributes[];
    description: IProductPropFullData['description'];
    sku: IProductPropFullData['sku'];
}

export interface IProductDetailState {
    value: number;
}
