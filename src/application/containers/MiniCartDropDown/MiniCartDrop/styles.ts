import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    cartDrop: {
        width: theme.appFixedDimensions.cartDrop.width,
        maxHeight: theme.appFixedDimensions.cartDrop.height,
        padding: theme.spacing.unit * 3,
        borderBottom: `1px solid ${theme.appColors.weakGrey}`,
        borderLeft: `1px solid ${theme.appColors.weakGrey}`,
        borderRight: `1px solid ${theme.appColors.weakGrey}`,
    },
    title: {
        fontSize: theme.appFixedDimensions.fontSize.big,
        lineHeight: 'normal',
        fontWeight: 500,
        color: theme.appColors.black,
        letterSpacing: '-.5px',
        margin: 0,
        borderBottom: `1px solid ${theme.appColors.weakGrey}`,
        paddingBottom: 10,
        paddingTop: 10,
    },
    cartDropProductsList: {
        listStyle: 'none',
        overflowY: 'auto',
        maxHeight: (148 * 2) + 1,
        margin: 0,
        padding: 0,
        fontSize: theme.appFixedDimensions.fontSize.small,
        lineHeight: '18px',
        '& li': {
            borderBottom: `1px solid ${theme.appColors.weakGrey}`,
            minHeight: 148,
            '&:last-child': {
                borderBottom: 'none',
            }
        },
        '& a': {
            color: theme.appColors.black,
            textDecoration: 'none',
            display: 'block',
            padding: '24px 0',
        },
    },
    cartTotalContainer: {
        padding: `${theme.spacing.unit * 2}px 0`,
        borderTop: `1px solid ${theme.appColors.weakGrey}`,
        borderBottom: `1px solid ${theme.appColors.weakGrey}`,
    },
    cartTotal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:not(:last-child)': {
            marginBottom: 10,
        },
    },
    fontTotal: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
        fontWeight: 'bold',
    },
    cartBtns: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'space-between',
    },
    action: {
        flex: 1,
        fontSize: theme.appFixedDimensions.fontSize.small,
        textTransform: 'uppercase',
        fontWeight: 500,
        justifyContent: 'center',
        maxWidth: 173,
        width: '100%',
    }
});
