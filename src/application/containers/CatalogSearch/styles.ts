import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    container: {
        flexGrow: 1,
    },

    suggestionsContainer: {
        display: 'none',
    },
    suggestionsContainerOpen: {
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '85vh',
        overflowY: 'auto',
        borderRadius: '2px',
        backgroundColor: '#ffffff',
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    inputRoot: {
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingLeft: 5,
    },
    inputOutline: {
        border: '1px solid #d9d9d9',
        backgroundColor: theme.palette.common.white,
        zIndex: 1,
    },
    input: {
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 500,
        color: theme.appColors.black,
        padding: 13,
        zIndex: 3,
        background: 'transparent',
        letterSpacing: '0.5px',
        '&:not(:focus)': {
            backgroundColor: 'white'
        },
    },
    inputIconContainer: {
        position: 'relative',
        zIndex: 2,
        margin: 0,
    },
    inputIcon: {
        fill: `${theme.appColors.grey} !important`,
    },

    pendingProgress: {
        position: 'absolute',
        left: '40%',
        zIndex: 10,
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '21px',
        right: '61px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        zIndex: 3,
        pointerEvents: 'none',
        fontSize: 16,
        lineHeight: '20px',
        fontWeight: 500,
        letterSpacing: '0.5px',
        opacity: 0.5
    },
    filled: {
        display: 'none'
    },

    searchTitle: {
        marginLeft: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit,
        letterSpacing: '0.5px',
    },
    completionInput: {
        position: 'absolute',
        left: 20,
        top: 13,
        zIndex: 2,
    },
    hiddenPart: {
        display: 'inline-block',
        transform: 'translateY(-200px)',
    },
    visiblePart: {
        fontSize: 16,
        lineHeight: '20px',
        color: '#000000',
        letterSpacing: '0.5px',
        opacity: 0.35,
        fontWeight: 300,
    },
});
