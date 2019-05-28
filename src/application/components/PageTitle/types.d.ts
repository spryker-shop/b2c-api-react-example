import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

interface IPageTitleProps extends WithStyles<typeof styles> {
    title: string | JSX.Element;
}
