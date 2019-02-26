import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    icon: {
        lineHeight: 0,
        minWidth: 25,
        marginRight: 16
    }
});
