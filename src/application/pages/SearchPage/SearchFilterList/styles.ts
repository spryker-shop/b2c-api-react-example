import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        [theme.breakpoints.up('lg')]: {
            padding: '21px 21px 11px',
            marginBottom: 30,
            background: theme.appColors.weekWhite,
            borderRadius: 4
        }
    },
    filtersHolder: {
        [theme.breakpoints.only('md')]: {
            display: 'none',
            padding: '21px 21px 11px',
            marginBottom: 40,
            background: theme.appColors.weekWhite,
            borderRadius: 4
        }
    },
    filtersOpen: {
        display: 'block'
    },
    activeFiltersHolder: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block'
        }
    },
    activeOpen: {
        display: 'block'
    },
    button: {
        color: theme.appColors.grey,
        marginBottom: 20,
        '&:hover': {
            backgroundColor: theme.appColors.white,
            color: theme.appColors.grey,
            borderColor: theme.appColors.lightGrey
        },
        '&:active': {
            backgroundColor: theme.appColors.white,
            color: theme.appColors.grey,
            borderColor: theme.appColors.lightGrey
        }
    },
    buttonActive: {
        color: theme.appColors.blue,
        borderColor: theme.appColors.blue,
        '&:hover': {
            color: theme.appColors.blue,
            borderColor: theme.appColors.blue
        },
        '&:active': {
            color: theme.appColors.blue,
            borderColor: theme.appColors.blue
        }
    },
    buttonIcon: {
        fill: 'currentColor',
        width: 24,
        height: 21,
        lineHeight: 1,
        marginRight: 15
    }
});
