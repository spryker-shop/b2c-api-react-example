import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.appColors.white,
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0,
        '&:after, &:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: 7000,
            zIndex: -1
        },
        '&:after': {
            transform: 'skewY(-30deg) translateY(-103%)',
            backgroundColor: theme.appColors.weekWhite
        },
        '&:before': {
            transform: 'skewY(30deg) translateY(3%)',
            backgroundColor: theme.appColors.darkWhite
        },
        [theme.breakpoints.down('sm')]: {
            height: 320
        },
        [theme.breakpoints.down('xs')]: {
            height: 'auto'
        }
    },
    container: {
        ...theme.appContainerStyles,
        height: '100%'
    },
    imageContainer: {
        position: 'relative',
        height: '100%'
    },
    image: {
        position: 'absolute',
        right: -50,
        left: -50,
        top: 0,
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom 40px right',
        [theme.breakpoints.down('md')]: {
            right: 0,
            left: 0,
            backgroundPosition: 'center'
        }
    },
    content: {
        alignItems: 'center',
        height: '100%'
    },
    holder: {
        padding: '30px 0'
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 20,
        color: theme.appColors.grey
    },
    text: {
        paddingBottom: 30,
        color: theme.appColors.grey
    },
    btn: {
        minWidth: 160
    }
});
