import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    text: {
        paddingBottom: 20
    },
    textMessage: {
        fontSize: 15,
        [theme.breakpoints.up('lg')]: {
            fontSize: 18
        }
    },
    submit: {
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            minWidth: 160,
            width: 'auto'
        }
    }
});
