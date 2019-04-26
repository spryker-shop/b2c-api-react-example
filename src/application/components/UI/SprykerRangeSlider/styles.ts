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
        height: 50,
        width: '100%',
        padding: '5px 42px 5px 13px',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        '&:hover, &:active': {
            background: theme.appColors.weekWhite,
            color: theme.appColors.grey
        },
        [theme.breakpoints.up('md')]: {
            background: theme.appColors.white,
            height: 42,
            fontSize: 14,
            letterSpacing: 0.1,
            '&:hover, &:active': {
                background: theme.appColors.white
            }
        },
        [theme.breakpoints.up('lg')]: {
            '&:hover': {
                background: theme.appColors.darkWhite,
                color: theme.appColors.blue
            },
            '&:active': {
                background: theme.appColors.white
            }
        }
    },
    isPopupOpened: {
        [theme.breakpoints.up('md')]: {
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
        }
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
    wrapper: {
        padding: '30px 14px 15px',
        background: theme.appColors.weekWhite,
        display: 'none',
        [theme.breakpoints.up('md')]: {
            background: 'none',
            padding: 0,
            display: 'block'
        }
    },
    wrapperOpened: {
        display: 'block'
    },
    popoverContent: {
        padding: '40px 15px 20px',
        borderRadius: 4,
        boxShadow: ' 0 4px 10px 0 rgba(216, 216, 216, 0.5)',
        marginTop: -3
    },
    rangeOuter: {
        padding: '0 12px 12px',
        marginBottom: '20px'
    },
    range: {
        position: 'relative',
        '& .rc-slider-handle': {
            position: 'absolute',
            border: `4px solid  ${theme.appColors.blue}`,
            width: '22px',
            height: '22px',
            backgroundColor: theme.appColors.white,
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
            backgroundColor: theme.appColors.white,
            borderRadius: '4px',
            height: '4px',
            width: '100%',
            [theme.breakpoints.up('md')]: {
                backgroundColor: theme.appColors.weekWhite
            }
        },
        '& .rc-slider-track': {
            position: 'absolute',
            top: 0,
            backgroundColor: theme.appColors.blue,
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
        border: `1px solid ${theme.appColors.white}`,
        background: theme.appColors.white,
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
            margin: 0
        },
        '&:focus': {
            background: theme.appColors.white
        },
        [theme.breakpoints.up('md')]: {
            background: theme.appColors.weekWhite,
            '&:focus': {
                background: theme.appColors.white
            }
        }
    }
});
