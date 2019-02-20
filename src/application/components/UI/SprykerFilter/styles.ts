import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        marginLeft: 0,
        borderRadius: theme.appFixedDimensions.borderRadius,
        border: `solid 1px ${theme.appColors.weakGrey}`,
        backgroundColor: theme.appColors.white,
    },
    icon: {
        transform: 'rotate(270deg)',
        transition: 'transform .8s ease-in-out',
        fill: theme.appColors.black,
        right: 10,
    },
    input: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        lineHeight: 'normal',
        letterSpacing: 0.5,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
    },
    button: {
        display: 'block',
        marginLeft: theme.spacing.unit,
        paddingLeft: 0,
        paddingRight: 0,
    },
    formControl: {
        width: '100%',
        textTransform: 'capitalize',
    },
    chip: {
        ...theme.appModules.chip,
    },
    menuItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        fontSize: theme.appFixedDimensions.fontSize.small,
        padding: theme.spacing.unit * 1.5,
        lineHeight: 'normal',
        letterSpacing: 0.5,
        height: 'auto',
    },
    menuItemName: {
        marginRight: theme.spacing.unit * 1.5,
    },
    selected: {
        ...theme.appModules.selectedItem,
    },
});
