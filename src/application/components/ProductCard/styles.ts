import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        height: '100%',
        alignItems: 'center',
        boxShadow: 'none',
        transition: 'box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
        }
    },
    media: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        maxWidth: '90%',
        maxHeight: '90%'
    },
    imageWrapper: {
        borderRadius: 4,
        position: 'relative',
        width: '100%',
        flexShrink: 0
    },
    image: {
        width: '100%',
        minWidth: '100%',
        height: 200,
        [theme.breakpoints.up('md')]: {
            height: 280,
        },
        [theme.breakpoints.up('lg')]: {
            height: 360,
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        padding: '10px 0',
        width: '100%',
        minHeight: 112,
        [theme.breakpoints.up('md')]: {
            minHeight: 136,
            padding: '15px 0',
        },
        [theme.breakpoints.up('lg')]: {
            padding: 15,
        }
    },
    nameWrapper: {
        paddingBottom: 9,
        flexGrow: 1
    },
    name: {
        maxHeight: 42,
        overflow: 'hidden',
        // Multiline truncation with ellipsis Chrome only
        display: '-webkit-box',
        lineClamp: 2,
        boxOrient: 'vertical'
    },
    prices: {
        flexShrink: 0
    },
    price: {
        fontSize: 16,
        lineHeight: 1.2,
        [theme.breakpoints.up('md')]: {
            fontSize: 18
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 20
        }
    },
    newPrice: {
        color: theme.appColors.red
    },
    oldPrice: {
        fontSize: 13,
        [theme.breakpoints.up('md')]: {
            fontSize: 14
        },
    }
});
