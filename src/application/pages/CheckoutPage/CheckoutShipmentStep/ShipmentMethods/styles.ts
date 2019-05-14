import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    formItem: {
        paddingBottom: 18,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 75,
        },
        '&:last-child': {
            paddingBottom: 0
        }
    }
});
