import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        enableBackground: 'new 0 0 984.2 374',
        ...theme.appFixedDimensions.sprykerLogo,
    },
    text: {
        transform: 'matrix(1 0 0 1 991.5901 565.01)',
    },
    st0: {
        opacity: 0.7,
    },
    st1: {
        enableBackground: 'new',
    },
    st2: {
        fill: theme.appColors.weekRed,
    },
});
