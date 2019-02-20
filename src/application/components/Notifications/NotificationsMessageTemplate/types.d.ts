import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface INotificationsMessage {
    message?: string;
    messageWithCustomText?: string;
    type?: string;
    id?: string;
    icon?: React.ReactNode;
}

export interface INotificationsMessageWithStyles extends WithStyles<typeof styles>, INotificationsMessage {}
