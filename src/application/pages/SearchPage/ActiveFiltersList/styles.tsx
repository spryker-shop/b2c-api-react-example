import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing.unit * 6,
    },
    list: {
        paddingTop: theme.spacing.unit,
    },
    reset: {
        ...theme.appModules.chip,
        border: `none`,
        textAlign: 'center',
        marginTop: 0,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: 0,
        backgroundColor: theme.appColors.white,
        color: theme.appColors.blue,
        fontSize: theme.appFixedDimensions.fontSize.mini,
        fontWeight: 500,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        borderRadius: 0,
        transition: 'all .5s ease-in-out',
        '&:hover': {
            color: theme.appColors.white,
            backgroundColor: theme.appColors.blue,
            transition: 'all .5s ease-in-out',
        },
    },
    resetLabel: {
        paddingRight: theme.spacing.unit * 1.5,
    },
    price: {
        fontSize: theme.appFixedDimensions.fontSize.mini,
        fontWeight: 500,
    },
});
