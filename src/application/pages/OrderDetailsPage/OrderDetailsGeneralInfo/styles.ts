import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    titleContainer: {
        borderBottom: `1px solid ${theme.appColors.blockDivider}`,
        alignItems: 'flex-end',
    },
    title: {
        borderBottom: 0,
    },
    linkBackOuter: {
        paddingBottom: theme.spacing.unit * 2,
        textAlign: 'right',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    linkBack: {
        color: theme.appColors.black,
        fontSize: theme.appFixedDimensions.fontSize.small,
        letterSpacing: 0.2,
        textDecoration: 'none',
        padding: 0,
        '&:hover': {
            color: theme.appColors.blue,
        },
    },
});
