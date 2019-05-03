import { INotificationsMessageProps } from '../types';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface INotificationsMessageWithStylesProps extends WithStyles<typeof styles>, INotificationsMessageProps {}
