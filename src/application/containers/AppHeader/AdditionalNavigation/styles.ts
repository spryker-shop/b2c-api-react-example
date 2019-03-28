import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) => createStyles({
    addNavContainer: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        flexGrow: 1,
        margin: '-15px -5px',
        [theme.breakpoints.up('sm')]: {
            flexGrow: 0,
            margin: '-10px 0'
        }
    },
    addNavItem: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 5px',
        width: '23%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            padding: 0
        },
    },
    iconButton: {
        maxWidth: 37,
        height: '100%',
        padding: 4,
        borderRadius: 4,
        lineHeight: 0,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 'none',
            width: 60
        },
        [theme.breakpoints.up('lg')]: {
            width: 50,
            '&:hover': {
                backgroundColor: theme.appColors.weekWhite
            }
        },
        [theme.breakpoints.up('xl')]: {
            width: 60
        }
    },
    isPopupOpened: {
        backgroundColor: theme.appColors.weekWhite
    },
    icon: {
        width: 20,
        height: 20,
        [theme.breakpoints.up('sm')]: {
            width: 25,
            height: 25
        }
    }
});
