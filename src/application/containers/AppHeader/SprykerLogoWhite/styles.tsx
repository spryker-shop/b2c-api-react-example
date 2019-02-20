import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        enableBackground: 'new 0 0 1591 690',
        ...theme.appFixedDimensions.sprykerLogo,
    },
    text: {
        transform: 'matrix(1, 0, 0, 1, 991.5901, 565.01)',
    },
    st0: {
        fill: theme.appColors.white,
    },
    st1: {
        opacity: 0.7,
        fill: theme.appColors.white,
        enableBackground: 'new',
    },
    st2: {
        fill: theme.appColors.weekRed,
    },
    st3: {
        fontFamily: 'Replica-Bold',
        fontWeight: 'bold',
    },
    st4: {
        fontSize: 134,
    },
});
