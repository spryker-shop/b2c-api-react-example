import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    filters: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            width: 260,
        }
    },
    filterList: {
        paddingBottom: 10
    },
    categoriesList: {
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    }
});
