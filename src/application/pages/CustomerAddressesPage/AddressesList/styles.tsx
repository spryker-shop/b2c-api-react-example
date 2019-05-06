import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    addressContainer: {
        padding: '21px 100px 33px 25px',
        color: theme.appColors.grey,
        fontSize: 15,
        lineHeight: 1.9,
        letterSpacing: 0.2,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        height: '100%',
        position: 'relative'
    },
    title: {
        fontWeight: 700,
        paddingBottom: 14
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
