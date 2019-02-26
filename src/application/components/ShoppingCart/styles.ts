import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { blueGrey, teal } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
    icon: {
        marginLeft: theme.spacing.unit * 2,
    },
    badge: {
        top: 1,
        right: -15,
        color: blueGrey[50],
        backgroundColor: teal[500],
        border: `2px solid ${blueGrey[50]}`,
    },
});
