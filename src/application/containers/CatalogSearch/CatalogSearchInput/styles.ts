import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    suggestedText: {
        fontSize: 15,
        lineHeight: 1.4,
        color: theme.appColors.black,
        letterSpacing: 0.2,
        opacity: 0.35,
        fontWeight: 300,
    },
    completionInput: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        padding: '13px 13px 13px 60px',
        zIndex: 2,
        pointerEvents: 'none'
    },
    inputRoot: {
        overflow: 'hidden',
        borderRadius: 4,
        paddingLeft: 0,
    },
    input: {
        fontSize: 15,
        lineHeight: 1.4,
        fontWeight: 500,
        color: theme.appColors.black,
        padding: '13px 13px 13px 60px',
        zIndex: 1,
        background: 'transparent',
        letterSpacing: 0.2,
        borderRadius: 4,
        backgroundColor: theme.appColors.white,
    },
    inputIconContainer: {
        padding: '5px 18px',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        zIndex: 2,
        margin: 0,
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
            background: 'none',
            opacity: 0.5
        }
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 60,
        right: 61,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        zIndex: 3,
        pointerEvents: 'none',
        fontSize: 15,
        lineHeight: 1.4,
        fontWeight: 500,
        letterSpacing: 0.5,
        opacity: 0.5
    },
    filled: {
        display: 'none'
    }
});
