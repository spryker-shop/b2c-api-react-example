import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    title: {
        paddingBottom: 20
    },
    submit: {
        minWidth: 160
    },
    form: {
        paddingBottom: 50
    }
});
