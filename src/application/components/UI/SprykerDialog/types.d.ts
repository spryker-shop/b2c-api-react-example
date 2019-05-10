import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ISprykerDialogProps extends WithStyles<typeof styles> {
    handleShow?: () => void;
    isOpen?: boolean;
}
