import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    pageHeader: {
        color: theme.appColors.black,
        fontSize: '32px',
        lineHeight: 1.13,
        letterSpacing: -0.8,
        marginBottom: theme.spacing.unit * 2,
    },
    form: {
        marginBottom: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 1.5,
    },
    submitButton: {
        marginTop: theme.spacing.unit * 2.5,
        marginBottom: theme.spacing.unit * 6,
    }
});
