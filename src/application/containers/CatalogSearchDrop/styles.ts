import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    layout: {
        '& > :first-child': {
            background: 'rgba(0, 0, 0, 0.2)'
        }
    },
    iconButton: {
        width: 60,
        height: '100%',
        padding: 4,
        borderRadius: 4,
        '&:hover': {
            backgroundColor: theme.appColors.weekWhite
        }
    },
    content: {
        background: 'none',
        width: '50%',
        minWidth: 400,
        maxWidth: 680
    },
    searchLayout: {
        position: 'relative',
        borderRadius: 4
    },
    searchCloseButton: {
        padding: '5px 15px',
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        zIndex: 2,
        transition: 'opacity 0.3s ease-in-out',
        '&:hover': {
            background: 'none',
            opacity: 0.5
        }
    },
    searchComponent: {
        paddingRight: 50
    }
});
