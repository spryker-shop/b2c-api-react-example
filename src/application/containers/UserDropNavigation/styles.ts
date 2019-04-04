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
    iconButton: {},
    icon: {},
    isPopupOpened: {}
});
