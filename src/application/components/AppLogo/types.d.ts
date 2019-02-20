import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ReactNode } from 'react';

export interface ILogoProps extends WithStyles<typeof styles> {
    copyRights?: ReactNode | string;
    customLogo?: ReactNode;
}
