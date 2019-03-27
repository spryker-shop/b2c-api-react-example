import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        position: 'relative',
        height: '100%'
    },
    userPopover: {
        marginTop: -10
    },
    iconButton: {
        width: 60,
        height: '100%',
        padding: 4,
        borderRadius: 4,
        '&:hover': {
            backgroundColor: theme.appColors.weekWhite
        }
    },
    isPopupOpened: {
        backgroundColor: theme.appColors.weekWhite
    }
});
