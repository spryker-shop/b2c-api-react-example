import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    filterList: {
        padding: '10px 0'
    },
    chip: {
        position: 'relative',
        margin: 0,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 0.1,
        color: theme.appColors.grey,
        padding: '6px 31px 6px 9px',
        border: `1px solid ${theme.appColors.lightGrey}`,
        borderRadius: 13,
        lineHeight: 1,
        height: 'auto',
        '&:hover': {
            background: 'none',
            color: theme.appColors.red
        }
    },
    label: {
        padding: 0,
        transition: 'color 0.3s ease-in-out',
        color: 'currentColor',
    },
    iconOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.red
        }
    },
    iconInner: {
        position: 'absolute',
        right: 5,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
        margin: 0,
        borderRadius: '50%',
        border: '1px solid currentColor',
        transition: 'none'
    },
    icon: {
        width: '100%',
        height: '100%',
        transition: 'none'
    },
    resetBtn: {
        minWidth: 0,
        padding: '5px 12px',
        border: 0,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 0.1,
        color: theme.appColors.red,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            background: 'none',
            color: theme.appColors.blue
        }
    },
});
