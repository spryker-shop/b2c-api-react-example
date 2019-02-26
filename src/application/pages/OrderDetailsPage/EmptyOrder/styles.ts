import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    intro: {
        marginTop: theme.spacing.unit * 4,
        fontSize: theme.appFixedDimensions.fontSize.medium,
        lineHeight: 2,
        letterSpacing: 0.5,
    },
});
