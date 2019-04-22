import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';
import * as React from 'react';

export interface ICheckoutBreadcrumbsProps extends WithStyles<typeof styles>, RouteComponentProps<React.SFC> {
    classes: { [key: string]: string };
    isUserLoggedIn: boolean;
}
