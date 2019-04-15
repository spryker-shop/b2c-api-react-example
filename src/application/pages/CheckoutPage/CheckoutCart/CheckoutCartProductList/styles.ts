import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    productItem: {
        paddingBottom: 20,
        marginBottom: 20,
        flexWrap: 'nowrap',
        borderBottom: `1px solid ${theme.appColors.weekWhite}`,
        '&:last-child': {
            paddingBottom: 0,
            marginBottom: 0,
            border: 'none'
        }
    },
    imageOuter: {
        flexShrink: 0
    },
    contentOuter: {
        flexGrow: 1,
        paddingLeft: 10
    },
    info: {
        display: 'flex',
        flexDirection: 'column'
    },
    growedBlock: {
        flexGrow: 1
    },
    name: {
        maxHeight: 42,
        marginBottom: 10,
        overflow: 'hidden',
        color: theme.appColors.grey,
        // Multiline truncation with ellipsis Chrome only
        display: '-webkit-box',
        lineClamp: 2,
        boxOrient: 'vertical'
    },
    attributes: {
        dispay: 'block',
        paddingBottom: 4,
        fontSize: 13,
        letterSpacing: 0.1,
        lineHeight: 1.7,
        '&:first-letter': {
            textTransform: 'uppercase'
        }
    },
    attributesValue: {
        color: theme.appColors.grey
    },
    price: {
        fontWeight: 500,
        textAlign: 'right',
        lineHeight: 1.4
    },
    newPrice: {
        color: theme.appColors.red
    },
    oldPrice: {
        fontSize: 15,
        letterSpacing: 0.3,
        fontWeight: 400
    }
});
