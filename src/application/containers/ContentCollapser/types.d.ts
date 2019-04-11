import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ContentCollapserProps extends WithStyles<typeof styles> {
    maxHeight: number;
}

export interface ContentCollapserState {
    isOpen: boolean;
    shouldLimit: boolean;
}
