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
        padding: '15px 0',
        borderRadius: 2,
        background: theme.appColors.weekWhite,
        marginTop: -4,
        zIndex: 3,
        boxShadow: '0 5px 10px 0 rgba(216, 216, 216, 0.5)'
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    pendingProgress: {
        position: 'absolute',
        left: '40%',
        zIndex: 10,
    }
});
