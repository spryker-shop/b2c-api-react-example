import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { WithRouter } from '@interfaces/common';

export interface IAccountActionsProps extends WithStyles<typeof styles>, WithRouter {
    customerReference: string;
    routerPush: Function;
    deleteCustomerEntity?: (customerReference: string) => void;
}

export interface IAccountActionsState {
    isDeleteProfileDialogOpen: boolean;
}
