import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    block: {
        padding: 20,
        background: theme.appColors.weekWhite,
        borderRadius: 4
    },
    productItem: {
        padding: '20px 20px 36px 60px',
        marginBottom: 20,
        flexWrap: 'nowrap',
        background: theme.appColors.white,
        position: 'relative',
        '&:last-child': {
            marginBottom: 0
        }
    },
    imgWrapper: {
        width: 132,
        height: 132,
        minWidth: 132
    },
    imageOuter: {
        flexShrink: 0
    },
    contentOuter: {
        flexGrow: 1,
        padding: '0 10px 0 20px'
    },
    colButton: {
        width: 206
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
        position: 'absolute',
        left: 20,
        top: 76,
        padding: 0,
        borderRadius: '50%',
        minWidth: 'auto',
        width: 20,
        height: 20,
        color: theme.appColors.lightGrey,
        border: '1px solid currentColor',
        transition: 'color 0.3s ease-in-out',
        cursor: 'pointer',
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
        },
        '&:hover': {
            color: theme.appColors.red,
            backgroundColor: 'transparent'
        }

    },
    buttonDisabled: {
        opacity: 0.6
    }
});
