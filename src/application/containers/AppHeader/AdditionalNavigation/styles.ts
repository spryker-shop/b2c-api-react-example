import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) => createStyles({
    addNavContainer: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        margin: '-8px 0',
        [theme.breakpoints.down('md')]: {
            position: 'relative',
        },
    },
    addNavItem: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    temporary: {
        width: 60,
        height: '100%',
        padding: 4,
        borderRadius: 4,
        '&:hover': {
            backgroundColor: theme.appColors.weekWhite
        }
    }
});
