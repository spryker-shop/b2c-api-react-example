import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        flexGrow: 1
    },
    layout: {
        paddingTop: 40,
        ...theme.appContainerStyles
    }
});
