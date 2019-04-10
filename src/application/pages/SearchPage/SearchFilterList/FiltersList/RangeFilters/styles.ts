import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    gridItem: {},
    rangeFilters: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 300
        }
    }
});
