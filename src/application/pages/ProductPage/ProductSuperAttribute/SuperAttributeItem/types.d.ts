import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ISuperAttributeData } from '@helpers/product/types';
import { styles } from './styles';

export interface ISuperAttributeItemProps extends WithStyles<typeof styles> {
    attributeItemData: ISuperAttributeData;
    isSelected: boolean;

    onSelect(attributeValue: string): void;
}
