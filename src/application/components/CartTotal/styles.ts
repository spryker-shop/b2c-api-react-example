import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    fullWidth: {
        width: '100%',
    },
    totalMsg: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing.unit * 3,
    },
    currency: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
        fontWeight: 'normal',
        letterSpacing: '0.5px',
    },
    marginBottom: {
        marginBottom: theme.spacing.unit * 3,
    },
    grandTotal: {
        marginBottom: theme.spacing.unit * 3,
        fontSize: '24px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        color: theme.appColors.black,
    },
});
