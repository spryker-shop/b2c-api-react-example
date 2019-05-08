import * as React from 'react';
import { styles } from '@pages/CustomerPage/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { RouteComponentProps } from 'react-router';

export interface ICustomerPageProps extends WithStyles<typeof styles>, RouteComponentProps<React.SFC> {
    clearOrdersCollectionAction?: () => void;
    clearAddressAction?: () => void;
}
