import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    mainNav: {
        display: 'flex',
        height: '100%',
        [theme.breakpoints.only('md')]: {
            width: '100%'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 10px'
        }
    },
    mainNavOpened: {
        transform: 'translate3d(0, 0, 0)'
    },
    mainNavItem: {
        height: '100%',
        transition: 'background 0.3s ease-in-out',
        borderRadius: 4,
        [theme.breakpoints.only('md')]: {
            flexGrow: 1
        },
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
    mainNavItemContainer: {
        position: 'relative'
    },
    mainNavLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        height: '100%',
        color: theme.appColors.grey,
        textDecoration: 'none',
        fontSize: 15,
        textTransform: 'none',
        letterSpacing: 0.2,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        [theme.breakpoints.only('md')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.up('md')]: {
            padding: '0 7px'
        },
        [theme.breakpoints.up('xl')]: {
            padding: '0 10px'
        }
    },
    subNavLayout: {
        position: 'absolute',
        left: 0,
        top: '100%',
        width: '100vw',
        transition: 'visibility 0.2s ease-in-out, opacity 0.2s ease-in-out',
        visibility: 'hidden',
        opacity: 0,
        pointerEvents: 'none'
    },
    subNavSimple: {
        minWidth: '100%',
        width: 'auto'
    },
    backdrop: {
        position: 'absolute',
        left: '50%',
        top: 0,
        height: '100vh',
        transform: 'translateX(-50%)',
        width: 9999,
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex: -1
    },
    backdropHoverable: {
        poinerEvents: 'none'
    }
});
