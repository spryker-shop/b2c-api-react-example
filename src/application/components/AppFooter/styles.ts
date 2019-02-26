import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    footer: {
        background: theme.appColors.weekWhite,
        padding: '58px 0 8px',
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            padding: '35px 0'
        }
    },
    container: {
        ...theme.appContainerStyles
    },
    navigation: {
        paddingBottom: 11,
        marginBottom: 26,
        borderBottom: '1px solid rgba(206, 206, 208, 0.3)',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 -15px',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap'
        }
    },
    col: {
        padding: '0 15px 15px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            margin: '0 auto',
            flexGrow: 0,
            justifyContent: 'center',
            textAlign: 'center'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '0 auto'
        }
    },
    colNavigation: {
        width: '56%',
        flexShrink: 0,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    colLogo: {
        width: '44%',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 35
        }
    },
    logo: {
        ...theme.appFixedDimensions.sprykerLogo
    },
    copyrights: {
        color: theme.appColors.black,
        opacity: 0.4,
        fontSize: 14
    }
});
