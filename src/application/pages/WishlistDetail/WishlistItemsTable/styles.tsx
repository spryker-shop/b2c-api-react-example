import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    tableAction: {
        cursor: 'pointer',
        transition: 'color .5s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
    },
    tableActionDisabled: {
        pointerEvents: 'none',
        opacity: 0.5
    },
    price: {
        fontSize: '0.875rem'
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column',
    },
    available: {
        color: theme.appColors.green
    },
    noAvailable: {
        color: theme.appColors.red
    },
    addAllBtn: {
        display: 'block',
        margin: '1.4375rem 0 0 auto',
        fontSize: '0.625rem',
        fontWeight: 'bold',
        transition: 'all 0.5s ease-in-out',
        '&:hover': {
            backgroundColor: theme.appColors.white,
            color: theme.palette.primary.main
        }
    },
    bodyCell: {
        '&:first-child': {
            paddingLeft: 0
        }
    },
    noItems: {
        marginTop: '2rem',
        fontSize: '1rem',
        fontWeight: 'bold'
    }
});
