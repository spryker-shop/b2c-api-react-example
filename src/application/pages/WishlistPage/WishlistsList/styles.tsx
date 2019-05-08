import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    item: {
        padding: '22px 100px 15px 22px',
        background: theme.appColors.white,
        position: 'relative',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 1.5,
        color: theme.appColors.black
    },
    updateName: {
        position: 'relative'
    },
    icon: {
        fill: 'currentColor',
        width: 24,
        height: 24,
        lineHeight: 0
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: 25,
        top: 10
    },
    actionItem: {
        padding: 10,
        fill: theme.appColors.lightGrey,
        background: 'none',
        transition: 'fill 0.3s ease-in-out',
        '&:hover': {
            background: 'none'
        }
    },
    actionDelete: {
        '&:hover': {
            fill: theme.appColors.red
        }
    },
    actionEdit: {
        '&:hover': {
            fill: theme.appColors.blue
        }
    }
});
