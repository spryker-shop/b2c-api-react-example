import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: theme.appFixedDimensions.fontSize.big
    },
});
