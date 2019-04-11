import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 35,
        [theme.breakpoints.up('lg')]: {
            fontSize: 20
        }
    }
});
