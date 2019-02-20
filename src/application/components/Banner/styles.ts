import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.appColors.weakGrey,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center left',
        height: 520,
        color: theme.appColors.white,
        [theme.breakpoints.down('md')]: {
            height: 320,
        },
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
        },
    },
    container: {
        ...theme.appContainerStyles,
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
    },
    holder: {
        flexBasis: 0,
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing.unit * 4,
            marginTop: theme.spacing.unit * 4,
        },
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: theme.appFixedDimensions.fontSize.xxxl,
        maxWidth: '75%',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing: -0.8,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            fontSize: theme.appFixedDimensions.fontSize.xl,
        },
    },
    titlePart: {
        display: 'flex',
    },
    text: {
        fontSize: theme.appFixedDimensions.fontSize.huge,
        lineHeight: 1.15,
        letterSpacing: 0.1,
        marginBottom: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 1.5,
    },
    btn: {
        textTransform: 'uppercase',
    },
});
