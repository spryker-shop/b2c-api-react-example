import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    badge: {
        transition: 'transform .3s ease-in-out',
        background: theme.appColors.blue,
        width: 'auto',
        minWidth: 18,
        right: 0,
        top: -6,
        transform: 'translateX(40%)',
        padding: theme.spacing.unit / 2,
        height: 18,
        fontSize: theme.appFixedDimensions.fontSize.mini,
        lineHeight: 14,
    },
    badgeCartOpen: {},
    hideBadge: {
        transform: 'scale(0)',
    },
    cartNotification: {
        top: 70,
        right: 21,
    },
    cartContent: {
        maxHeight: theme.appFixedDimensions.cartDrop.height,
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
