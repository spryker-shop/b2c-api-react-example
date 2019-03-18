import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        display: 'inline-flex',
        border: `1px solid ${theme.appColors.deepBlack}`,
        textDecoration: 'none',
        backgroundColor: theme.appColors.white,
        color: theme.appColors.black,
        lineHeight: 'normal',
        letterSpacing: 1.5,
        fontSize: theme.appFixedDimensions.fontSize.medium,
        fontWeight: 500,
        borderRadius: theme.appFixedDimensions.borderRadius,
        paddingRight: theme.spacing.unit * 6,
        paddingLeft: theme.spacing.unit * 6,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        transition: 'all 0.4s ease',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'center',
        },

        '&:hover': {
            backgroundColor: theme.appColors.deepBlack,
            color: theme.appColors.white,
            transition: 'all 0.4s ease',
        }
    },

    black: {
        color: theme.appColors.white,
        backgroundColor: theme.appColors.deepBlack,
        '&:hover': {
            backgroundColor: theme.appColors.white,
            color: theme.appColors.deepBlack,
        }
    }
});
