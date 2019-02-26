import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    title: {
        fontSize: theme.appFixedDimensions.fontSize.big,
        fontWeight: 'bold',
        letterSpacing: 0.6,
        marginBottom: theme.spacing.unit * 2,
    },
});
