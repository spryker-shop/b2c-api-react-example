import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingTop: theme.spacing.unit * 14,
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing.unit * 6,
        },
    },
    container: {},
});
