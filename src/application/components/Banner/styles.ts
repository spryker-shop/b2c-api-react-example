import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.appColors.white,
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
            transform: 'skewY(-30deg) translateY(-102%)',
            backgroundColor: theme.appColors.weekWhite
        },
        '&:before': {
            transform: 'skewY(30deg) translateY(2%)',
            backgroundColor: theme.appColors.darkWhite
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: 0,
            '&:after': {
                transform: 'skewY(-30deg) translateY(-103%)'
            },
            '&:before': {
                transform: 'skewY(30deg) translateY(3%)'
            },
        },
        [theme.breakpoints.up('xl')]: {
            minHeight: 0,
            height: '100vh',
            maxHeight: 800
        }
    },
    container: {
        ...theme.appContainerStyles,
        height: '100%'
    },
    imageContainer: {
        position: 'relative',
        alignSelf: 'stretch',
        [theme.breakpoints.up('xl')]: {
            height: '100%'
        }
    },
    image: {
        position: 'absolute',
        right: 10,
        width: '185%',
        top: '50%',
        transform: 'translateY(-50%)',
        height: '90%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom right',
        [theme.breakpoints.up('md')]: {
            width: '150%',
            right: 40,
            backgroundPosition: 'center',
        },
        [theme.breakpoints.up('lg')]: {
            width: '100%'
        },
        [theme.breakpoints.up('xl')]: {
            right: -50,
            left: -50,
            top: 'auto',
            bottom: 40,
            transform: 'none',
            width: 'auto',
            backgroundPosition: 'bottom right'
        }
    },
    content: {
        alignItems: 'center',
        height: '100%',
        minHeight: 388,
        [theme.breakpoints.up('md')]: {
            minHeight: 588
        },
        [theme.breakpoints.up('xl')]: {
            minHeight: 0,
            height: '100%'
        }
    },
    holder: {
        padding: '30px 0 60px',
        position: 'relative',
        zIndex: 2,
        [theme.breakpoints.up('md')]: {
            padding: '30px 0',
        },
        [theme.breakpoints.up('xl')]: {
            padding: '60px 0'
        }
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 20,
        color: theme.appColors.grey
    },
    text: {
        paddingBottom: 30,
        color: theme.appColors.grey,
        [theme.breakpoints.only('md')]: {
            fontSize: 16,
            lineHeight: 1.5
        }
    },
    btn: {
        minWidth: 160
    }
});
