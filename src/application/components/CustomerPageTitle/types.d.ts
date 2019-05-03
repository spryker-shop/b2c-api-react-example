import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

interface ICustomerPageTitleProps extends WithStyles<typeof styles> {
    title: string | JSX.Element;
    intro?: string | JSX.Element | null;
    extraClasses?: string;
    containerExtraClasses?: string;
}
