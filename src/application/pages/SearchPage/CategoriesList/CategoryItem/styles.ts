import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    children: {
        paddingLeft: 32,
        [theme.breakpoints.up('lg')]: {
            paddingTop: 3,
            paddingBottom: 3
        }
    },
    categoryItem: {
        padding: '4px 0',
        color: theme.appColors.grey,
        [theme.breakpoints.up('md')]: {
            padding: '4px 0'
        },
        '&:hover': {
            [theme.breakpoints.up('lg')]: {
                background: 'none',
                color: theme.appColors.blue,
            },
            '& $quantity': {
                [theme.breakpoints.up('lg')]: {
                    backgroundColor: 'rgba(8, 148, 161, 0.07)',
                    color: theme.appColors.blue
                }
            }
        }
    },
    holder: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '11px 10px 10px 14px',
        background: theme.appColors.white,
        borderRadius: 4,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            background: theme.appColors.weekWhite,
        },
        [theme.breakpoints.up('lg')]: {
            padding: 0,
            background: 'none',
            borderRadius: 0,
        }
    },
    quantity: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        color: theme.appColors.lightGrey,
        height: 18,
        background: 'rgba(206, 206, 208, 0.16)',
        borderRadius: 9,
        minWidth: 31,
        padding: '0 3px',
        marginTop: 3
    },
    quantityActive: {
        background: 'rgba(8, 148, 161, 0.07)',
        color: theme.appColors.blue
    },
    selected: {
        color: theme.appColors.blue,
        background: 'none !important'
    },
    disabled: {
        color: theme.appColors.lightGrey,
        opacity: 1
    }
});
