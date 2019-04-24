import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    inputCheckbox: {
        padding: 0,
        width: 20,
        height: 20,
        borderRadius: 2,
        border: `1px solid ${theme.appColors.lightGrey}`,
        position: 'relative',
        transition: 'background 0.3s ease-in-out, border 0.3s ease-in-out',
        '& svg': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            visibility: 'hidden',
            width: 12,
            height: 9,
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
        }
    },
    checkedCheckbox: {
        borderColor: theme.appColors.blue,
        background: theme.appColors.blue,
        '&:hover': {
            borderColor: theme.appColors.blue,
            background: theme.appColors.blue,
        },
        '& svg': {
            opacity: 1,
            visibility: 'visible'
        }
    },
    outerCheckbox: {
        display: 'flex',
        margin: 0
    },
    label: {
        position: 'static',
        padding: '0 0 0 15px',
        color: theme.appColors.grey,
        fontWeight: 400,
        letterSpacing: 0.2,
        fontSize: 15
    }
});
