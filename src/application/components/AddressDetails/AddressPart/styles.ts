import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    bold: {
        fontWeight: 600,
    },
    item: {
        marginRight: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit,
    }
});
