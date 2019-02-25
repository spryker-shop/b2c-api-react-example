import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        fontFamily: 'Circular',
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
        borderRadius: 2,
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
    pendingProgress: {
        position: 'absolute',
        left: '40%',
        zIndex: 10,
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
    },
    searchTitle: {
        marginLeft: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit,
        letterSpacing: 0.5,
    }
});
