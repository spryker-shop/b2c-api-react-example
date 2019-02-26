import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    paragraph: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        letterSpacing: -0.4,
        lineHeight: 1,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            marginBottom: theme.spacing.unit * 2,
        },
    },
});
