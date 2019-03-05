import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    row: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    total: {
        paddingBottom: 30
    },
    totalText: {
        fontWeight: 700
    }
});
