import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/AppPageHeadline/styles';

interface IAppPageHeadlineProps extends WithStyles<typeof styles> {
    title: string;
    extraClass?: string;
}
