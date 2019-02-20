import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        borderTop: `1px solid ${theme.appColors.blockDivider}`,
        marginTop: theme.spacing.unit * 1.5,
    }
});
