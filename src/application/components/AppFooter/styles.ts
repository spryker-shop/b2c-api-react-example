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
    footerContainer: {
        ...theme.appContainerStyles,
    },
    footerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 -15px',
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
        },
    },
    footerCol: {
        padding: '0 15px',
        flexShrink: 1,
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
    footerColNavigation: {
        width: '56%',
    },
    footerColLogo: {
        width: '44%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 35,
        },
    },
    logoContainer: {
        ...theme.appFixedDimensions.sprykerLogo
    },
    partners: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 35,
        },
    },
    languageSwitcher: {
        // width: 123
    },
});
