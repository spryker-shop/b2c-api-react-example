import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    children: {
        padding: '3px 0 3px 32px'
    },
    categoryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 0',
        color: theme.appColors.grey,
        '&:hover': {
            background: 'none',
            color: theme.appColors.blue,
            '& span': {
                backgroundColor: 'rgba(8, 148, 161, 0.07)',
                color: theme.appColors.blue
            }
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
        padding: '0 3px'
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
        color: theme.appColors.lightGrey
    },
    root: {}
});
