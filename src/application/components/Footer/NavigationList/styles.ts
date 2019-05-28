import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
    title: {
        position: 'relative',
        display: 'block',
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0.1,
        color: theme.appColors.black,
        padding: '15px 50px 15px 16px',
        [theme.breakpoints.up('sm')]: {
            padding: '0 0 18px 0',
            fontSize: 16,
            letterSpacing: 0.2,
        }
    },
    chevron: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    },
    chevronIcon: {
        width: 12,
        height: 12,
        fill: theme.appColors.black
    },
    chevronIconOpened: {
        transform: 'scaleY(-1)',
        fill: theme.appColors.blue
    },
    linkList: {
        display: 'none',
        listStyle: 'none',
        margin: 0,
        padding: '10px 16px',
        background: theme.appColors.softerGrey,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            padding: 0,
            background: 'none'
        }
    },
    linkListOpened: {
        display: 'block',
    },
    linkItem: {
        padding: '6px 0',
        [theme.breakpoints.up('sm')]: {
            padding: '0 0 11px'
        }
    },
    link: {
        display: 'block',
        padding: '5px 0',
        textDecoration: 'none',
        color: theme.appColors.grey,
        fontSize: 14,
        letterSpacing: 0.2,
        [theme.breakpoints.up('sm')]: {
            display: 'inline-block',
            padding: 0,
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 15
        }
    }
});
