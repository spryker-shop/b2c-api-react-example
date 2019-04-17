import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    textField: {},
    inputRoot: {
        'label + &': {
            marginTop: 0
        }
    },
    input: {
        boxSizing: 'border-box',
        borderRadius: 4,
        border: `solid 1px ${theme.appColors.weekWhite}`,
        backgroundColor: theme.appColors.weekWhite,
        padding: '4px 16px',
        width: '100%',
        height: 50,
        lineHeight: 1.47,
        letterSpacing: 0.2,
        color: theme.appColors.black,
        fontSize: 15,
        fontWeight: 500,
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            appearance: 'none',
            margin: 0
        },
        '&:focus': {
            backgroundColor: theme.appColors.white
        }
    },
    inputStartIcon: {
        paddingLeft: 57
    },
    inputEndIcon: {
        paddingRight: 57
    },
    error: {
        color: theme.appColors.red,
        '& input': {
            borderColor: theme.appColors.red
        },
        '& $icon': {
            fill: theme.appColors.red
        }
    },
    label: {
        display: 'block',
        position: 'static',
        paddingBottom: 10,
        color: theme.appColors.grey,
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.26,
        fontWeight: 400,
        transform: 'none',
        '&$labelFocused': {
            color: theme.appColors.grey
        },
        '&$labelError': {
            color: theme.appColors.red
        }
    },
    labelFocused: {},
    labelError: {},
    asterisk: {
        color: theme.appColors.blue
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '0',
        right: '0',
        overflow: 'hidden',
        margin: '12px 14px 0',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        zIndex: 3,
        pointerEvents: 'none',
        lineHeight: '20px',
        fontWeight: 500,
        color: theme.appColors.black,
        opacity: 0.43
    },
    filled: {
        display: 'none'
    },
    icon: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fill: theme.appColors.lightGrey,
        margin: 0,
        maxHeight: 'none',
        width: 20,
        height: 20,
        justifyContent: 'center',
        lineHeight: 0
    },
    iconPositionStart: {
        left: 20
    },
    iconPositionEnd: {
        right: 20
    }
});
