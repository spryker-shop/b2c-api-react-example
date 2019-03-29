import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    backdrop: {
        content: '""',
        position: 'absolute',
        left: '100%',
        top: 0,
        height: '100vh',
        width: 999,
        background: 'rgba(0, 0, 0, 0.2)',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    close: {
        position: 'absolute',
        left: '100%',
        top: 16,
        marginLeft: 16,
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: theme.appColors.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    closeIcon: {
        width: 12,
        height: 12,
        lineHeight: 0
    },
    mainNav: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'calc(100% - 50px)',
        maxWidth: 325,
        height: '100vh',
        background: theme.appColors.white,
        padding: '9px 0',
        zIndex: 1,
        [theme.breakpoints.up('md')]: {
            position: 'static',
            background: 'none',
            display: 'flex',
            height: 'auto',
            padding: 0,
            width: '100%',
            maxWidth: 'none'
        }
    },
    mainNavOpened: {

    },
    mainNavInner: {
        height: '100%',
        overflow: 'auto',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            overflow: 'visible'
        },
        [theme.breakpoints.only('md')]: {
            width: '100%'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 10px'
        }
    },
    mainNavItem: {
        borderBottom: '1px solid rgba(206, 206, 208, 0.3)',
        display: 'block',
        [theme.breakpoints.up('md')]: {
            height: '100%',
            transition: 'background 0.3s ease-in-out',
            borderRadius: 4,
            border: 0
        },
        [theme.breakpoints.only('md')]: {
            flexGrow: 1
        }
    },
    mainNavItemHoverable: {
        '&:hover': {
            background: theme.appColors.weekWhite
        },
        '&:hover > div': {
            pointerEvents: 'auto',
            visibility: 'visible',
            opacity: 1
        }
    },
    mainNavItemSelected: {
        background: theme.appColors.weekWhite,
        '& > div': {
            pointerEvents: 'auto',
            visibility: 'visible',
            opacity: 1
        }
    },
    mainNavItemOpened: {
        '& > div': {
            display: 'block'
        }
    },
    mainNavItemContainer: {
        position: 'relative'
    },
    mainNavLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px 40px 16px 16px',
        height: '100%',
        color: theme.appColors.grey,
        textDecoration: 'none',
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'none',
        letterSpacing: 0.2,
        cursor: 'pointer',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            position: 'static',
            whiteSpace: 'nowrap',
            fontWeight: 400,
            fontSize: 15,
            padding: '0 7px'
        },
        [theme.breakpoints.only('md')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.up('xl')]: {
            padding: '0 10px'
        }
    },
    chevron: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: 40,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    chevronIcon: {
        fill: theme.appColors.black,
        width: 12,
        height: 12,
        lineHeight: 0
    },
    chevronIconOpened: {
        fill: theme.appColors.blue,
        transform: 'scaleY(-1)'
    },
    subNavLayout: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            position: 'absolute',
            left: 0,
            top: '100%',
            width: '100vw',
            transition: 'visibility 0.2s ease-in-out, opacity 0.2s ease-in-out',
            visibility: 'hidden',
            opacity: 0
        }
    },
    subNavSimple: {
        minWidth: '100%',
        width: 'auto'
    },
    subBackdrop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            position: 'absolute',
            left: '50%',
            top: 0,
            height: '100vh',
            transform: 'translateX(-50%)',
            width: 9999,
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: -1
        }
    },
    subBackdropHoverable: {
        pointerEvents: 'none'
    }
});
