import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    categoryItem: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: theme.spacing.unit,
    },
    categoryItemText: {
        lineHeight: 2.29,
        letterSpacing: 0.4,
        fontSize: theme.appFixedDimensions.fontSize.small,

    },
    selected: {
        ...theme.appModules.selectedItem,
    },
    root: {},
    listItemOuter: {
        paddingRight: theme.spacing.unit,
    },
    hasChildren: {},
    children: {
        paddingLeft: theme.spacing.unit * 2,
    },
});
