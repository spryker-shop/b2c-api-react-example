import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    success: {
        marginTop: '18px',
        position: 'relative',
    },
    container: {
        justifyContent: 'space-between',
    },
    link: {
        color: theme.appColors.black,
        fontWeight: 'bold',
        transition: 'color 0.5s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
    },
    thank: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        letterSpacing: '0.2px',
        lineHeight: '18px',
        marginTop: theme.spacing.unit * 4,
    },
    order: {
        fontWeight: 'bold',
        marginTop: theme.spacing.unit * 2,
    },
    doneIcon: {
        position: 'absolute',
        width: theme.spacing.unit * 3,
        height: theme.spacing.unit * 3,
        borderRadius: '50%',
        backgroundColor: theme.appColors.green,
        top: '8px',
        left: '124px',
        color: theme.appColors.white,
    }
});
