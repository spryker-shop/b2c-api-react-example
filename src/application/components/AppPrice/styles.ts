import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    price: {
        fontWeight: 500
    },
    strikethrough: {
        fontWeight: 400,
        textDecoration: 'line-through',
        color: theme.appColors.grey
    }
});
