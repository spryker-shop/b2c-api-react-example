import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    appMainLayout: {
        maxWidth: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        [theme.breakpoints.up('md')]: {
            paddingLeft: 24,
            paddingRight: 24
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 50,
            paddingRight: 50
        }
    }
});
