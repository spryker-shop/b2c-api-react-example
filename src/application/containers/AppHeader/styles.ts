import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    header: {
        position: 'relative',
        zIndex: 999,
        pointerEvents: 'all',
        flexShrink: 0
    },
    content: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '15px 0',
        background: theme.appColors.white,
        boxShadow: '0 2px 16px 0 rgba(193, 193, 193, 0.5)',
        zIndex: 5,
        [theme.breakpoints.up('sm')]: {
            padding: '10px 0'
        }
    },
    container: {
        ...theme.appContainerStyles,
        position: 'static',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.only('md')]: {
            flexWrap: 'wrap'
        }
    },
    logoCol: {
        flexGrow: 1,
        [theme.breakpoints.up('lg')]: {
            flexGrow: 0
        }
    },
    logoContainer: {
        width: 96,
        height: 30,
        minWidth: 96,
        marginRight: 10,
        [theme.breakpoints.up('sm')]: {
            width: 170,
            height: 60,
            minWidth: 170
        },
        [theme.breakpoints.up('xl')]: {
            marginRight: 40
        }
    },
    hamburger: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        margin: '-15px 0',
        paddingRight: 17,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    checkout: {
        lineHeight: '20px',
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: '0.3px'
    },
    mainNav: {
        display: 'flex',
        alignSelf: 'stretch',
        [theme.breakpoints.only('md')]: {
            order: 10,
            height: 50,
            width: '100%',
            margin: '10px 0 -10px',
        },
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
        },
        [theme.breakpoints.up('lg')]: {
            margin: '-10px 0',
        }
    }
});
