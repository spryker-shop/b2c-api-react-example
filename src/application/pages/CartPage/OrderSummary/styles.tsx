import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    title: {
        paddingBottom: 20,
        fontWeight: 700,
        fontSize: 18,

        [theme.breakpoints.up('lg')]: {
            fontSize: 20,
        }
    },
    navLink: {
        textDecoration: 'none',
        width: '100%'
    },
    info: {
        display: 'block',
        paddingTop: 20,
        fontSize: 14,
        letterSpacing: 0.1,
        color: theme.appColors.weakGrey,
        textAlign: 'center'
    },
    price: {
        fontSize: 15
    },
    totalText: {
        fontSize: 18
    },
    totalTextPrice: {
        fontSize: 20
    }
});
