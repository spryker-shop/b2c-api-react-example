import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    block: {
        padding: 20,
        background: theme.appColors.weekWhite,
        borderRadius: 4
    },
    productItem: {
        padding: 15,
        marginBottom: 20,
        flexWrap: 'nowrap',
        background: theme.appColors.white,
        position: 'relative',
        '&:last-child': {
            marginBottom: 0
        },
        [theme.breakpoints.up('lg')]: {
            padding: '20px 20px 36px 60px',
        }
    },
    imgWrapper: {
        width: 100,
        height: 100,
        minWidth: 100,
        [theme.breakpoints.up('md')]: {
            width: 132,
            height: 132,
            minWidth: 132
        }
    },
    imageOuter: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
    },
    imageHolder: {
        flexGrow: 1,
    },
    contentOuter: {
        flexGrow: 1,
        padding: '0 10px 0 20px'
    },
    colButton: {
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: 206
        }
    },
    name: {
        maxHeight: 46,
        marginBottom: 10,
        overflow: 'hidden',
        fontSize: 16,
        fontWeight: 500,
        color: theme.appColors.grey,
        // Multiline truncation with ellipsis Chrome only
        display: '-webkit-box',
        lineClamp: 2,
        boxOrient: 'vertical'
    },
    attributes: {
        display: 'flex',
        paddingBottom: 8,
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.4,
        '&:first-letter': {
            textTransform: 'uppercase'
        }
    },
    attributesValue: {
        color: theme.appColors.grey,
        fontWeight: 500,
        paddingLeft: 5,
        flexGrow: 1
    },
    attributesTitle: {
        textTransform: 'capitalize',
        width: 100
    },
    available: {
        color: theme.appColors.green
    },
    noAvailable: {
        color: theme.appColors.red
    },
    buttonInner: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonIcon: {
        paddingLeft: 10,
        fill: 'currentColor',
        lineHeight: 0
    },
    removeButton: {
        padding: '10px 0 10px 30px',
        justifyContent: 'flex-start',
        minWidth: 'auto',
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        cursor: 'pointer',
        [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            left: 20,
            top: 76,
            padding: 0,
            width: 20,
            height: 20
        },
        '&:hover': {
            color: theme.appColors.red,
            backgroundColor: 'transparent'
        }

    },
    removeButtonIcon: {
        borderRadius: '50%',
        width: 20,
        height: 20,
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        border: '1px solid currentColor',
        '&:after, &:before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 12,
            height: 1,
            backgroundColor: 'currentColor'
        },
        '&:after': {
            transform: 'translate(-50%, -50%) rotate(45deg)'
        },
        '&:before': {
            transform: 'translate(-50%, -50%) rotate(-45deg)'
        }
    },
    removeButtonText: {
        fontSize: 15,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        color: theme.appColors.lightGrey,
    },
    buttonDisabled: {
        opacity: 0.6
    }
});
