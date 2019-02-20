import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    container: {},
    title: {
        fontSize: theme.appFixedDimensions.fontSize.big,
        fontWeight: 'bold',
    },
});
