import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        marginBottom: theme.spacing.unit * 2,
    },
    title: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
    },
    titleOuter: {
        textAlign: 'left',
    },
    valueOuter: {
        textAlign: 'right',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left',
        },
    },
    price: {
        fontWeight: 'bold',
    }
});
