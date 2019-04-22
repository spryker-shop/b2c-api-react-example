import * as React from 'react';
import { styles } from './styles';
import { WithStyles } from '@material-ui/core';

export interface INotificationsMessageProps {
    message?: string;
    messageWithCustomText?: string;
    type?: string;
    id?: string;
    icon?: React.ReactNode;
}

export interface INotificationsProps extends WithStyles<typeof styles> {}
