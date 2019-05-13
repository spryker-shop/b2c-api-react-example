import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    box: {
        padding: '18px 10px',
        background: theme.appColors.white,
        borderRadius: 4,
        marginBottom: 20,
        [theme.breakpoints.up('lg')]: {
            padding: '25px 20px 20px'
        }
    },
    title: {
        paddingBottom: 12,
        fontSize: 18,
        fontWeight: 700,
        [theme.breakpoints.up('lg')]: {
            fontSize: 20
        }
    },
    totals: {
        paddingBottom: 10,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20
        }
    },
    totalsInner: {
        padding: '20px 15px 18px',
        marginBottom: 10,
        background: theme.appColors.weekWhite,
        borderRadius: 4
    },
    totalPrice: {
        fontSize: 15,
        fontWeight: 500
    },
    totalTextPrice: {
        fontSize: 18
    },
    productHeading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        marginBottom: 20,
        borderBottom: `1px solid ${theme.appColors.weekWhite}`
    },
    editLink: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        letterSpacing: 0.2,
        color: theme.appColors.weakGrey,
        transition: 'color 0.3s ease-in-out',
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.blue,
            '& $editDecor': {
                background: 'rgba(8, 148, 161, 0.1)'
            }
        }
    },
    editDecor: {
        width: 30,
        height: 30,
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: theme.appColors.weekWhite,
        transition: 'background 0.3s ease-in-out'
    },
    editIcon: {
        width: 16,
        height: 16,
        fill: 'currentColor',
        lineHeight: 0
    },
    amountHolder: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    amount: {
        padding: '6px 14px',
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        fontSize: 15,
        letterSpacing: 0.2,
        color: theme.appColors.weakGrey,
        lineHeight: 1
    },
    secure: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: theme.appColors.lightGrey
    },
    secureIcon: {
        fill: 'currentColor',
        width: 13,
        height: 17
    },
    secureText: {
        fontSize: 14,
        fontWeight: 500,
        paddingLeft: 9
    }
});
