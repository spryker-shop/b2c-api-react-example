import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 60,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 130
        }
    },
    categoriesList: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block'
        }
    }
});
