import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IAccountActionsProps extends WithStyles<typeof styles> {
    customerReference: string;
    routerPush: Function;
    deleteCustomerEntity?: (customerReference: string) => void;
}

export interface IAccountActionsState {
    isDeleteProfileDialogOpen: boolean;
}
