import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    appMainLayout: {
        maxWidth: '100%',
        paddingLeft: 50,
        paddingRight: 50
    }
});
