import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IAddNavProps extends WithStyles<typeof styles> {
    showSearch: boolean;
    isSticky: boolean;
    pageWidth: number;
    pageHeight: number;
    handleSearch(): void;
}
