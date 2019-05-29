import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';
import * as React from 'react';
import { IIndexSignature } from '@interfaces/common';

export interface ICheckoutBreadcrumbsProps extends WithStyles<typeof styles>, RouteComponentProps<React.SFC> {
    classes: IIndexSignature;
    isUserLoggedIn: boolean;
}
