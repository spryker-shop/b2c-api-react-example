import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    gridItem: {},
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            height: 'auto',
            display: 'block'
        }
    },
    filterWrapTitle: {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        padding: '5px 42px 5px 13px',
        fontSize: 16,
        lineHeight: 1.47,
        letterSpacing: 0.2,
        borderRadius: 4,
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey,
        textTransform: 'capitalize',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    counterTitle: {
        paddingLeft: 20,
        fontSize: 12,
        letterSpacing: 0.1,
        color: theme.appColors.weakGrey,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    filterChevron: {
        fill: theme.appColors.black,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 18,
        width: 12,
        height: 12,
        lineHeight: 0,
        pointerEvents: 'none'
    },
    filterChevronOpened: {
        fill: theme.appColors.blue,
        transform: 'translateY(-50%) rotate(180deg)'
    },
    filterWrap: {
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none'
        }
    },
    filterWrapOpened: {
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'block'
        }
    },
    selectChevron: {
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none'
        }
    },
    filtersModalRoot: {
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'block',
            position: 'static',
            visibility: 'visible'
        }
    },
    filters: {
        width: '100%',
        [theme.breakpoints.between('xs', 'sm')]: {
            opacity: '1 !important',
            transform: 'none !important',
            position: 'static',
            minWidth: '0 !important',
            margin: 0,
            maxWidth: 'none'
        },
        [theme.breakpoints.up('md')]: {
            width: 240
        },
        [theme.breakpoints.up('lg')]: {
            width: 260
        }
    },
    filterInput: {
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none'
        }
    }
});
