import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    button: {
        height: 44,
        borderRadius: theme.appFixedDimensions.borderRadius,
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: 1.5,
        fontWeight: 500,
        lineHeight: 1,
        backgroundColor: theme.appColors.deepBlack,
    },
    icon: {
        marginLeft: theme.spacing.unit * 2,
    },
});
