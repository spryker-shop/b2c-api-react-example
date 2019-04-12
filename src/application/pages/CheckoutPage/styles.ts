import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        background: theme.appColors.weekWhite,
        paddingBottom: 50
    },
    container: {
        display: 'flex',
        margin: -10,
    },
    contentColumn: {
        width: '62%',
        padding: 10,
    },
    summaryColumn: {
        width: '38%',
        padding: 10,
    },
    fullWidth: {
        width: '100%'
    }
});
