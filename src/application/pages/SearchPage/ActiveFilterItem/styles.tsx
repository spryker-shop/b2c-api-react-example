import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    chip: {
        ...theme.appModules.chip,
        marginTop: 0,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: 0,
        borderRadius: 2,
        border: `1px solid ${theme.appColors.blue}`,
        backgroundColor: theme.appColors.white,
        color: theme.appColors.blue,
        fontSize: theme.appFixedDimensions.fontSize.mini,
        fontWeight: 500,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            width: '100%',
        },
    },
    close: {
        color: theme.appColors.blue,
        fontSize: theme.spacing.unit * 2.3,
        backgroundColor: theme.appColors.white,
        borderRadius: '50%',
        transition: 'all .5s ease-in-out',
        '&:hover': {
            color: theme.appColors.white,
            backgroundColor: theme.appColors.blue,
            transition: 'all .5s ease-in-out',
        },
    },
    label: {
        paddingRight: theme.spacing.unit * 2.5,
    },
});
