import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        width: '90%',
        marginTop: '18px',
        marginLeft: '10%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: '0',
        },
    },
    title: {
        fontSize: theme.appFixedDimensions.fontSize.xl,
        fontWeight: 'normal',
        lineHeight: 1.13,
        letterSpacing: -0.8,
    },
    summaryTitle: {
        marginTop: theme.spacing.unit * 8,
        marginBottom: theme.spacing.unit * 2,
    },
    titleDivider: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
    },
    btnWrapper: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 10,
        height: '44px',
        borderRadius: '4px',
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: '1.5px',
    },
});
