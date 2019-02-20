import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    noItems: {
        marginTop: '2rem',
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    updateCell: {
        display: 'flex',
    },
    link: {
        color: theme.palette.common.black,
        textDecoration: 'none',
        transition: 'color 0.5s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
    },
    tableAction: {
        cursor: 'pointer',
        transition: 'color 0.5s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
    },
    tableActionDisabled: {
        pointerEvents: 'none',
        opacity: 0.5
    },
    noItems: {
        marginTop: '2rem',
        fontSize: '1rem',
        fontWeight: 'bold'
    }
});
