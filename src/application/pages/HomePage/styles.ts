import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    appMainLayout: {
        maxWidth: '100%',
        padding: '15px 16px 0',
        [theme.breakpoints.up('md')]: {
            padding: '24px 24px 0'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '40px 50px 0'
        }
    }
});
