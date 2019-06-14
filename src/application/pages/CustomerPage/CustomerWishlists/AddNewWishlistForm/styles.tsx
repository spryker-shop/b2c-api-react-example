import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    form: {
        paddingBottom: 20
    },
    col: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 'auto'
        }
    },
    colInput: {
        [theme.breakpoints.up('md')]: {
            flexGrow: 1
        }
    },
    button: {
        paddingLeft: 24,
        paddingRight: 24,
        width: '100%'
    },
    input: {
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.appColors.white,
            border: `1px solid ${theme.appColors.lightGrey}`,
            '&:focus': {
                borderColor: theme.appColors.grey
            }
        }
    }
});
