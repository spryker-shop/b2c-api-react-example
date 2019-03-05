import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { appColors } from '@theme/properties/new/appColors';

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
        width: '100%',
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
    popoverContent: {
        padding: '40px 15px 20px',
        borderRadius: 4,
        boxShadow: ' 0 4px 10px 0 rgba(216, 216, 216, 0.5)',
        marginTop: -3,
        minWidth: 306
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
        position: 'relative',
        '& .rc-slider-handle': {
            position: 'absolute',
            border: `4px solid  ${appColors.blue}`,
            width: '22px',
            height: '22px',
            backgroundColor: appColors.white,
            marginLeft: '-11px',
            marginTop: '-9px',
            touchAction: 'pan-x',
            cursor: 'grab',
            borderRadius: '50%',
            outline: 'none'
        },
        '& .rc-slider-rail': {
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: appColors.weekWhite,
            borderRadius: '4px',
            height: '4px',
            width: '100%'
        },
        '& .rc-slider-track': {
            position: 'absolute',
            top: 0,
            backgroundColor: appColors.blue,
            borderRadius: '4px',
            height: '4px'
        }
    },
    price: {
        fontSize: 14,
        letterSpacing: 0.1,
        fontWeight: 400,
        color: theme.appColors.grey
    },
    textField: {
        position: 'relative'
    },
    priceHolder: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        margin: 0,
        pointerEvents: 'none'
    },
    input: {
        boxSizing: 'border-box',
        width: 100,
        height: 36,
        border: `1px solid ${theme.appColors.weekWhite}`,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        padding: '4px 10px',
        fontSize: 14,
        letterSpacing: 0.1,
        fontWeight: 400,
        color: theme.appColors.grey,
        transition: 'background 0.3s ease-in-out',
        outline: 'none',
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            appearance: 'none',
            margin: 0,
        },
        '&:focus': {
            background: theme.appColors.white
        }
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
