import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        position: 'relative',
        color: theme.appColors.black,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    button: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 42,
        padding: '5px 42px 5px 13px',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.47,
        letterSpacing: 0.1,
        borderRadius: 4,
        background: theme.appColors.white,
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        '&:hover': {
            background: theme.appColors.darkWhite,
            color: theme.appColors.blue
        },
        '&:active': {
            background: theme.appColors.white
        }
    },
    isPopupOpened: {
        boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
    },
    text: {
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    icon: {
        fill: 'currentColor',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 18,
        width: 12,
        height: 12,
        lineHeight: 0,
        pointerEvents: 'none'
    },
    iconOpened: {
        color: theme.appColors.blue,
        transform: 'translateY(-50%) rotate(180deg)'
    },


    panelRoot: {
        padding: 0,
        borderBottomLeftRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderBottomRightRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderTopRightRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        borderTopLeftRadius: `${theme.appFixedDimensions.borderRadius}px !important`,
        boxShadow: 'none',
        border: `solid 1px ${theme.appColors.weakGrey}`,
        backgroundColor: theme.appColors.white
    },
    panelExpanded: {
        margin: '0 0'
    },
    panelSummaryRoot: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        minHeight: 'auto !important'
    },
    panelSummaryExpanded: {
        margin: '0 0 0 !important'
    },
    panelSummaryContent: {
        margin: '0 0'
    },
    panelDetailRoot: {
        paddingLeft: theme.spacing.unit * 1.5,
        paddingTop: 0,
        paddingBottom: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 1.5
    },
    rangeOuter: {
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: theme.spacing.unit * 3,
        paddingRight: 0,
        maxWidth: `calc(100% - ${theme.spacing.unit * 3}px)`,
        margin: 'auto'
    },
    range: {
        color: theme.appColors.black
    },
    valueMin: {
        textAlign: 'left'
    },
    valueMax: {
        textAlign: 'right'
    },
    value: {
        fontSize: `${theme.appFixedDimensions.fontSize.medium} !important`,
        fontWeight: 600
    }
});
