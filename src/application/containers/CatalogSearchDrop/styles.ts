import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    backdrop: {
        background: 'rgba(0, 0, 0, 0.2)'
    },
    iconButton: {},
    icon: {},
    overlayCustomCoordinates: {
        top: 0
    },
    contentCustomCoordinates: {
        top: '0 !important',
        left: '0 !important',
        right: '0',
        [theme.breakpoints.up('sm')]: {
            top: '16px !important',
            left: '16px !important',
            right: '16px',
            borderRadius: 4,
        },
    },
    content: {
        [theme.breakpoints.up('lg')]: {
            background: 'none',
            width: '50%',
            minWidth: 400,
            maxWidth: 680
        }
    },
    searchLayout: {
        position: 'relative'
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
        padding: '19px 50px 19px 60px',
        borderRadius: 0,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 13,
            paddingBottom: 13,
            borderRadius: 4
        }
    }
});
