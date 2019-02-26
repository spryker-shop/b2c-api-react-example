import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    childWrapper: {},
    popover: {
        '& > :first-child': {},
    },
    content: {
        top: '0 !important',
        borderRadius: 0,
        overflow: 'visible',
    },
    helper: {
        position: 'relative',

        '&:before, &:after': {
            content: '""',
            zIndex: 1,
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: `0 ${theme.appFixedDimensions.headerPopover.triangle}px 
                    ${theme.appFixedDimensions.headerPopover.triangle}px 
                    ${theme.appFixedDimensions.headerPopover.triangle}px`,
            position: 'absolute',
            [theme.breakpoints.down(theme.appFixedDimensions.customBreakpoints.smallTablet)]: {
                display: 'none',
            },
        },

        '&:after': {
            borderColor: `transparent transparent ${theme.appColors.white} transparent`,
            top: -(theme.appFixedDimensions.headerPopover.triangle - 1),
        },
        '&:before': {
            borderColor: `transparent transparent ${theme.appColors.weakGrey} transparent`,
            top: -theme.appFixedDimensions.headerPopover.triangle,
        },
    },
});
