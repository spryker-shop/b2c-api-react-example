import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    strikethrough: {
        textDecoration: 'line-through',
        color: theme.appColors.grey,
        fontSize: theme.appFixedDimensions.fontSize.small,
        letterSpacing: '0.2px',
    },
    defaultPrice: {
        fontSize: theme.appFixedDimensions.fontSize.big,
        fontWeight: 500,
    },
    stylesInherited: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
    },
});
