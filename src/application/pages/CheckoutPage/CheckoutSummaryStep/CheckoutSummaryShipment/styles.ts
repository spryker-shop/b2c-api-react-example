import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        color: theme.appColors.grey,
        fontSize: 15,
        lineHeight: 1.4,
        letterSpacing: 0.2
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingBottom: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: theme.appColors.black,
        paddingRight: 15
    },
    icon: {
        width: 90,
        height: 13,
        lineHeight: 0,
        fill: theme.appColors.lightGrey
    },
    price: {
        fontWeight: 400
    }
});
