import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ISuperAttribute } from '@helpers/product/types';
import { styles } from './styles';

export interface ISuperAttributeBlockProps extends WithStyles<typeof styles> {
    attributeData: ISuperAttribute;
    onValueChanged(selectedData: { name: string, value: string }): void;
}

export interface ISuperAttributeBlockState {
    selectedItemValue: string;
}
