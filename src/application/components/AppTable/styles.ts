import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    header: {
        backgroundColor: theme.appColors.lightGrey
    },
    headerRow: {
        height: 'auto'
    },
    headerCell: {
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        fontSize: theme.appFixedDimensions.fontSize.small,
        fontWeight: 'bold',
        color: theme.appColors.black,
        borderBottom: 'none'
    },
    body: {},
    bodyRow: {
        height: 'auto',
    },
    rowHover: {
        transition: 'background-color 0.5s ease-in-out',
        '&:hover': {
            backgroundColor: theme.appColors.lightGrey
        }
    },
    bodyCell: {
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        fontSize: theme.appFixedDimensions.fontSize.small,
    },
    footerCell: {},
    tableOuter: {
        width: '100%',
    },
    responsive: {
        overflowX: 'auto',
    },
});
