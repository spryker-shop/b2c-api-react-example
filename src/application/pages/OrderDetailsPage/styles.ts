import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        marginBottom: theme.spacing.unit * 7,
    },
    noOrders: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
    }
});
