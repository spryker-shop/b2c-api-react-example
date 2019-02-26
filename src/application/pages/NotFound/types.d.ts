import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface INotFoundState {}

export interface INotFoundProps extends WithStyles<typeof styles> {
    className: string;
}
