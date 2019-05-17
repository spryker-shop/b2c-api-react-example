import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    box: {
        [theme.breakpoints.up('md')]: {
            marginBottom: 20,
            padding: '18px 10px',
            background: theme.appColors.white,
            borderRadius: 4,
        },
        [theme.breakpoints.up('lg')]: {
            padding: '25px 20px 20px'
        }
    },
    boxInner: {
        padding: '25px 14px',
        background: theme.appColors.white,
        borderRadius: 4,
        marginBottom: 10,
        [theme.breakpoints.up('md')]: {
            padding: 0,
            background: 'none',
            borderRadius: 0,
            margin: 0
        }
    },
    totals: {
        [theme.breakpoints.up('md')]: {
            paddingBottom: 20
        }
    },
    totalsInner: {
        padding: '20px 15px 18px',
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        [theme.breakpoints.up('md')]: {
            marginBottom: 10
        }
    },
    totalRow: {
        paddingBottom: 13,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20
        }
    },
    subheading: {
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.appColors.blue,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    subheadingOpened: {
        color: theme.appColors.lightGrey
    },
    subheadingTitle: {
        fontSize: 20,
        lineHeight: 1.4,
        letterSpacing: 0.2,
        fontWeight: 700,
        color: theme.appColors.black
    },
    subheadingTrigger: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px 0 4px 10px',
        lineHeight: 1,
        fontSize: 15,
        letterSpacing: 0.2
    },
    subheadingIcon: {
        height: 18,
        width: 26,
        display: 'flex',
        alignItems: 'center',
        marginRight: 10,
        fill: 'currentColor',
        lineHeight: 0
    },
    title: {
        paddingBottom: 12,
        fontSize: 18,
        fontWeight: 700,
        color: 'inherit',
        [theme.breakpoints.up('lg')]: {
            fontSize: 20
        }
    },
    productsWrapper: {
        display: 'none',
        paddingTop: 29,
        [theme.breakpoints.up('md')]: {
            display: 'block',
            paddingTop: 0
        }
    },
    productsWrapperOpened: {
        display: 'block'
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
        padding: '7px 12px',
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        fontSize: 14,
        letterSpacing: 0.2,
        color: theme.appColors.weakGrey,
        lineHeight: 1,
        [theme.breakpoints.up('lg')]: {
            fontSize: 15
        }
    },
    secure: {
        padding: '10px 0 30px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: theme.appColors.lightGrey,
        [theme.breakpoints.up('md')]: {
            padding: 0
        }
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
    },
    submitButton: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'inline-flex'
        }
    }
});
