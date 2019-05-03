import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

import { TCustomerReference } from '@interfaces/customer';

export interface IAccountActionsProps extends WithStyles<typeof styles> {
    customerReference: TCustomerReference;
    routerPush: Function;
    deleteCustomerEntity?: (customerReference: TCustomerReference) => void;
}

export interface IAccountActionsState {
    isDeleteProfileDialogOpen: boolean;
}
