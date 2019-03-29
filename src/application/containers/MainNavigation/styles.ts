import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    mainNav: {
        display: 'flex',
        height: '100%',
        padding: '0 10px',
        [theme.breakpoints.down('sm')]: {
            transition: 'transform .3s ease-in-out',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100vh',
            background: '#fff',
            zIndex: 10,
            fontSize: '3.5vmin',
            transform: 'translate3d(-100%, 0, 0)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    mainNavOpened: {
        transform: 'translate3d(0, 0, 0)'
    },
    mainNavItem: {
        height: '100%',
        transition: 'background 0.3s ease-in-out',
        borderRadius: 4,
        '&:hover': {
            background: theme.appColors.weekWhite
        },
        '&:hover > div': {
            pointerEvents: 'auto',
            visibility: 'visible',
            opacity: 1
        }
    },
    mainNavItemContainer: {
        position: 'relative'
    },
    subNavLayout: {
        transition: 'visibility 0.2s ease-in-out, opacity 0.2s ease-in-out',
        visibility: 'hidden',
        opacity: 0,
        pointerEvents: 'none'
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
        [theme.breakpoints.down('md')]: {
            padding: '0 10px'
        }
    }
});
