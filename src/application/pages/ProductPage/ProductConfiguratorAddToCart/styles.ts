import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 20
    },
    counter: {
        paddingBottom: 30
    },
    icon: {
        paddingLeft: 10,
        lineHeight: 0
    },
    title: {
        paddingBottom: 15
    },
});
