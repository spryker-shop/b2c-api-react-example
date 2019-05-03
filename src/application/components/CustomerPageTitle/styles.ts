import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    pageHeader: {
        color: theme.appColors.black,
        fontSize: theme.appFixedDimensions.fontSize.xl,
        lineHeight: 1.1,
        letterSpacing: -0.8,
        textTransform: 'capitalize',
    },
    container: {
        paddingBottom: theme.spacing.unit * 2,
        borderBottom: `1px solid ${theme.appColors.blockDivider}`
    },
    intro: {
        marginTop: theme.spacing.unit,
        marginBottom: 0,
    }
});
