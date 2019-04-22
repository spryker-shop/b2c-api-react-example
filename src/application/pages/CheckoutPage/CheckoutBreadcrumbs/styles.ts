import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    bgColor: {
        background: theme.appColors.darkWhite
    },
    wrapper: {
        padding: '18px 0',
        overflow: 'hidden'
    },
    inner: {
        ...theme.appContainerStyles,
    },
    list: {
        display: 'flex',
        margin: 0,
        padding: '0 8px',
        listStyle: 'none',
        [theme.breakpoints.only('md')]: {
            margin: '0 -16px'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 40px'
        }
    },
    item: {
        pointerEvents: 'none',
        width: '25%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        color: theme.appColors.lightGrey,
        zIndex: 0,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            bottom: 9,
            height: 2,
            width: '50%',
            background: theme.appColors.lightGrey,
            zIndex: -1
        },
        '&:before': {
            right: '50%'
        },
        '&:after': {
            left: '50%'
        },
        '&:last-child:after, &:first-child:before': {
            display: 'none'
        }
    },
    itemLevel0: {},
    itemActive: {
        color: theme.appColors.blue,
        '&:before': {
            background: 'currentColor'
        },
        '& $itemDecor:after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 7,
            height: 7,
            background: theme.appColors.blue,
            borderRadius: '50%'
        },
        '& $itemText': {
            display: 'block'
        }
    },
    itemPassed: {
        color: theme.appColors.blue,
        pointerEvents: 'auto',
        '&:after, &:before': {
            background: 'currentColor'
        },
        '& $itemDecor': {
            background: 'currentColor'
        },
        '& $link:hover': {
            color: theme.appColors.darkBlue
        },
        '&$itemLevel0': {
            pointerEvents: 'none'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        transition: 'color 0.3s ease-in-out'
    },
    itemInner: {
        width: 20,
        paddingTop: 30,
        position: 'relative'
    },
    itemText: {
        display: 'none',
        position: 'absolute',
        whiteSpace: 'nowrap',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 1.5,
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    itemDecor: {
        display: 'block',
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `2px solid currentColor`,
        position: 'relative'
    }
});
