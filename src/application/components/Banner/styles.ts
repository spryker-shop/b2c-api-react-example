import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.appColors.weekWhite,
        height: '100vh',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            height: 320,
        },
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
        },
    },
    imageContainer: {
        position: 'absolute',
        right: -65,
        left: '50%',
        top: 0,
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'bottom 40px right',
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
        paddingBottom: 20,
        color: theme.appColors.grey
    },
    text: {
        paddingBottom: 30,
        color: theme.appColors.grey
    },
    btn: {
        textTransform: 'uppercase',
    },
});
