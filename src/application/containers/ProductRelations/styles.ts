import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        padding: '80px 0 130px'
    },
    title: {
        textAlign: 'center',
        paddingBottom: '40px'
    }
});
