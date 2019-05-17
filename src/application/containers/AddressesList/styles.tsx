import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        margin: -7,
        width: 'auto',
        [theme.breakpoints.up('lg')]: {
            margin: -15
        }
    },
    col: {
        padding: 7,
        [theme.breakpoints.up('lg')]: {
            padding: 15
        }
    },
    addressContainer: {
        padding: '20px 100px 20px 15px',
        height: '100%',
        margin: 0,
        [theme.breakpoints.up('md')]: {
            padding: '21px 100px 33px 25px'
        }
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        top: 15,
        [theme.breakpoints.up('lg')]: {
            right: 25
        }
    },
    actionItem: {
        fill: theme.appColors.lightGrey,
        background: 'none',
        transition: 'fill 0.3s ease-in-out',
        '&:hover': {
            background: 'none'
        },
        [theme.breakpoints.up('lg')]: {
            padding: 10
        }
    },
    actionItemDisabled: {
        opacity: 0.6
    },
    actionDelete: {
        '&:hover': {
            fill: theme.appColors.red
        }
    },
    actionEdit: {
        '&:hover': {
            fill: theme.appColors.blue
        }
    }
});
