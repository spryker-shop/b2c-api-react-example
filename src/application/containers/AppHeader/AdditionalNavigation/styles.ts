import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) => createStyles({
    addNavContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            position: 'relative',
        },
    },
    addNavItem: {
        transition: 'transform .3s ease-in-out',
        '&:not(:first-child)': {
            marginLeft: 8,
        },
    },
    addNavSearch: {
        transform: 'scale(0)',
    },
});
