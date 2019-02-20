import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        justifyContent: 'space-between',
    },
    leftColumn: {
        maxWidth: 588,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    },
    rightColumn: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    }
});
