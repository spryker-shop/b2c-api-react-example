import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    button: {
        margin: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px 0`,
        padding: theme.spacing.unit * 1.7,
        textTransform: 'uppercase',
        fontSize: theme.appFixedDimensions.fontSize.small,
        '&:last-child': {
            marginRight: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginRight: 0,
        },
    },
    buttonSelected: {
        pointerEvents: 'none',
        borderColor: theme.appColors.blue,
        color: theme.appColors.blue,
        backgroundColor: theme.appColors.blueTransparent,
    },
});
