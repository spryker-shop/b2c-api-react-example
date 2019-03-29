import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    selectRoot: {
        color: theme.appColors.grey
    },
    input: {
        color: theme.appColors.grey
    }
});
