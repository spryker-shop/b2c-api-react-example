import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        padding: '20px 15px',
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        marginBottom: 20,
        position: 'relative',
        color: theme.appColors.grey,
        fontSize: 15,
        lineHeight: 1.9,
        letterSpacing: 0.2,
        [theme.breakpoints.up('lg')]: {
            padding: '25px 20px',
        }
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        paddingBottom: 9,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 14
        }
    }
});
