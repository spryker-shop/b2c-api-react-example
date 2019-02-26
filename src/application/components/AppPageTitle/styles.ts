import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        borderBottom: `1px solid ${theme.appColors.blockDivider}`,
        paddingBottom: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 6,
    },
    pageHeader: {
        fontSize: theme.appFixedDimensions.fontSize.xxl,
        lineHeight: 1.06,
        letterSpacing: -0.9,
        marginBottom: theme.spacing.unit * 2,
    },
    paragraph: {
        fontSize: '1rem',
        fontStyle: 'italic',
        lineHeight: 1.25,
        letterSpacing: -0.4,
        marginBottom: 0,
    },
});
