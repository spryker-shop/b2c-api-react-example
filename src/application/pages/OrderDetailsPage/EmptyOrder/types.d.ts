import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IEmptyOrderProps extends WithStyles<typeof styles> {
    intro: string | JSX.Element;
}
