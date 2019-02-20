import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    filter: {},
    priceClassName: {
        fontSize: `${theme.appFixedDimensions.fontSize.medium} !important`,
        fontWeight: 600,
    },
});
