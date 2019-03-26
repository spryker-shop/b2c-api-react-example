import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        padding: '21px 21px 11px',
        marginBottom: 30,
        background: theme.appColors.weekWhite,
        borderRadius: 4
    }
});
