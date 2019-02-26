import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    badge: {
        transition: 'transform .3s ease-in-out',
        background: theme.appColors.blue,
        width: 'auto',
        minWidth: 18,
        right: 'auto',
        left: '100%',
        padding: theme.spacing.unit / 2,
        height: 18,
        fontSize: theme.appFixedDimensions.fontSize.mini,
        lineHeight: '14px',
    },
    badgeCartOpen: {},
    hideBadge: {
        transform: 'scale(0)',
    },
    cartNotification: {
        top: '70px',
        right: '21px',
    },
    cartContent: {
        maxHeight: theme.appFixedDimensions.cartDrop.height,
    },
    popoverTriangle: {
        '&:before, &:after': {
            right: 57,
            [theme.breakpoints.down(theme.appFixedDimensions.customBreakpoints.tablet)]: {
                right: 23,
            },
        }
    },
});
