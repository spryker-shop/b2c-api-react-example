import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    userDrop: {
        fontFamily: 'Circular',
        borderRadius: 4,
        boxShadow: '0 6px 10px 0 rgba(216, 216, 216, 0.5)',
        width: theme.appFixedDimensions.userDrop.width,
        overflow: 'hidden'
    },
    title: {
        color: theme.appColors.grey,
        margin: 0,
        padding: '21px 21px 16px',
        background: theme.appColors.weekWhite
    },
    userDropNav: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    userItem: {
        borderBottom: '1px solid rgba(206, 206, 208, 0.3)',
        '&:last-child': {
            border: 'none'
        }
    },
    userLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        fontSize: 15,
        fontWeight: 500,
        color: theme.appColors.grey,
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    userLinkLogout: {
        color: theme.appColors.red,
        '&:hover': {
            color: theme.appColors.darkRed
        }
    },
    userIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        fill: 'currentColor',
        marginRight: 14
    },
    userBtns: {
        display: 'flex',
        listStyle: 'none',
        padding: '20px 15px',
        margin: 0
    },
    userBtnsItem: {
        width: '50%',
        padding: '0 5px'
    },
    userBtnsLink: {
        flex: 1,
        fontSize: theme.appFixedDimensions.fontSize.small,
        textTransform: 'uppercase',
        fontWeight: 500,
        justifyContent: 'center',
        width: '100%',
        paddingRight: 12,
        paddingLeft: 12,
    }
});
