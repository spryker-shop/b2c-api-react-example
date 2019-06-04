import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    title: {
        paddingBottom: 20
    },
    submit: {
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            minWidth: 160,
            width: 'auto'
        }
    },
    form: {
        paddingBottom: 40,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 50
        }
    }
});
