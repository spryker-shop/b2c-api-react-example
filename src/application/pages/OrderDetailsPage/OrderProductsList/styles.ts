import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    productItem: {
        padding: '20px 20px 36px',
        marginBottom: 20,
        flexWrap: 'nowrap',
        background: theme.appColors.white,
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
        paddingLeft: 20
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
});
