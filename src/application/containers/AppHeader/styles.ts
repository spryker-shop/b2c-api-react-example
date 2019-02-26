import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    headerStickyContainer: {
        position: 'relative',
        zIndex: 999,
        pointerEvents: 'none',
    },
    header: {
        position: 'relative',
        pointerEvents: 'all',
    },
    headerTop: {
        background: theme.palette.primary.main,
        padding: '10px 0',
        position: 'relative',
        zIndex: 11,
    },
    headerSearchContainer: {
        width: '95%',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
            minWidth: 200,
        },
    },
    headerContainer: {
        ...theme.appContainerStyles,
        position: 'static',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTopContainer: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    logoContainer: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 10,
        },
    },
    headerBottom: {
        borderBottom: '1px solid #d8d8d8',
        padding: '8px 0',
        background: '#fff',
        zIndex: 5,
    },
    preloader: {
        top: '100%',
        padding: 0,
    },
    hamburger: {
        display: 'none',
        position: 'relative',
        width: 60,
        height: 40,
        cursor: 'pointer',
        zIndex: 11,
        '& span, &:before, &:after': {
            background: theme.palette.primary.main,
            transition: 'transform .3s .2s ease-in-out, opacity .4s .2s',
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -15,
            width: 27,
            height: 2,
        },
        '&:before': {transform: 'translate3d(0, -9px, 0)'},
        '&:after': {transform: 'translate3d(0, 9px, 0)'},
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    hamburgerOpened: {
        '&:before, &:after': {
            transition: 'transform .3s ease-in-out, opacity .4s .1s',
            transform: 'translate3d(0, 0, 0)',
            opacity: 0,
        },
        '& span': {
            transition: 'transform .3s .3s ease-in-out',
            '&:first-child': {transform: 'rotate(45deg)'},
            '&:last-child': {transform: 'rotate(-45deg)'},
        },
    },
    checkout: {
        lineHeight: '20px',
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: '0.3px',
    },
});
