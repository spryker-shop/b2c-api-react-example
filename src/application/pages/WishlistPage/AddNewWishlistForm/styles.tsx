import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    form: {
        paddingBottom: 20
    },
    button: {
        paddingLeft: 24,
        paddingRight: 24
    },
    input: {
        backgroundColor: theme.appColors.white,
        border: `1px solid ${theme.appColors.lightGrey}`,
        '&:focus': {
            borderColor: theme.appColors.grey
        }
    }
});
