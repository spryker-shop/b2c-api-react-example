import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        margin: '-7px',
        width: 'auto',
        [theme.breakpoints.up('lg')]: {
            margin: '-15px'
        }
    },
    col: {
        padding: '7px',
        [theme.breakpoints.up('lg')]: {
            padding: '15px'
        }
    },
    title: {
        paddingBottom: 20
    },
    block: {
        padding: '21px 15px 25px',
        color: theme.appColors.grey,
        fontSize: 15,
        lineHeight: 1.9,
        letterSpacing: 0.2,
        fontWeight: 500,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            padding: '21px 25px 25px',
        }
    },
    blockBottomIndent: {
        paddingBottom: 5
    },
    blockCustomer: {
        paddingRight: 50
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    subtitle: {
        fontWeight: 700,
        paddingBottom: 20,
        lineHeight: 1.4,
        fontSize: 20
    },
    actionItem: {
        position: 'absolute',
        right: 5,
        top: 15,
        padding: 10,
        fill: theme.appColors.lightGrey,
        background: 'none',
        transition: 'fill 0.3s ease-in-out',
        [theme.breakpoints.up('lg')]: {
            right: 25
        },
        '&:hover': {
            fill: theme.appColors.blue,
            background: 'none'
        }
    },
    link: {
        fontSize: 14,
        fontWeight: 500,
        textDecoration: 'none',
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        [theme.breakpoints.up('lg')]: {
            fontSize: 16
        },
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    orderItem: {
        background: theme.appColors.white
    },
    textAlternative: {
        color: theme.appColors.black
    },
    textHightlight: {
        color: theme.appColors.blue,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverFlow: 'ellipsis'
    }
});
