import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    container: {
        display: 'flex'
    },
    trigger: {
        position: 'relative',
        width: 30,
        height: 30,
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        cursor: 'pointer',
        transition: 'background 0.3s ease-in-out',
        userSelect: 'none',
        '&:after, &:before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 10,
            height: 2,
            background: theme.appColors.grey,
            transform: 'translate(-50%, -50%)'
        },
        '&:after': {
            transform: 'translate(-50%, -50%) rotate(90deg)'
        },
        '&:hover': {
            background: theme.appColors.softGrey
        }
    },
    triggerBigger: {
        width: 40,
        height: 40,
    },
    triggerMinus: {
        '&:after': {
            display: 'none'
        }
    },
    triggerDisabled: {
        pointerEvents: 'none',
        '&:after, &:before': {
            background: theme.appColors.lightGrey
        }
    },
    input: {
        borderRadius: 0,
        padding: '0 4px',
        border: 'none',
        backgroundColor: theme.appColors.white,
        width: 40,
        height: 30,
        lineHeight: 1.2,
        letterSpacing: 0,
        color: theme.appColors.grey,
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'center',
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            appearance: 'none',
            margin: 0,
        }
    },
    inputBigger: {
        height: 40
    }
});
