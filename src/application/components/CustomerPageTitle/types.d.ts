import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

interface ICustomerPageTitleProps extends WithStyles<typeof styles> {
    title: string;
    intro?: string | JSX.Element | null;
    extraClasses?: string;
    containerExtraClasses?: string;
}
