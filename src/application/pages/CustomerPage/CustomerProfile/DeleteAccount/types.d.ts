import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface IAccountActionsProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    customerReference: string;
    deleteCustomerAction?: (customerReference: string) => void;
}

export interface IAccountActionsState {
    isDeleteProfileDialogOpen: boolean;
}
