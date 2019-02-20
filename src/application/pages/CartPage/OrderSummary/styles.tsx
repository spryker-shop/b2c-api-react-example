import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    cartTotalIndent: {
        marginTop: '58px'
    },
    navLink: {
        textDecoration: 'none',
        width: '100%'
    },
    btnWrapper: {
        margin: `${theme.spacing.unit * 4}px 0`,
        height: '44px',
        borderRadius: '4px',
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: '1.5px',
    },
});
