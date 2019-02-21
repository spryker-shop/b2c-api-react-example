import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    mainNav: {
        textTransform: 'uppercase',
        margin: `0 -${theme.spacing.unit * 2}px`,
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
            alignItems: 'center',
        },
    },
    mainNavOpened: {
        transform: 'translate3d(0, 0, 0)',
    },
    mainNavLink: {
        color: theme.appColors.grey,
        padding: `0 ${theme.spacing.unit * 2}px`,
        textDecoration: 'none',
        fontSize: 15,
        textTransform: 'none',
        letterSpacing: 0.2,
        '&:hover': {
            color: theme.appColors.blue,
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 0 5vmin',
        },
    },
});
