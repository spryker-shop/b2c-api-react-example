import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    header: {
        position: 'relative',
        zIndex: 999,
        pointerEvents: 'all',
        flexShrink: 0
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 60,
        padding: '5px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: theme.appColors.white,
        boxShadow: '0 2px 16px 0 rgba(193, 193, 193, 0.5)',
        zIndex: 5,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            height: 'auto',
            padding: '10px 0'
        }
    },
    container: {
        ...theme.appContainerStyles,
        position: 'static',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.only('md')]: {
            flexWrap: 'wrap'
        }
    },
    logoCol: {
        flexGrow: 1,
        [theme.breakpoints.up('lg')]: {
            flexGrow: 0
        }
    },
    logoContainer: {
        width: 96,
        height: 30,
        minWidth: 96,
        marginRight: 10,
        [theme.breakpoints.up('sm')]: {
            width: 170,
            height: 60,
            minWidth: 170
        },
        [theme.breakpoints.up('xl')]: {
            marginRight: 40
        }
    },
    hamburger: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        margin: '-15px 0',
        paddingRight: 17,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    hamburgerIcon: {
        lineHeight: 0,
        width: 26,
        height: 20,
        fill: theme.appColors.grey
    },
    mainNav: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignSelf: 'stretch',
            flexGrow: 1
        },
        [theme.breakpoints.only('md')]: {
            order: 10,
            height: 50,
            width: '100%',
            margin: '10px 0 -10px'
        },
        [theme.breakpoints.up('lg')]: {
            margin: '-10px 0'
        }
    },
    checkout: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 36,
        position: 'relative',
        lineHeight: 1.6,
        fontSize: 14,
        fontWeight: 500,
        color: theme.appColors.lightGrey,
        letterSpacing: 0.1,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 15,
            paddingLeft: 40
        }
    },
    checkoutIcon: {
        position: 'absolute',
        left: 2,
        top: 0,
        lineHeight: 0,
        width: 24,
        height: 24,
        fill: 'currentColor',
        [theme.breakpoints.up('sm')]: {
            left: 4
        }
    },
    checkoutPhone: {
        color: theme.appColors.black,
        textDecoration: 'none',
        outline: 'none',
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.grey
        },
        '@media (hover: none)': {
            '&:hover': {
                color: theme.appColors.black
            }
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 8px'
        }
    }
});
