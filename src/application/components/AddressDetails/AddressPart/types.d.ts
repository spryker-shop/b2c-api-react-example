import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IAddressPart {
    text: string | React.ReactNode;
    isBold?: boolean;
}

export interface IAddressPartRow {
    key: string;
    data: IAddressPart[];
}

export interface IAddressPartProps extends WithStyles<typeof styles> {
    row: IAddressPartRow;
}
