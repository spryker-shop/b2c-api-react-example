import { WithStyles } from '@material-ui/core';
import { RouteProps } from 'react-router-dom';
import { styles } from './styles';

export interface ICustomerProfileProps extends WithStyles<typeof styles>, RouteProps {
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isCustomerDataExist: boolean;
    isAppDataSet: boolean;
    customerReference: string;
    getCustomerProfileAction: (customerReference: string) => void;
}
