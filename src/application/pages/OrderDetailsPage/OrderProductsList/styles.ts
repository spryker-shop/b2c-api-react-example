import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const mobileImageDimensions = 100;
const mobileContentLeftIndent = 10;

export const styles = (theme: Theme) => createStyles({
    productItem: {
        padding: 15,
        marginBottom: 15,
        flexWrap: 'nowrap',
        background: theme.appColors.white,
        [theme.breakpoints.up('lg')]: {
            marginBottom: 20,
            padding: '20px 20px 36px',
        },
        '&:last-child': {
            marginBottom: 0
        }
    },
    imgWrapper: {
        width: mobileImageDimensions,
        height: mobileImageDimensions,
        minWidth: mobileImageDimensions,
        [theme.breakpoints.up('md')]: {
            width: 132,
            height: 132,
            minWidth: 132
        }
    },
    imageOuter: {
        flexShrink: 0
    },
    contentOuter: {
        flexGrow: 1,
        paddingLeft: mobileContentLeftIndent,
        [theme.breakpoints.up('md')]: {
            paddingLeft: 20
        }
    },
    name: {
        maxHeight: 69,
        marginBottom: 10,
        overflow: 'hidden',
        fontSize: 14,
        fontWeight: 500,
        color: theme.appColors.grey,
        // Multiline truncation with ellipsis Chrome only
        display: '-webkit-box',
        lineClamp: 3,
        boxOrient: 'vertical',
        [theme.breakpoints.up('md')]: {
            maxHeight: 46,
            lineClamp: 2,
            fontSize: 16
        }
    },
    attributes: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: 8,
        fontSize: 14,
        letterSpacing: 0.2,
        lineHeight: 1.4,
        [theme.breakpoints.up('md')]: {
            fontSize: 15
        },
        '&:last-child': {
            paddingBottom: 0
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
        paddingRight: 5,
        [theme.breakpoints.up('md')]: {
            width: 100
        }
    },
    button: {
        fontSize: 14,
        padding: '10px 8px',
        marginLeft: `calc(-${mobileImageDimensions}px + -${mobileContentLeftIndent}px)`,
        width: `calc(100% + ${mobileImageDimensions}px + ${mobileContentLeftIndent}px)`,
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            margin: 0,
        },
        [theme.breakpoints.up('md')]: {
            padding: '13px 15px',
            fontSize: 16
        }
    }
});
