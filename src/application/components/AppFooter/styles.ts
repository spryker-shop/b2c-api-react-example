import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    footer: {
        background: theme.appColors.weekWhite,
        padding: '64px 0',
        flexShrink: 0,
        [theme.breakpoints.down('md')]: {
            padding: '35px 0',
        },
    },
    footerCol: {
        display: 'flex',
        width: '25%',
        flexGrow: 1,
        flexShrink: 1,
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            margin: '0 auto',
            flexGrow: 0,
            justifyContent: 'center',
            textAlign: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '0 auto',
        },
    },
    footerColLogo: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 35,
        },
    },
    partners: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 35,
        },
    },
    footerContainer: {
        ...theme.appContainerStyles,
        display: 'flex',
        alignItems: 'stretch',
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
        },
    },
});
