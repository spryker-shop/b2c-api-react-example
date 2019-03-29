import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        paddingBottom: 130
    },
    productMain: {
        paddingBottom: 60
    },
});
