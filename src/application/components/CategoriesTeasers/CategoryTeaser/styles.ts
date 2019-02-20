import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        height: 428,
        color: theme.appColors.black,
        marginBottom: theme.spacing.unit * 10.5,
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            height: 320,
        },
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
            marginBottom: theme.spacing.unit * 6,
        },
    },
    oddImage: {
        order: 2,
        [theme.breakpoints.down('xs')]: {
            order: 'inherit',
        },
    },
    evenImage: {},
    contentHolder: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    content: {
        flexBasis: 0,
        width: '80%',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    imageHolder: {
        [theme.breakpoints.down('md')]: {
            height: 320,
        },
    },
    thumbnail: {
        backgroundColor: theme.appColors.weakGrey,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: theme.appFixedDimensions.fontSize.xl,
        lineHeight: 1.06,
        letterSpacing: -0.9,
        marginBottom: theme.spacing.unit * 2,
    },
    text: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
        lineHeight: 'normal',
        letterSpacing: 0.5,
        marginBottom: theme.spacing.unit * 6,
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing.unit * 4,
        },
    },
    btn: {
        textTransform: 'uppercase',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
});
