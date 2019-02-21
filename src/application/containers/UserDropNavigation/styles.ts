import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    popoverTriangle: {
        '&:before, &:after': {
            right: 114,
            [theme.breakpoints.down(theme.appFixedDimensions.customBreakpoints.tablet)]: {
                right: 63,
            },
        }
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
