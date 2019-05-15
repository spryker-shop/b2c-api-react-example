import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    addressContainer: {
        padding: '21px 100px 33px 25px',
        height: '100%',
        margin: 0
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
    actionItemDisabled: {
        opacity: 0.6
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
