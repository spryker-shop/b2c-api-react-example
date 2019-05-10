import { WithStyles } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { styles } from './styles';

export interface ICustomerProfilePageProps extends WithStyles<typeof styles>, RouteProps {
    isLoading: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    isCustomerDataExist: boolean;
    isAppDataSet: boolean;
    customerReference: string;
    routerPush: Function;

    getCustomerData: (customerReference: string) => void;
}
