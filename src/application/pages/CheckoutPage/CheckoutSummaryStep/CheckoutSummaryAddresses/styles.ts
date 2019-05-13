import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        padding: 0,
        background: 'none',
        margin: 0,
        fontSize: 14,
        letterSpacing: 0.1,
        [theme.breakpoints.up('lg')]: {
            fontSize: 15,
            letterSpacing: 0.2
        }
    },
    title: {
        fontSize: 15,
        paddingBottom: 6,
        [theme.breakpoints.up('lg')]: {
            fontSize: 20,
            letterSpacing: 14
        }
    }
});
